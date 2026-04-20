import { useEffect } from 'react'
import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { cn } from '@/lib/utils'

export function AnimatedNumber({ value, decimals = 0, suffix = '', className, duration = 1.2 }) {
  const mv = useMotionValue(0)
  const rounded = useTransform(mv, latest => {
    if (typeof latest !== 'number' || Number.isNaN(latest)) return '0'
    const fixed = latest.toFixed(decimals)
    return decimals === 0 ? Number(fixed).toLocaleString() : fixed
  })

  useEffect(() => {
    if (typeof value !== 'number' || Number.isNaN(value)) return
    const controls = animate(mv, value, { duration, ease: [0.16, 1, 0.3, 1] })
    return controls.stop
  }, [value, mv, duration])

  return (
    <span className={cn('inline-flex items-baseline', className)}>
      <motion.span>{rounded}</motion.span>
      {suffix && <span className="ml-1">{suffix}</span>}
    </span>
  )
}
