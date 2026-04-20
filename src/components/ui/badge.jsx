import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider',
  {
    variants: {
      variant: {
        default: 'bg-bg text-muted',
        accent: 'bg-accent/15 text-accent',
        muted: 'bg-border/40 text-muted',
        brand: 'bg-[#FC4C02]/15 text-[#FC4C02]',
      },
    },
    defaultVariants: { variant: 'default' },
  },
)

export function Badge({ className, variant, ...props }) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />
}
