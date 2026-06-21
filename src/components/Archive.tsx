"use client";

import { useState, useCallback, useEffect, useRef, ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import BookReader from "@/components/book/BookReader";
import { books } from "@/lib/books";
import { siteConfig } from "@/lib/config";
import { getOriginsPages } from "@/components/books/OriginsBook";
import { getFieldReportsPages } from "@/components/books/FieldReportsBook";
import { getCodeRecordsPages } from "@/components/books/CodeRecordsBook";
import { getProblemCodexPages } from "@/components/books/ProblemCodexBook";
import { getNetworkPages } from "@/components/books/NetworkBook";
import { getExperimentsPages } from "@/components/books/ExperimentsBook";
import { getFutureReleasesPages } from "@/components/books/FutureReleasesBook";
import { getSecretPages } from "@/components/books/SecretArchive";
import type { Book } from "@/types";

// Dynamic background WebGL interactive shader
interface ShaderBackgroundProps {
  isActive: boolean;
}

function ShaderBackground({ isActive }: ShaderBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (!isActive) return;

    const canvasElement = canvas;
    let animationFrameId: number;
    let isVisible = true;

    const gl = (canvasElement.getContext("webgl") || canvasElement.getContext("experimental-webgl")) as WebGLRenderingContext | null;
    if (!gl) return;

    const glContext = gl;

    const vs = `
      attribute vec2 a_position;
      varying vec2 v_texCoord;
      void main() {
        v_texCoord = a_position * 0.5 + 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    const fs = `
      precision highp float;
      varying vec2 v_texCoord;
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;

      float noise(vec2 p) {
          return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
      }

      void main() {
          vec2 uv = v_texCoord;
          vec2 mouseUV = u_mouse / u_resolution;
          
          // Normalized coordinates (-1 to 1) relative to resolution aspect
          vec2 p = uv * 2.0 - 1.0;
          p.x *= u_resolution.x / u_resolution.y;
          
          // Deep dark space base
          vec3 color = vec3(0.03, 0.03, 0.033);
          
          // Mouse spotlight position in normalized coordinate space
          vec2 lightPos = (u_mouse.x == 0.0 && u_mouse.y == 0.0) ? vec2(0.0) : (mouseUV * 2.0 - 1.0);
          lightPos.x *= u_resolution.x / u_resolution.y;
          
          // Light beam shining from top-left towards spotlight/center position
          vec2 beamOrigin = vec2(-1.5, 1.5);
          vec2 beamDir = normalize(lightPos - beamOrigin);
          vec2 toPixel = p - beamOrigin;
          
          // Projection length onto light path
          float projection = dot(toPixel, beamDir);
          float distToBeam = length(toPixel - projection * beamDir);
          
          // Volumetric shaft of light
          float shaft = smoothstep(0.8, 0.0, distToBeam) * smoothstep(-0.5, 2.5, projection) * 0.22;
          
          // Ambient spotlight around mouse cursor
          float spotlight = smoothstep(1.2, 0.0, length(p - lightPos)) * 0.15;
          
          // Distinct cinematic color layers (gold, warm bronze and ambient dark grey)
          vec3 goldColor = vec3(0.80, 0.65, 0.38); // Archive Gold
          vec3 warmGlow = vec3(0.18, 0.13, 0.08);  // Warm bronze ambient
          
          color += warmGlow * (spotlight + shaft * 0.5);
          color += goldColor * shaft * 0.18;
          
          // Floating 3D dust particles catching the light
          float particles = 0.0;
          
          for(float i = 1.0; i <= 3.0; i++) {
              float t = u_time * (0.12 + i * 0.04);
              
              // Scale coordinates differently per layer to build 3D parallax layers
              vec2 uv_layer = p * (1.2 + i * 0.6) + vec2(t * 0.06, -t * 0.09);
              
              vec2 grid = floor(uv_layer);
              vec2 f = fract(uv_layer);
              
              // Unique cell hash for random particle pos and twinkle speeds
              vec2 seed = grid * vec2(127.1, 311.7) + vec2(i * 43.1);
              vec2 rand = vec2(
                  sin(seed.x + t * 0.3) * 0.5 + 0.5,
                  cos(seed.y + t * 0.4) * 0.5 + 0.5
              );
              
              vec2 partPos = rand;
              float distToPart = length(f - partPos);
              
              // Particles illuminate only when catching the light shaft or mouse spotlight
              float inBeam = smoothstep(0.9, 0.0, length(p - beamOrigin - dot(p - beamOrigin, beamDir) * beamDir)) * 0.6
                             + smoothstep(1.0, 0.0, length(p - lightPos)) * 0.4;
              
              // Sparkle point with smooth edge glow
              float sparkle = smoothstep(0.06, 0.0, distToPart) * inBeam * rand.x;
              particles += sparkle * (0.3 + 0.7 * sin(u_time * 1.8 + grid.x * 2.0 + grid.y * 3.0));
          }
          
          color += goldColor * particles * 0.45;
          
          // Classic cinematic vignette border
          float vignette = uv.x * (1.0 - uv.x) * uv.y * (1.0 - uv.y);
          vignette = clamp(pow(vignette * 16.0, 0.35), 0.0, 1.0);
          color *= vignette;
          
          // Micro photographic high-frequency grain
          float grain = noise(uv * u_resolution + vec2(u_time * 4.0)) * 0.012;
          color += vec3(grain);
          
          gl_FragColor = vec4(color, 1.0);
      }
    `;

    function cs(type: number, src: string) {
      const s = glContext.createShader(type);
      if (!s) return null;
      glContext.shaderSource(s, src);
      glContext.compileShader(s);
      if (!glContext.getShaderParameter(s, glContext.COMPILE_STATUS)) {
        console.error("Shader compile error:", glContext.getShaderInfoLog(s));
        return null;
      }
      return s;
    }

    const prog = glContext.createProgram();
    if (!prog) return;

    const vertexShader = cs(glContext.VERTEX_SHADER, vs);
    const fragmentShader = cs(glContext.FRAGMENT_SHADER, fs);
    if (!vertexShader || !fragmentShader) return;

    glContext.attachShader(prog, vertexShader);
    glContext.attachShader(prog, fragmentShader);
    glContext.linkProgram(prog);
    if (!glContext.getProgramParameter(prog, glContext.LINK_STATUS)) {
      console.error("Program linking error:", glContext.getProgramInfoLog(prog));
      return;
    }

    glContext.useProgram(prog);

    const buf = glContext.createBuffer();
    glContext.bindBuffer(glContext.ARRAY_BUFFER, buf);
    glContext.bufferData(glContext.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), glContext.STATIC_DRAW);

    const pos = glContext.getAttribLocation(prog, "a_position");
    glContext.enableVertexAttribArray(pos);
    glContext.vertexAttribPointer(pos, 2, glContext.FLOAT, false, 0, 0);

    const uTime = glContext.getUniformLocation(prog, "u_time");
    const uRes = glContext.getUniformLocation(prog, "u_resolution");
    const uMouse = glContext.getUniformLocation(prog, "u_mouse");

    let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvasElement.getBoundingClientRect();
      if (rect.width && rect.height) {
        const nx = (event.clientX - rect.left) / rect.width;
        const ny = 1.0 - (event.clientY - rect.top) / rect.height;
        mouse.x = nx * canvasElement.width;
        mouse.y = ny * canvasElement.height;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    const handleVisibilityChange = () => {
      isVisible = document.visibilityState === "visible";
      if (isVisible) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = requestAnimationFrame(render);
      } else {
        cancelAnimationFrame(animationFrameId);
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    const resizeObserver = new ResizeObserver(() => {
      const w = canvasElement.clientWidth || 1280;
      const h = canvasElement.clientHeight || 720;
      if (canvasElement.width !== w || canvasElement.height !== h) {
        canvasElement.width = w;
        canvasElement.height = h;
        glContext.viewport(0, 0, w, h);
      }
    });
    resizeObserver.observe(canvasElement);

    // Initial size sync
    const w = canvasElement.clientWidth || 1280;
    const h = canvasElement.clientHeight || 720;
    canvasElement.width = w;
    canvasElement.height = h;
    glContext.viewport(0, 0, w, h);

    function render(t: number) {
      if (!isVisible) return;
      if (uTime) glContext.uniform1f(uTime, t * 0.001);
      if (uRes) glContext.uniform2f(uRes, canvasElement.width, canvasElement.height);
      if (uMouse) glContext.uniform2f(uMouse, mouse.x, mouse.y);
      glContext.drawArrays(glContext.TRIANGLE_STRIP, 0, 4);
      animationFrameId = requestAnimationFrame(render);
    }

    render(0);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      resizeObserver.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isActive]);

  return (
    <canvas
      ref={canvasRef}
      id="shader-canvas-ANIMATION_9"
      style={{ display: isActive ? "block" : "none", width: "100%", height: "100%" }}
    />
  );
}

function getPagesForBook(bookId: string): { id: string; title: string; content: ReactNode }[] {
  switch (bookId) {
    case "origins":
      return getOriginsPages();
    case "field-reports":
      return getFieldReportsPages();
    case "code-records":
      return getCodeRecordsPages();
    case "problem-codex":
      return getProblemCodexPages();
    case "network":
      return getNetworkPages();
    case "experiments":
      return getExperimentsPages();
    case "future-releases":
      return getFutureReleasesPages();
    case "secret":
      return getSecretPages();
    default:
      return [];
  }
}

interface BookMeta {
  coverImage: string;
  displayTitle: string;
  displaySubtitle: string;
  badge: string;
  offsetClass: string;
}

const bookMetaMap: Record<string, BookMeta> = {
  origins: {
    coverImage: "/1.png",
    displayTitle: "Origins",
    displaySubtitle: "Foundational Narrative",
    badge: "Entry 001",
    offsetClass: "lg:mt-0",
  },
  "field-reports": {
    coverImage: "/2.png",
    displayTitle: "Projects",
    displaySubtitle: "Selected Monographs",
    badge: "Active Works",
    offsetClass: "lg:mt-24",
  },
  "code-records": {
    coverImage: "/3.png",
    displayTitle: "GitHub",
    displaySubtitle: "Digital Commitments",
    badge: "Source History",
    offsetClass: "lg:mt-12",
  },
  "problem-codex": {
    coverImage: "/4.png",
    displayTitle: "Logic",
    displaySubtitle: "Competitive Analysis",
    badge: "Algorithmic Proofs",
    offsetClass: "lg:-mt-12",
  },
  experiments: {
    coverImage: "/5.png",
    displayTitle: "Experiments",
    displaySubtitle: "Volatile Iterations",
    badge: "Lab Notes",
    offsetClass: "lg:mt-12",
  },
  "future-releases": {
    coverImage: "/6.png",
    displayTitle: "Future",
    displaySubtitle: "Upcoming Volumes",
    badge: "Speculative Path",
    offsetClass: "lg:-mt-4",
  },
};

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 80, 
    rotateX: 20, 
    scale: 0.95 
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    transition: {
      delay: i * 0.12,
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as const, // Custom easeOutExpo
    }
  })
};

export default function Archive() {
  const [openBook, setOpenBook] = useState<Book | null>(null);
  const [secretUnlocked, setSecretUnlocked] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [timeString, setTimeString] = useState("");
  const [currentYear, setCurrentYear] = useState(2026);

  const booksGridRef = useRef<HTMLDivElement>(null);

  const handleOpenBook = useCallback((book: Book) => {
    setOpenBook(book);
    document.body.style.overflow = "hidden";
  }, []);

  const handleCloseBook = useCallback(() => {
    setOpenBook(null);
    document.body.style.overflow = "";
  }, []);

  const handleSecretClick = useCallback(() => {
    const newCount = clickCount + 1;
    setClickCount(newCount);

    if (newCount >= 7) {
      setSecretUnlocked(true);
      setShowHint(false);
    } else if (newCount >= 3) {
      setShowHint(true);
    }
  }, [clickCount]);

  useEffect(() => {
    if (showHint) {
      const timer = setTimeout(() => setShowHint(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showHint]);

  useEffect(() => {
    setMounted(true);
    setCurrentYear(new Date().getFullYear());
    
    const updateTime = () => {
      setTimeString(new Date().toUTCString().slice(17, 25));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMoveCard = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    
    const rotateX = -(y - yc) / 12;
    const rotateY = (x - xc) / 12;
    
    card.style.setProperty("--rx", `${rotateX}deg`);
    card.style.setProperty("--ry", `${rotateY}deg`);
    card.style.setProperty("--mx", `${(x / rect.width) * 100}%`);
    card.style.setProperty("--my", `${(y / rect.height) * 100}%`);
  }, []);

  const handleMouseLeaveCard = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.setProperty("--rx", "0deg");
    card.style.setProperty("--ry", "0deg");
    card.style.setProperty("--mx", "50%");
    card.style.setProperty("--my", "50%");
  }, []);

  const secretBook: Book = {
    id: "secret",
    title: "Hidden",
    subtitle: "The secret archive",
    color: "#1a1a1a",
    accentColor: "#c8a96e",
    icon: "compass",
    chapters: [{ id: "hidden", title: "Hidden Archive" }],
  };

  return (
    <div className="relative min-h-screen bg-[#0A0A0A] text-[#E5E2E1] overflow-x-hidden selection:bg-[#D4AF37] selection:text-black">
      <div className="noise" />

      {/* Background Cinematic Shader Surface */}
      <div className="fixed inset-0 z-0 opacity-40 mix-blend-screen pointer-events-none">
        <ShaderBackground isActive={!openBook} />
      </div>

      {/* Main Content Canvas */}
      <main className="relative z-10 min-h-screen flex flex-col justify-between pt-24 pb-12 px-margin-mobile md:px-margin-desktop max-w-[1440px] mx-auto w-full">
        {/* Header */}
        <header className="max-w-screen-xl mx-auto w-full mb-16 md:mb-section-gap">
          <div className="flex flex-col items-center text-center space-y-6">
            <span className="font-label-sm text-label-sm tracking-[0.3em] text-[#929189] uppercase animate-pulse select-none">
              Accessing Archival Vault
            </span>
            <h1
              onClick={handleSecretClick}
              className="font-display-lg text-display-lg text-white tracking-tighter leading-none cursor-pointer select-none active:scale-[0.99] transition-transform duration-300"
            >
              THE ARCHIVE
            </h1>
            <div className="w-24 h-px bg-[#474740]/30"></div>
            <p className="font-body-lg text-body-lg text-[#c9c7bd] max-w-2xl font-light italic opacity-70">
              A curated collection of technical mastery and creative legacy, preserved for future scrutiny.
            </p>
          </div>

          {/* Secret hint */}
          <AnimatePresence>
            {showHint && (
              <motion.p
                className="text-center text-[10px] text-[#D4AF37]/50 mt-4 italic font-mono"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                Keep going... {7 - clickCount} more keys
              </motion.p>
            )}
          </AnimatePresence>
        </header>

        {/* Book Grid (Editorial Asymmetry) */}
        <section ref={booksGridRef} className="max-w-[1200px] mx-auto w-full mb-16 md:mb-section-gap">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24 items-start">
            {books
              .filter((book) => book.id !== "network") // network accessed via sidebar fingerprint!
              .map((book, index) => {
                const meta = bookMetaMap[book.id];
                if (!meta) return null;
                return (
                  <motion.div
                    key={book.id}
                    onClick={() => handleOpenBook(book)}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    custom={index}
                    variants={cardVariants}
                    className={`book-container flex flex-col space-y-6 cursor-pointer group ${meta.offsetClass}`}
                  >
                    <div
                      onMouseMove={handleMouseMoveCard}
                      onMouseLeave={handleMouseLeaveCard}
                      className="book-card aspect-[3/4] rounded-sm overflow-hidden bg-[#201f1f] shadow-2xl relative"
                    >
                      <Image
                        src={meta.coverImage}
                        alt={book.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        priority={book.id === "origins" || book.id === "field-reports"}
                        className="object-cover grayscale-[0.2] transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105 pointer-events-none"
                      />
                      {/* Dynamic light reflection/glare overlay */}
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_var(--mx,_50%)_var(--my,_50%),_rgba(255,255,255,0.08)_0%,_transparent_60%)] pointer-events-none mix-blend-overlay z-20" />
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8 pointer-events-none">
                        <span className="font-label-sm text-label-sm text-white border border-white/20 px-3 py-1 rounded-full backdrop-blur-md">
                          {meta.badge}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-1 pl-2 border-l border-[#474740]/30 pointer-events-none">
                      <h3 className="font-headline-md text-headline-md text-white transition-colors duration-300 group-hover:text-[#D4AF37]">
                        {meta.displayTitle}
                      </h3>
                      <p className="font-label-xs text-label-xs text-[#929189] uppercase tracking-widest">
                        {meta.displaySubtitle}
                      </p>
                    </div>
                  </motion.div>
                );
              })}

            {/* Secret book */}
            {secretUnlocked && (
              <motion.div
                initial="hidden"
                animate="visible"
                custom={6}
                variants={cardVariants}
                onClick={() => handleOpenBook(secretBook)}
                className="book-container flex flex-col space-y-6 cursor-pointer group lg:-mt-8"
              >
                <div
                  onMouseMove={handleMouseMoveCard}
                  onMouseLeave={handleMouseLeaveCard}
                  className="book-card aspect-[3/4] rounded-sm overflow-hidden bg-gradient-to-b from-[#151515] to-[#0c0c0c] border border-[#D4AF37]/30 shadow-[0_10px_30px_rgba(0,0,0,0.6),0_0_20px_rgba(212,175,55,0.05)] relative group-hover:border-[#D4AF37]/80 flex flex-col items-center justify-center p-6 text-center transition-all duration-500"
                >
                  <div className="text-[#D4AF37] opacity-60 group-hover:opacity-100 transition-opacity duration-500 mb-4 animate-pulse pointer-events-none">
                    <span className="material-symbols-outlined text-[48px]">fingerprint</span>
                  </div>
                  <span className="font-label-sm text-label-sm text-[#D4AF37] border border-[#D4AF37]/20 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md pointer-events-none">
                    Secret Entry
                  </span>
                  
                  {/* Dynamic light reflection/glare overlay */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_var(--mx,_50%)_var(--my,_50%),_rgba(255,255,255,0.08)_0%,_transparent_60%)] pointer-events-none mix-blend-overlay z-20" />
                </div>
                <div className="flex flex-col space-y-1 pl-2 border-l border-[#D4AF37]/30 pointer-events-none">
                  <h3 className="font-headline-md text-headline-md text-white transition-colors duration-300 group-hover:text-[#D4AF37]">
                    Hidden
                  </h3>
                  <p className="font-label-xs text-label-xs text-[#D4AF37] uppercase tracking-widest">
                    The Secret Archive
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </section>

        {/* Footer Metadata */}
        <footer className="w-full border-t border-[#474740]/10 pt-12 mt-auto">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-[#2a2a2a] border border-[#474740]/20 flex items-center justify-center overflow-hidden animate-pulse">
                  <span className="material-symbols-outlined text-[#929189] text-[20px]">person_outline</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-label-xs text-label-xs text-[#929189] uppercase tracking-tighter">Archive Curator</span>
                  <span className="font-body-md text-body-md text-white">{siteConfig.name}</span>
                </div>
              </div>
              <div className="font-label-xs text-label-xs text-[#929189]/40 font-mono">
                LAT: 40.7128 N | LONG: 74.0060 W | UTC: {mounted ? timeString : "--:--:--"}
              </div>
            </div>

            <div className="flex flex-col items-end space-y-2">
              <div className="flex space-x-8">
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  className="font-label-sm text-label-sm text-[#929189] hover:text-white transition-colors duration-300 focus:outline-none cursor-pointer"
                >
                  INDEX
                </button>
                <button
                  onClick={() => booksGridRef.current?.scrollIntoView({ behavior: "smooth" })}
                  className="font-label-sm text-label-sm text-[#929189] hover:text-white transition-colors duration-300 focus:outline-none cursor-pointer"
                >
                  VOLUMES
                </button>
                <button
                  onClick={() => {
                    const codeRecords = books.find((b) => b.id === "code-records");
                    if (codeRecords) handleOpenBook(codeRecords);
                  }}
                  className="font-label-sm text-label-sm text-[#929189] hover:text-white transition-colors duration-300 focus:outline-none cursor-pointer"
                >
                  RECORDS
                </button>
              </div>
              <div className="bg-[#1c1b1b] px-4 py-2 rounded-sm border border-[#474740]/10 font-mono select-none">
                <span className="font-label-xs text-label-xs text-white uppercase font-bold tracking-[0.2em]">RECORD ID: 882-91-X</span>
              </div>
              <p className="font-label-xs text-label-xs text-[#929189]/30 uppercase font-mono select-none">
                © {mounted ? currentYear : 2026} Archival Management Division
              </p>
            </div>
          </div>
        </footer>
      </main>

      {/* Side Navigation Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-16 border-r border-[#474740]/5 flex flex-col items-center py-12 z-40 hidden md:flex">
        <div className="flex-grow flex flex-col items-center space-y-12">
          <span
            onClick={() => {
              const origins = books.find((b) => b.id === "origins");
              if (origins) handleOpenBook(origins);
            }}
            className="material-symbols-outlined text-[#929189] hover:text-white transition-all cursor-pointer text-[24px]"
            title="Open Origins"
          >
            menu_book
          </span>
          <span
            onClick={() => {
              const fieldReports = books.find((b) => b.id === "field-reports");
              if (fieldReports) handleOpenBook(fieldReports);
            }}
            className="material-symbols-outlined text-[#929189] hover:text-white transition-all cursor-pointer text-[24px]"
            title="Open Projects"
          >
            edit_note
          </span>
          <span
            onClick={() => {
              const experiments = books.find((b) => b.id === "experiments");
              if (experiments) handleOpenBook(experiments);
            }}
            className="material-symbols-outlined text-[#929189] hover:text-white transition-all cursor-pointer text-[24px]"
            title="Open Experiments"
          >
            auto_stories
          </span>
          <span
            onClick={() => {
              const network = books.find((b) => b.id === "network");
              if (network) handleOpenBook(network);
            }}
            className="material-symbols-outlined text-[#929189] hover:text-white transition-all cursor-pointer text-[24px]"
            title="Open Connections"
          >
            fingerprint
          </span>
        </div>
        <div className="rotate-[-90deg] whitespace-nowrap origin-center select-none font-mono">
          <span className="font-label-xs text-label-xs text-[#929189]/20 uppercase tracking-[0.5em]">
            V.01-{mounted ? currentYear : 2026} DEPLOYMENT
          </span>
        </div>
      </aside>

      {/* Book Reader Overlay */}
      <AnimatePresence>
        {openBook && (
          <BookReader
            book={openBook}
            onClose={handleCloseBook}
            pages={getPagesForBook(openBook.id)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
