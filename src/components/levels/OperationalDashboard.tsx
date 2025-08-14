import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	AreaChart,
	Area,
	ResponsiveContainer
} from "recharts";
import {
	Activity,
	Thermometer,
	Gauge,
	Zap,
	AlertTriangle,
	CheckCircle,
	Clock,
	TrendingUp,
	Settings,
	MapPin,
	Wrench,
	Brain
} from "lucide-react";
import {
	generateSensorData,
	generatePipelineNetwork,
	generateAIInsights,
	type SensorData
} from "@/lib/mockData";

interface OperationalDashboardProps {
	segmentId: string;
	onComponentSelect: (componentId: string) => void;
}

export const OperationalDashboard = ({
	segmentId,
	onComponentSelect
}: OperationalDashboardProps) => {
	const [sensorData] = useState<SensorData[]>(generateSensorData(24));
	const [pipelineData] = useState(generatePipelineNetwork());
	const [aiInsights] = useState(generateAIInsights());
	const [selectedTimeRange, setSelectedTimeRange] = useState<"1h" | "6h" | "24h" | "7d">("24h");

	const segment = pipelineData.find((p) => p.id === segmentId);
	const operationalInsights = aiInsights.filter(
		(insight) => insight.type === "optimization" || insight.type === "maintenance"
	);

	// Generate maintenance history
	const maintenanceHistory = Array.from({ length: 8 }, (_, i) => ({
		date: new Date(Date.now() - i * 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
		type: ["Inspection", "Repair", "Replacement", "Calibration"][Math.floor(Math.random() * 4)],
		component: `Component ${Math.floor(Math.random() * 10) + 1}`,
		status: ["Completed", "In Progress", "Scheduled"][Math.floor(Math.random() * 3)],
		technician: `Tech-${Math.floor(Math.random() * 99) + 1}`
	}));

	// Live sensor readings
	const latestSensorData = sensorData[sensorData.length - 1];

	// Component health simulation
	const componentHealth = Array.from({ length: 12 }, (_, i) => ({
		id: `comp-${i + 1}`,
		name: `Component ${i + 1}`,
		type: ["Valve", "Sensor", "Joint", "Pump"][Math.floor(Math.random() * 4)],
		health: Math.round(70 + Math.random() * 30),
		status: ["optimal", "warning", "critical"][Math.floor(Math.random() * 3)],
		lastMaintenance: Math.floor(Math.random() * 30),
		nextMaintenance: Math.floor(Math.random() * 60) + 30
	}));

	if (!segment) {
		return (
			<div className="flex items-center justify-center h-96">
				<div className="text-center">
					<AlertTriangle className="h-12 w-12 text-warning mx-auto mb-4" />
					<h3 className="text-lg font-semibold">Segment Not Found</h3>
					<p className="text-muted-foreground">
						The requested pipeline segment could not be located.
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className="space-y-6 p-6">
			{/* Segment Overview Header */}
			<Card className="bg-gradient-surface border-border/50">
				<CardHeader>
					<div className="flex items-center justify-between">
						<div>
							<CardTitle className="text-xl text-foreground flex items-center">
								<MapPin className="h-5 w-5 mr-2 text-primary" />
								{segment.name}
							</CardTitle>
							<CardDescription className="text-base">
								{segment.region} • {(segment.throughput / 1000).toFixed(0)}k barrels/day
							</CardDescription>
						</div>
						<Badge
							variant={segment.status === "optimal" ? "default" : "destructive"}
							className={`
                text-sm px-3 py-1
                ${segment.status === "optimal" ? "bg-pipeline-optimal text-white" : ""}
                ${segment.status === "good" ? "bg-pipeline-good text-white" : ""}
                ${segment.status === "warning" ? "bg-pipeline-warning text-black" : ""}
                ${segment.status === "danger" ? "bg-pipeline-danger text-white" : ""}
                ${
									segment.status === "critical"
										? "bg-pipeline-critical text-white animate-pulse"
										: ""
								}
              `}
						>
							{segment.status.charAt(0).toUpperCase() + segment.status.slice(1)}
						</Badge>
					</div>
				</CardHeader>
			</Card>

			{/* Real-time Sensor Dashboard */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
				<Card className="bg-gradient-surface border-border/50 hover:shadow-glow transition-all duration-300">
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium text-muted-foreground">Pressure</CardTitle>
						<Gauge className="h-4 w-4 text-primary" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold text-foreground">
							{latestSensorData?.pressure.toFixed(0)} PSI
						</div>
						<p className="text-xs text-muted-foreground">Normal range: 950-1200 PSI</p>
					</CardContent>
				</Card>

				<Card className="bg-gradient-surface border-border/50 hover:shadow-glow transition-all duration-300">
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium text-muted-foreground">Temperature</CardTitle>
						<Thermometer className="h-4 w-4 text-warning" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold text-foreground">
							{latestSensorData?.temperature.toFixed(1)}°F
						</div>
						<p className="text-xs text-muted-foreground">Optimal range: 65-85°F</p>
					</CardContent>
				</Card>

				<Card className="bg-gradient-surface border-border/50 hover:shadow-glow transition-all duration-300">
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium text-muted-foreground">Flow Rate</CardTitle>
						<Activity className="h-4 w-4 text-success" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold text-foreground">
							{latestSensorData?.flow.toFixed(1)}%
						</div>
						<p className="text-xs text-muted-foreground">Target: 85-95% capacity</p>
					</CardContent>
				</Card>

				<Card className="bg-gradient-surface border-border/50 hover:shadow-glow transition-all duration-300">
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium text-muted-foreground">Integrity</CardTitle>
						<CheckCircle className="h-4 w-4 text-success" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold text-foreground">
							{latestSensorData?.integrity.toFixed(1)}%
						</div>
						<p className="text-xs text-muted-foreground">Minimum threshold: 70%</p>
					</CardContent>
				</Card>
			</div>

			<Tabs defaultValue="sensors" className="space-y-6">
				<TabsList className="grid w-full grid-cols-4 bg-muted/50">
					<TabsTrigger value="sensors">Real-time Sensors</TabsTrigger>
					<TabsTrigger value="components">Component Health</TabsTrigger>
					<TabsTrigger value="maintenance">Maintenance</TabsTrigger>
					<TabsTrigger value="ai-diagnostics">AI Diagnostics</TabsTrigger>
				</TabsList>

				<TabsContent value="sensors" className="space-y-6">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
						{/* Pressure & Temperature Trends */}
						<Card className="bg-gradient-surface border-border/50">
							<CardHeader>
								<CardTitle className="text-foreground">Pressure & Temperature</CardTitle>
								<CardDescription>24-hour trend analysis</CardDescription>
							</CardHeader>
							<CardContent>
								<ResponsiveContainer width="100%" height={300}>
									<LineChart data={sensorData}>
										<CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
										<XAxis
											dataKey="timestamp"
											stroke="hsl(var(--muted-foreground))"
											tickFormatter={(time) => new Date(time).toLocaleTimeString()}
										/>
										<YAxis yAxisId="left" stroke="hsl(var(--muted-foreground))" />
										<YAxis
											yAxisId="right"
											orientation="right"
											stroke="hsl(var(--muted-foreground))"
										/>
										<Tooltip
											labelFormatter={(time) => new Date(time).toLocaleString()}
											contentStyle={{
												backgroundColor: "hsl(var(--popover))",
												border: "1px solid hsl(var(--border))",
												borderRadius: "8px"
											}}
										/>
										<Legend />
										<Line
											yAxisId="left"
											type="monotone"
											dataKey="pressure"
											stroke="hsl(var(--primary))"
											strokeWidth={2}
											name="Pressure (PSI)"
										/>
										<Line
											yAxisId="right"
											type="monotone"
											dataKey="temperature"
											stroke="hsl(var(--warning))"
											strokeWidth={2}
											name="Temperature (°F)"
										/>
									</LineChart>
								</ResponsiveContainer>
							</CardContent>
						</Card>

						{/* Flow & Vibration */}
						<Card className="bg-gradient-surface border-border/50">
							<CardHeader>
								<CardTitle className="text-foreground">Flow & Vibration Analysis</CardTitle>
								<CardDescription>Performance and stability metrics</CardDescription>
							</CardHeader>
							<CardContent>
								<ResponsiveContainer width="100%" height={300}>
									<AreaChart data={sensorData}>
										<CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
										<XAxis
											dataKey="timestamp"
											stroke="hsl(var(--muted-foreground))"
											tickFormatter={(time) => new Date(time).toLocaleTimeString()}
										/>
										<YAxis yAxisId="left" stroke="hsl(var(--muted-foreground))" />
										<YAxis
											yAxisId="right"
											orientation="right"
											stroke="hsl(var(--muted-foreground))"
										/>
										<Tooltip
											labelFormatter={(time) => new Date(time).toLocaleString()}
											contentStyle={{
												backgroundColor: "hsl(var(--popover))",
												border: "1px solid hsl(var(--border))",
												borderRadius: "8px"
											}}
										/>
										<Legend />
										<Area
											yAxisId="left"
											type="monotone"
											dataKey="flow"
											stackId="1"
											stroke="hsl(var(--success))"
											fill="hsl(var(--success))"
											fillOpacity={0.3}
											name="Flow Rate (%)"
										/>
										<Line
											yAxisId="right"
											type="monotone"
											dataKey="vibration"
											stroke="hsl(var(--danger))"
											strokeWidth={2}
											name="Vibration Level"
										/>
									</AreaChart>
								</ResponsiveContainer>
							</CardContent>
						</Card>
					</div>
				</TabsContent>

				<TabsContent value="components" className="space-y-6">
					<Card className="bg-gradient-surface border-border/50">
						<CardHeader>
							<CardTitle className="text-foreground">Component Health Matrix</CardTitle>
							<CardDescription>
								Individual component status and maintenance schedules
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
								{componentHealth.map((component) => (
									<Button
										key={component.id}
										variant="outline"
										className="h-auto p-4 justify-start hover:shadow-glow transition-all duration-300"
										onClick={() => onComponentSelect(component.id)}
									>
										<div className="flex items-start space-x-3 w-full">
											<div
												className={`
                        w-3 h-3 rounded-full flex-shrink-0 mt-1
                        ${component.status === "optimal" ? "bg-pipeline-optimal" : ""}
                        ${component.status === "warning" ? "bg-pipeline-warning" : ""}
                        ${
													component.status === "critical"
														? "bg-pipeline-critical animate-pulse"
														: ""
												}
                      `}
											/>
											<div className="text-left flex-1">
												<div className="font-semibold text-sm">{component.name}</div>
												<div className="text-xs text-muted-foreground">{component.type}</div>
												<div className="text-xs text-muted-foreground mt-1">
													Health: {component.health}%
												</div>
												<div className="text-xs text-muted-foreground">
													Next service: {component.nextMaintenance}d
												</div>
											</div>
										</div>
									</Button>
								))}
							</div>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="maintenance" className="space-y-6">
					<Card className="bg-gradient-surface border-border/50">
						<CardHeader>
							<CardTitle className="text-foreground flex items-center">
								<Wrench className="h-5 w-5 mr-2" />
								Maintenance History & Schedule
							</CardTitle>
							<CardDescription>Recent activities and upcoming maintenance</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="space-y-3">
								{maintenanceHistory.map((item, index) => (
									<div
										key={index}
										className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-border/50"
									>
										<div className="flex items-center space-x-3">
											<div
												className={`
                        w-2 h-2 rounded-full
                        ${item.status === "Completed" ? "bg-success" : ""}
                        ${item.status === "In Progress" ? "bg-warning" : ""}
                        ${item.status === "Scheduled" ? "bg-primary" : ""}
                      `}
											/>
											<div>
												<div className="font-medium text-sm">{item.type}</div>
												<div className="text-xs text-muted-foreground">
													{item.component} • {item.technician}
												</div>
											</div>
										</div>
										<div className="text-right">
											<div className="text-xs text-muted-foreground">{item.date}</div>
											<Badge
												variant={item.status === "Completed" ? "default" : "secondary"}
												className="text-xs"
											>
												{item.status}
											</Badge>
										</div>
									</div>
								))}
							</div>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="ai-diagnostics" className="space-y-6">
					<Card className="bg-gradient-surface border-border/50">
						<CardHeader>
							<CardTitle className="text-foreground flex items-center">
								<Brain className="h-5 w-5 mr-2 text-primary" />
								<div className="w-2 h-2 bg-primary rounded-full mr-2 animate-pulse"></div>
								Operations Optimizer AI
							</CardTitle>
							<CardDescription>Real-time optimization and predictive maintenance</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							{operationalInsights.map((insight) => (
								<div
									key={insight.id}
									className="p-4 rounded-lg bg-muted/50 border border-border/50 hover:bg-muted/70 transition-all duration-200"
								>
									<div className="flex items-start justify-between">
										<div className="flex-1">
											<div className="flex items-center space-x-2 mb-2">
												<Badge
													variant={insight.severity === "critical" ? "destructive" : "secondary"}
													className="text-xs"
												>
													{insight.type.toUpperCase()}
												</Badge>
												<Badge variant="outline" className="text-xs">
													{insight.confidence}% confidence
												</Badge>
												{insight.actionRequired && (
													<Badge variant="destructive" className="text-xs">
														ACTION REQUIRED
													</Badge>
												)}
											</div>
											<h4 className="font-semibold text-foreground">{insight.title}</h4>
											<p className="text-sm text-muted-foreground mt-2">{insight.description}</p>
											<div className="grid grid-cols-3 gap-4 mt-3 text-sm">
												<div>
													<span className="text-muted-foreground">Cost Impact:</span>
													<div className="font-medium">
														${insight.estimatedImpact.cost.toLocaleString()}
													</div>
												</div>
												<div>
													<span className="text-muted-foreground">Downtime:</span>
													<div className="font-medium">
														{insight.estimatedImpact.downtime} hours
													</div>
												</div>
												<div>
													<span className="text-muted-foreground">Environmental:</span>
													<div
														className={`font-medium capitalize
                            ${insight.estimatedImpact.environmental === "high" ? "text-danger" : ""}
                            ${
															insight.estimatedImpact.environmental === "medium"
																? "text-warning"
																: ""
														}
                            ${insight.estimatedImpact.environmental === "low" ? "text-success" : ""}
                          `}
													>
														{insight.estimatedImpact.environmental}
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							))}
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	);
};
