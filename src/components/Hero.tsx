import { useEffect, useState } from 'react'
import { siteConfig } from '@/config/site'
import { SocialLinks } from './SocialLinks'
import heroImage from '@/assets/hero.jpg'

export function Hero() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50)
    handler() // check initial scroll position
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <section className="relative h-screen min-h-[600px] flex flex-col justify-end px-14 pb-14 overflow-hidden">
      {/* Background photo */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/20" />
      {/* Gradient fade to page background at bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-[#09090b]/30 to-transparent" />

      {/* Content */}
      <div className="relative z-10 max-w-2xl">
        <p className="text-xs font-medium tracking-[0.15em] uppercase text-zinc-500 mb-4 animate-fade-up">
          walex.me
        </p>
        <h1 className="text-[clamp(3rem,8vw,5.5rem)] font-extrabold tracking-tighter leading-none text-zinc-50 mb-5 animate-fade-up-d1">
          {siteConfig.name}
        </h1>
        <p className="text-lg text-zinc-400 mb-10 max-w-md animate-fade-up-d2">
          <span className="text-zinc-50 font-medium">
            {siteConfig.tagline.split('. ').slice(0, 1).join('. ')}.
          </span>{' '}
          {siteConfig.tagline.split('. ').slice(1).join('. ')}
        </p>
        <SocialLinks />
      </div>

      {/* Scroll indicator */}
      <div
        className={`absolute bottom-8 right-14 flex flex-col items-center gap-2 transition-opacity duration-500 ${
          scrolled ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
        aria-hidden="true"
      >
        <span className="text-[10px] uppercase tracking-[0.1em] text-zinc-600">scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-zinc-600 to-transparent" />
      </div>
    </section>
  )
}
