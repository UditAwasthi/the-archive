"use client";

import { motion } from "framer-motion";
import {
  Globe,
  Briefcase,
  Camera,
  MessageCircle,
  Mail,
  ExternalLink,
} from "lucide-react";
import PageContent, {
  PageTitle,
  PageSubtitle,
} from "@/components/ui/PageContent";
import { getSocialProfiles } from "@/lib/social";
import type { SocialProfile } from "@/types";

const platformIcons: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  github: Globe,
  linkedin: Briefcase,
  instagram: Camera,
  twitter: MessageCircle,
  mail: Mail,
};

function SocialCard({ profile, index }: { profile: SocialProfile; index: number }) {
  const Icon = platformIcons[profile.icon] || ExternalLink;

  return (
    <motion.a
      href={profile.url}
      target={profile.icon === "mail" ? undefined : "_blank"}
      rel={profile.icon === "mail" ? undefined : "noopener noreferrer"}
      className="group block p-5 sm:p-6 rounded-lg border border-ink/5 hover:border-ink/10 hover:bg-parchment-dark/20 transition-all"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      whileHover={{ y: -2 }}
    >
      <div className="flex items-start gap-4">
        <div className="p-2.5 rounded-lg bg-ink/[0.04] group-hover:bg-accent-gold/10 transition-colors">
          <Icon size={20} className="text-ink-muted group-hover:text-accent-warm transition-colors" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h4 className="font-serif text-base text-ink">{profile.platform}</h4>
            <ExternalLink size={12} className="text-ink-faint opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <p className="font-mono text-xs text-ink-muted mt-0.5 truncate">@{profile.username}</p>
          <p className="text-xs text-ink-faint mt-2 leading-relaxed">{profile.description}</p>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-ink/[0.04]">
        <p className="text-[10px] tracking-[0.2em] uppercase text-ink-faint">
          Archival Record \u2014 {profile.platform}
        </p>
      </div>
    </motion.a>
  );
}

function ConnectionsPage() {
  const profiles = getSocialProfiles();

  return (
    <PageContent>
      <PageTitle>Connections</PageTitle>
      <PageSubtitle>Digital presence archive</PageSubtitle>

      <div className="space-y-3 sm:space-y-4">
        {profiles.map((profile, i) => (
          <SocialCard key={profile.platform} profile={profile} index={i} />
        ))}
      </div>

      {profiles.length === 0 && (
        <p className="text-sm text-ink-muted text-center py-12">
          No social profiles configured. Update environment variables to add profiles.
        </p>
      )}
    </PageContent>
  );
}

export function getNetworkPages() {
  return [
    { id: "connections", title: "Connections", content: <ConnectionsPage /> },
  ];
}
