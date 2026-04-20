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
      className={cn('inline-flex rounded-lg overflow-hidden border border-border', className)}
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
        active ? 'bg-accent text-bg' : 'text-muted hover:text-light',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}
