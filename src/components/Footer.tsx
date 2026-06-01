export function Footer() {
  return (
    <footer className="px-6 py-8 sm:px-14 border-t border-zinc-900 flex justify-between items-center">
      <span className="text-xs font-semibold tracking-[0.05em] text-zinc-600">
        WALEX.ME
      </span>
      <span className="text-xs text-zinc-600">
        © {new Date().getFullYear()} Alex Nelson
      </span>
    </footer>
  )
}
