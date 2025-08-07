import { useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Play, Pause, SkipBack, SkipForward } from "lucide-react"
import { MetricCard } from "@/components/ui/metric-card"

const timelineData = [
  { time: "00:00", event: "System initialization", score: 95 },
  { time: "02:15", event: "Bias scan initiated", score: 92 },
  { time: "04:30", event: "Anomaly detected", score: 78 },
  { time: "06:45", event: "Corrective action applied", score: 88 },
  { time: "09:00", event: "Compliance restored", score: 94 },
  { time: "11:15", event: "Report generated", score: 96 }
]

export function TimelineScrubber() {
  const [currentTime, setCurrentTime] = useState([2])
  const [isPlaying, setIsPlaying] = useState(false)
  
  const currentEvent = timelineData[Math.min(currentTime[0], timelineData.length - 1)]

  return (
    <MetricCard
      title="Decision Timeline"
      value={currentEvent?.time || "00:00"}
      subtitle={currentEvent?.event || "No event"}
      status={currentEvent?.score >= 90 ? 'safe' : currentEvent?.score >= 80 ? 'warning' : 'danger'}
      className="col-span-full"
    >
      <div className="space-y-6 mt-4">
        {/* Timeline Visualization */}
        <div className="relative">
          <div className="flex items-center justify-between mb-4">
            {timelineData.map((event, index) => (
              <div 
                key={index} 
                className={`flex flex-col items-center space-y-2 ${
                  index <= currentTime[0] ? 'text-cyber-cyan' : 'text-muted-foreground'
                }`}
              >
                <div className={`w-3 h-3 rounded-full border-2 ${
                  index <= currentTime[0] 
                    ? 'bg-cyber-cyan border-cyber-cyan cyber-glow' 
                    : 'border-muted-foreground'
                }`} />
                <div className="text-xs font-mono">{event.time}</div>
                <div className="text-xs text-center max-w-20">{event.event}</div>
              </div>
            ))}
          </div>
          
          {/* Progress line */}
          <div className="absolute top-[6px] left-0 right-0 h-0.5 bg-border">
            <div 
              className="h-full bg-gradient-to-r from-cyber-cyan to-cyber-blue transition-all duration-300"
              style={{ width: `${(currentTime[0] / (timelineData.length - 1)) * 100}%` }}
            />
          </div>
        </div>

        {/* Controls */}
        <div className="space-y-4">
          <Slider
            value={currentTime}
            onValueChange={setCurrentTime}
            max={timelineData.length - 1}
            step={1}
            className="w-full"
          />
          
          <div className="flex items-center justify-center space-x-2">
            <Button variant="outline" size="sm" className="cyber-glow">
              <SkipBack className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setIsPlaying(!isPlaying)}
              className="cyber-glow"
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
            <Button variant="outline" size="sm" className="cyber-glow">
              <SkipForward className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Current Event Details */}
        <div className="glass-panel p-4 rounded-lg">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-semibold text-foreground">{currentEvent?.event}</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Ethical compliance score: {currentEvent?.score}%
              </p>
            </div>
            <div className={`px-3 py-1 rounded-full text-xs font-medium ${
              currentEvent?.score >= 90 
                ? 'bg-quantum-green/20 text-quantum-green' 
                : currentEvent?.score >= 80 
                ? 'bg-plasma-orange/20 text-plasma-orange'
                : 'bg-destructive/20 text-destructive'
            }`}>
              {currentEvent?.score >= 90 ? 'COMPLIANT' : currentEvent?.score >= 80 ? 'WARNING' : 'CRITICAL'}
            </div>
          </div>
        </div>
      </div>
    </MetricCard>
  )
}