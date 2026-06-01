import { siteConfig } from '@/config/site'

export function About() {
  const gravatarUrl = `https://www.gravatar.com/avatar/${siteConfig.gravatarHash}?s=240&d=retro`

  return (
    <section id="about" className="px-6 py-16 sm:px-14 sm:py-24 max-w-5xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-8 sm:gap-16 items-start">
        <div className="flex flex-row sm:flex-col items-center gap-4 sm:gap-3 flex-shrink-0">
          <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-zinc-700 ring-4 ring-zinc-800/50">
            <img
              src={gravatarUrl}
              alt={siteConfig.name}
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-xs uppercase tracking-widest text-zinc-600">
            {siteConfig.location}
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-zinc-600 mb-5">
            About
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-zinc-50 mb-6">
            Hi, I'm Alex.
          </h2>
          <div className="space-y-4">
            {siteConfig.about.map((paragraph, i) => (
              <p key={i} className="text-zinc-400 leading-relaxed text-[0.95rem]">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
