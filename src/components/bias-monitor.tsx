import { MetricCard } from "@/components/ui/metric-card"
import { ProgressRing } from "@/components/ui/progress-ring"
import { Badge } from "@/components/ui/badge"
import { Shield, AlertTriangle, CheckCircle, Activity } from "lucide-react"

const biasMetrics = [
  { category: "Gender", score: 92, trend: "+2%" },
  { category: "Race", score: 88, trend: "+1%" },
  { category: "Age", score: 95, trend: "0%" },
  { category: "Geographic", score: 85, trend: "-1%" }
]

export function BiasMonitor() {
  const overallScore = 90

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Bias Monitoring</h2>
        <Badge variant="outline" className="cyber-glow border-cyber-cyan text-cyber-cyan">
          <Activity className="mr-2 h-4 w-4" />
          Real-time Scanning
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Overall Score */}
        <MetricCard
          title="Overall Ethical Score"
          value=""
          status="safe"
          icon={<Shield className="h-6 w-6" />}
          className="col-span-1"
        >
          <div className="flex items-center justify-center">
            <ProgressRing progress={overallScore} size={120}>
              <div className="text-center">
                <div className="text-2xl font-bold text-quantum-green">{overallScore}%</div>
                <div className="text-xs text-muted-foreground">COMPLIANT</div>
              </div>
            </ProgressRing>
          </div>
        </MetricCard>

        {/* Bias Categories */}
        <div className="col-span-2 grid grid-cols-2 gap-4">
          {biasMetrics.map((metric) => (
            <MetricCard
              key={metric.category}
              title={metric.category}
              value={`${metric.score}%`}
              subtitle={`${metric.trend} from last scan`}
              status={metric.score >= 90 ? 'safe' : metric.score >= 80 ? 'warning' : 'danger'}
              icon={metric.score >= 90 ? <CheckCircle className="h-5 w-5" /> : <AlertTriangle className="h-5 w-5" />}
            />
          ))}
        </div>
      </div>

      {/* Recent Incidents */}
      <MetricCard
        title="Recent Incident Log"
        value="3"
        subtitle="incidents in last 24h"
        status="warning"
        icon={<AlertTriangle className="h-6 w-6" />}
      >
        <div className="space-y-2 mt-4">
          <div className="flex justify-between items-center p-2 rounded border border-border/50">
            <span className="text-sm">Geographic bias detected in loan approvals</span>
            <Badge variant="outline" className="text-plasma-orange border-plasma-orange">
              Flagged
            </Badge>
          </div>
          <div className="flex justify-between items-center p-2 rounded border border-border/50">
            <span className="text-sm">Age discrimination in hiring recommendations</span>
            <Badge variant="outline" className="text-quantum-green border-quantum-green">
              Resolved
            </Badge>
          </div>
          <div className="flex justify-between items-center p-2 rounded border border-border/50">
            <span className="text-sm">Gender bias in performance evaluations</span>
            <Badge variant="outline" className="text-cyber-cyan border-cyber-cyan">
              Under Review
            </Badge>
          </div>
        </div>
      </MetricCard>
    </div>
  )
}