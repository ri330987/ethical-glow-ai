import { cn } from "@/lib/utils"
import { ReactNode } from "react"

interface MetricCardProps {
  title: string
  value: string | number
  subtitle?: string
  status?: 'safe' | 'warning' | 'danger' | 'neutral'
  icon?: ReactNode
  className?: string
  children?: ReactNode
}

export function MetricCard({ 
  title, 
  value, 
  subtitle, 
  status = 'neutral', 
  icon, 
  className,
  children 
}: MetricCardProps) {
  const statusClasses = {
    safe: 'border-quantum-green success-glow',
    warning: 'border-plasma-orange warning-glow',
    danger: 'border-destructive',
    neutral: 'border-cyber-cyan cyber-glow'
  }

  return (
    <div className={cn(
      "glass-panel rounded-xl p-6 hologram-flicker",
      statusClasses[status],
      className
    )}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-muted-foreground tracking-wide uppercase">
          {title}
        </h3>
        {icon && (
          <div className="text-cyber-cyan">
            {icon}
          </div>
        )}
      </div>
      
      <div className="space-y-2">
        <div className="text-3xl font-bold text-foreground data-pulse">
          {value}
        </div>
        {subtitle && (
          <div className="text-sm text-muted-foreground">
            {subtitle}
          </div>
        )}
      </div>
      
      {children && (
        <div className="mt-4">
          {children}
        </div>
      )}
    </div>
  )
}