import { BiasMonitor } from "@/components/bias-monitor"
import { TimelineScrubber } from "@/components/timeline-scrubber"
import { GlobalReports } from "@/components/global-reports"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Shield, Bot, Settings } from "lucide-react"

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="glass-panel border-b border-glass-border p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Bot className="h-8 w-8 text-cyber-cyan cyber-glow" />
              <h1 className="text-2xl font-bold text-foreground">ZARA</h1>
            </div>
            <Badge variant="outline" className="cyber-glow border-cyber-cyan text-cyber-cyan">
              Ethical AI Governance
            </Badge>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm text-muted-foreground">System Operator</p>
              <p className="font-medium text-foreground">Emily Rodriguez</p>
            </div>
            <Button variant="outline" size="sm" className="cyber-glow">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Dashboard */}
      <main className="max-w-7xl mx-auto p-6 space-y-8">
        {/* System Status Banner */}
        <div className="glass-panel p-6 rounded-xl border-quantum-green success-glow">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Shield className="h-8 w-8 text-quantum-green" />
              <div>
                <h2 className="text-xl font-bold text-foreground">Bias scan complete. All decisions within ethical thresholds.</h2>
                <p className="text-muted-foreground">Incident logged and shared across global sites.</p>
              </div>
            </div>
            <Badge className="bg-quantum-green/20 text-quantum-green border-quantum-green">
              COMPLIANT
            </Badge>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Bias Monitoring */}
          <div>
            <BiasMonitor />
          </div>
          
          {/* Global Reports */}
          <div>
            <GlobalReports />
          </div>
        </div>

        {/* Timeline Scrubber */}
        <TimelineScrubber />
      </main>
    </div>
  );
};

export default Index;
