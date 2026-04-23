import { cn } from '@/lib/utils'

// Atelier card pattern (spec §Card pattern):
// Background: card. Border: 1pt strokeStrong. Corners: 10pt continuous. No shadow.
export function Card({ className, ...props }) {
  return (
    <div
      className={cn('bg-surface border border-ink rounded-atelier-card', className)}
      {...props}
    />
  )
}

// Recessed inset — paperDeep surface.
export function CardInner({ className, ...props }) {
  return (
    <div
      className={cn('bg-card border border-ink rounded-atelier-md', className)}
      {...props}
    />
  )
}

export function CardHeader({ className, ...props }) {
  return <div className={cn('flex items-center justify-between', className)} {...props} />
}

export function CardContent({ className, ...props }) {
  return <div className={cn('', className)} {...props} />
}
