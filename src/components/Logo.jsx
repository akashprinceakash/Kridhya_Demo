// Vector redraw of the supplied Kridhya brand mark (lotus within a framed square + wordmark).
// Vector + currentColor keeps it crisp and visible on both burgundy and ivory backgrounds,
// addressing the brief's logo-visibility issue. Swap for the approved master SVG when available.

export function LotusMark({ className = '', strokeWidth = 1.1 }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinejoin="round">
      <rect x="6.5" y="6.5" width="35" height="35" transform="rotate(0 24 24)" />
      <path d="M24 13.5c-3.4 4.2-3.4 9.6 0 15.5 3.4-5.9 3.4-11.3 0-15.5z" />
      <path d="M24 29c-2.6-4.6-6.6-7.4-11-7.6.6 4.7 4.8 7.8 11 7.6z" />
      <path d="M24 29c2.6-4.6 6.6-7.4 11-7.6-.6 4.7-4.8 7.8-11 7.6z" />
      <path d="M24 29c-4.6-.2-8.3 1-11 3.4M24 29c4.6-.2 8.3 1 11 3.4" />
      <path d="M15 34.5h18" />
    </svg>
  )
}

export default function Logo({ className = '', compact = false }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LotusMark className="h-7 w-7 shrink-0 text-gold" />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[18px] font-normal tracking-[0.34em]">KRIDHYA</span>
        {!compact && <span className="mt-1 font-sans text-[8.5px] font-medium tracking-[0.36em] text-gold">BY DEVANSHI</span>}
      </span>
      <span className="sr-only">Kridhya by Devanshi — home</span>
    </span>
  )
}
