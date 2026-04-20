import { cn } from '@/lib/utils'

export function Card({ className, ...props }) {
  return (
    <div
      className={cn('bg-card border border-border rounded-2xl', className)}
      {...props}
    />
  )
}

export function CardInner({ className, ...props }) {
  return (
    <div
      className={cn('bg-surface border border-border rounded-xl', className)}
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
