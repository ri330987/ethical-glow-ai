import { useEffect, useState } from 'react';
import { Activity, Gauge, Thermometer, Zap, TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface KPIData {
  id: string;
  title: string;
  value: number;
  unit: string;
  target: number;
  status: 'optimal' | 'warning' | 'critical';
  trend: 'up' | 'down' | 'stable';
  change: number;
  icon: 'activity' | 'gauge' | 'thermometer' | 'zap';
}

const initialKPIs: KPIData[] = [
  {
    id: 'production',
    title: 'Production Rate',
    value: 2847,
    unit: 'bbl/day',
    target: 3000,
    status: 'optimal',
    trend: 'up',
    change: 5.2,
    icon: 'activity'
  },
  {
    id: 'pressure',
    title: 'Wellhead Pressure',
    value: 2850,
    unit: 'psi',
    target: 2900,
    status: 'warning',
    trend: 'down',
    change: -2.1,
    icon: 'gauge'
  },
  {
    id: 'temperature',
    title: 'Operating Temp',
    value: 89,
    unit: '°C',
    target: 85,
    status: 'warning',
    trend: 'up',
    change: 3.8,
    icon: 'thermometer'
  },
  {
    id: 'power',
    title: 'Power Efficiency',
    value: 94.2,
    unit: '%',
    target: 95,
    status: 'optimal',
    trend: 'stable',
    change: 0.1,
    icon: 'zap'
  }
];

const iconMap = {
  activity: Activity,
  gauge: Gauge,
  thermometer: Thermometer,
  zap: Zap
};

function KPICard({ kpi }: { kpi: KPIData }) {
  const [displayValue, setDisplayValue] = useState(0);
  const Icon = iconMap[kpi.icon];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayValue(prev => {
        const diff = kpi.value - prev;
        if (Math.abs(diff) < 0.1) return kpi.value;
        return prev + diff * 0.1;
      });
    }, 50);
    
    return () => clearInterval(interval);
  }, [kpi.value]);

  const getStatusColor = () => {
    switch (kpi.status) {
      case 'critical': return 'text-digital-danger';
      case 'warning': return 'text-digital-warning';
      default: return 'text-digital-success';
    }
  };

  const getProgressColor = () => {
    switch (kpi.status) {
      case 'critical': return 'bg-digital-danger';
      case 'warning': return 'bg-digital-warning';
      default: return 'bg-digital-success';
    }
  };

  const progressValue = (displayValue / kpi.target) * 100;

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border hover:border-digital-primary/50 transition-all duration-300">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {kpi.title}
        </CardTitle>
        <Icon className={`h-4 w-4 ${getStatusColor()}`} />
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-3">
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-bold text-foreground">
              {displayValue.toFixed(kpi.unit === '%' ? 1 : 0)}
            </span>
            <span className="text-sm text-muted-foreground">{kpi.unit}</span>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Target: {kpi.target}{kpi.unit}</span>
              <div className="flex items-center space-x-1">
                {kpi.trend === 'up' ? (
                  <TrendingUp className="h-3 w-3 text-digital-success" />
                ) : kpi.trend === 'down' ? (
                  <TrendingDown className="h-3 w-3 text-digital-danger" />
                ) : (
                  <div className="h-3 w-3" />
                )}
                <span className={`${kpi.trend === 'up' ? 'text-digital-success' : kpi.trend === 'down' ? 'text-digital-danger' : 'text-muted-foreground'}`}>
                  {kpi.change > 0 ? '+' : ''}{kpi.change.toFixed(1)}%
                </span>
              </div>
            </div>
            
            <div className="relative">
              <Progress
                value={Math.min(progressValue, 100)}
                className="h-2"
              />
              <div className={`absolute inset-0 h-2 rounded-full opacity-20 ${getProgressColor()}`} />
            </div>
          </div>
          
          <div className={`text-xs font-medium ${getStatusColor()}`}>
            {kpi.status.toUpperCase()}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function KPIPanel() {
  const [kpis, setKpis] = useState(initialKPIs);

  useEffect(() => {
    const interval = setInterval(() => {
      setKpis(prev => prev.map(kpi => ({
        ...kpi,
        value: kpi.value + (Math.random() - 0.5) * (kpi.value * 0.02),
        change: kpi.change + (Math.random() - 0.5) * 2
      })));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-foreground">Live Performance Metrics</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map(kpi => (
          <KPICard key={kpi.id} kpi={kpi} />
        ))}
      </div>
    </div>
  );
}