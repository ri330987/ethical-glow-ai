import { MetricCard } from "@/components/ui/metric-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Globe, Send, Download, Users, Building2, Zap } from "lucide-react"

const globalSites = [
  { region: "North America", status: "Compliant", score: 94, incidents: 2 },
  { region: "Europe", status: "Compliant", score: 96, incidents: 1 },
  { region: "Asia Pacific", status: "Warning", score: 82, incidents: 5 },
  { region: "Latin America", status: "Compliant", score: 91, incidents: 3 }
]

export function GlobalReports() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Global Compliance Dashboard</h2>
        <div className="flex space-x-2">
          <Button variant="outline" className="cyber-glow">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
          <Button className="bg-gradient-to-r from-cyber-cyan to-cyber-blue hover:opacity-90">
            <Send className="mr-2 h-4 w-4" />
            Share Globally
          </Button>
        </div>
      </div>

      {/* Global Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard
          title="Global Sites"
          value="24"
          subtitle="Active monitoring"
          status="safe"
          icon={<Globe className="h-6 w-6" />}
        />
        <MetricCard
          title="Total Users"
          value="2.4M"
          subtitle="Under governance"
          status="neutral"
          icon={<Users className="h-6 w-6" />}
        />
        <MetricCard
          title="Decisions/Hour"
          value="15.2K"
          subtitle="Ethically validated"
          status="safe"
          icon={<Zap className="h-6 w-6" />}
        />
      </div>

      {/* Regional Status */}
      <MetricCard
        title="Regional Compliance Status"
        value=""
        status="neutral"
        icon={<Building2 className="h-6 w-6" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {globalSites.map((site) => (
            <div 
              key={site.region}
              className="glass-panel p-4 rounded-lg border-l-4"
              style={{
                borderLeftColor: site.status === 'Compliant' 
                  ? 'hsl(var(--quantum-green))' 
                  : 'hsl(var(--plasma-orange))'
              }}
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-semibold text-foreground">{site.region}</h4>
                  <p className="text-sm text-muted-foreground">Score: {site.score}%</p>
                </div>
                <Badge 
                  variant="outline" 
                  className={site.status === 'Compliant' 
                    ? 'text-quantum-green border-quantum-green' 
                    : 'text-plasma-orange border-plasma-orange'
                  }
                >
                  {site.status}
                </Badge>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Incidents (24h):</span>
                <span className="text-foreground font-medium">{site.incidents}</span>
              </div>
              
              {/* Mini progress bar */}
              <div className="mt-3 w-full bg-border rounded-full h-2">
                <div 
                  className="h-2 rounded-full transition-all duration-300"
                  style={{ 
                    width: `${site.score}%`,
                    background: site.score >= 90 
                      ? 'hsl(var(--quantum-green))' 
                      : 'hsl(var(--plasma-orange))'
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </MetricCard>

      {/* Recent Global Activity */}
      <MetricCard
        title="Global Activity Feed"
        value=""
        status="neutral"
      >
        <div className="space-y-3 mt-4 max-h-64 overflow-y-auto">
          <div className="flex items-center space-x-3 p-3 glass-panel rounded-lg">
            <div className="w-2 h-2 bg-quantum-green rounded-full"></div>
            <div className="flex-1">
              <p className="text-sm font-medium">EMEA Region: Bias scan completed successfully</p>
              <p className="text-xs text-muted-foreground">2 minutes ago</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-3 glass-panel rounded-lg">
            <div className="w-2 h-2 bg-plasma-orange rounded-full"></div>
            <div className="flex-1">
              <p className="text-sm font-medium">APAC Region: Anomaly detected in hiring algorithm</p>
              <p className="text-xs text-muted-foreground">15 minutes ago</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-3 glass-panel rounded-lg">
            <div className="w-2 h-2 bg-cyber-cyan rounded-full"></div>
            <div className="flex-1">
              <p className="text-sm font-medium">Americas: Compliance report shared with stakeholders</p>
              <p className="text-xs text-muted-foreground">1 hour ago</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-3 glass-panel rounded-lg">
            <div className="w-2 h-2 bg-quantum-green rounded-full"></div>
            <div className="flex-1">
              <p className="text-sm font-medium">Global: All regions synchronized - Status: COMPLIANT</p>
              <p className="text-xs text-muted-foreground">2 hours ago</p>
            </div>
          </div>
        </div>
      </MetricCard>
    </div>
  )
}