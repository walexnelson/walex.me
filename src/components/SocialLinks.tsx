import { Github, Linkedin, Instagram, Facebook } from 'lucide-react'
import { siteConfig } from '@/config/site'

const links = [
  { icon: Github, href: siteConfig.social.github, label: 'GitHub' },
  { icon: Linkedin, href: siteConfig.social.linkedin, label: 'LinkedIn' },
  { icon: Instagram, href: siteConfig.social.instagram, label: 'Instagram' },
  { icon: Facebook, href: siteConfig.social.facebook, label: 'Facebook' },
] as const

export function SocialLinks() {
  return (
    <div className="flex gap-3">
      {links.map(({ icon: Icon, href, label }, i) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="animate-fade-up-stagger flex items-center justify-center w-10 h-10 rounded-lg border border-zinc-700 bg-white/5 text-zinc-400 hover:text-zinc-50 hover:border-zinc-500 hover:bg-white/10 transition-all duration-200 backdrop-blur-sm"
          style={{ animationDelay: `${1000 + i * 150}ms` }}
        >
          <Icon size={16} />
        </a>
      ))}
    </div>
  )
}
