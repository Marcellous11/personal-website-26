import { createContext, useContext } from 'react'
import { cn } from '@/lib/utils'

const TabsContext = createContext(null)

export function Tabs({ value, onValueChange, className, children }) {
  return (
    <TabsContext.Provider value={{ value, onValueChange }}>
      <div className={cn('', className)}>{children}</div>
    </TabsContext.Provider>
  )
}

export function TabsList({ className, ...props }) {
  return (
    <div
      className={cn('inline-flex rounded-atelier-md overflow-hidden border border-ink bg-surface', className)}
      {...props}
    />
  )
}

export function TabsTrigger({ value, className, children, ...props }) {
  const ctx = useContext(TabsContext)
  const active = ctx?.value === value
  return (
    <button
      onClick={() => ctx?.onValueChange?.(value)}
      className={cn(
        'font-mono text-[9px] px-2.5 py-1 transition-colors duration-150',
        active ? 'bg-accent text-paper' : 'text-muted hover:text-ink',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}
