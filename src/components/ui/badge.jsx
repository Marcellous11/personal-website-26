import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

// Atelier chip pattern (spec §Chip pattern):
// Solid bg, ink border (0.75pt-ish), identity color on the text — never on the fill.
const badgeVariants = cva(
  'inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider border border-ink',
  {
    variants: {
      variant: {
        default: 'bg-surface text-muted',
        accent: 'bg-surface text-accent',
        muted: 'bg-card text-muted',
        warm: 'bg-surface text-accent-warm',
        brand: 'bg-surface text-[#FC4C02]',
        alert: 'bg-surface text-accent-alert',
      },
    },
    defaultVariants: { variant: 'default' },
  },
)

export function Badge({ className, variant, ...props }) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />
}
