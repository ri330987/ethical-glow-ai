/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	LineChart,
	Line,
	PieChart,
	Pie,
	Cell,
	ResponsiveContainer
} from "recharts";
import {
	TrendingUp,
	TrendingDown,
	AlertTriangle,
	CheckCircle,
	MapPin,
	Gauge,
	DollarSign,
	Zap,
	Shield
} from "lucide-react";
import {
	generateGlobalKPIs,
	generatePipelineNetwork,
	generateAIInsights,
	type PipelineSegment
} from "@/lib/mockData";

interface StrategicOverviewProps {
	onSegmentSelect: (segmentId: string) => void;
}

export const StrategicOverview = ({ onSegmentSelect }: StrategicOverviewProps) => {
	const [kpis] = useState(generateGlobalKPIs());
	const [pipelineData] = useState(generatePipelineNetwork());
	const [aiInsights] = useState(generateAIInsights());

	// Aggregate data for charts
	const throughputTrend = Array.from({ length: 30 }, (_, i) => ({
		day: i + 1,
		throughput: 4000000 + Math.sin(i * 0.2) * 200000 + Math.random() * 100000,
		efficiency: 90 + Math.sin(i * 0.15) * 5 + Math.random() * 3
	}));

	const riskDistribution = [
		{
			name: "Optimal",
			value: pipelineData.filter((p) => p.status === "optimal").length,
			color: "hsl(var(--pipeline-optimal))"
		},
		{
			name: "Good",
			value: pipelineData.filter((p) => p.status === "good").length,
			color: "hsl(var(--pipeline-good))"
		},
		{
			name: "Warning",
			value: pipelineData.filter((p) => p.status === "warning").length,
			color: "hsl(var(--pipeline-warning))"
		},
		{
			name: "Danger",
			value: pipelineData.filter((p) => p.status === "danger").length,
			color: "hsl(var(--pipeline-danger))"
		},
		{
			name: "Critical",
			value: pipelineData.filter((p) => p.status === "critical").length,
			color: "hsl(var(--pipeline-critical))"
		}
	];

	const regionData = pipelineData.reduce((acc, pipeline) => {
		const region = pipeline.region;
		if (!acc[region]) {
			acc[region] = {
				name: region,
				segments: 0,
				throughput: 0,
				integrity: 0,
				riskScore: 0
			};
		}
		acc[region].segments += 1;
		acc[region].throughput += pipeline.throughput;
		acc[region].integrity += pipeline.integrity;
		acc[region].riskScore += pipeline.riskScore;
		return acc;
	}, {} as Record<string, any>);

	const regionStats = Object.values(regionData).map((region: any) => ({
		...region,
		throughput: Math.round(region.throughput),
		integrity: Math.round(region.integrity / region.segments),
		riskScore: Math.round(region.riskScore / region.segments)
	}));

	const criticalInsights = aiInsights
		.filter((insight) => insight.severity === "critical" || insight.severity === "high")
		.slice(0, 5);

	return (
		<div className="space-y-6 p-6">
			{/* Executive KPIs */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
				<Card className="bg-gradient-surface border-border/50 hover:shadow-elevation transition-all duration-300">
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium text-muted-foreground">
							Total Throughput
						</CardTitle>
						<Gauge className="h-4 w-4 text-primary" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold text-foreground">
							{(kpis.totalThroughput / 1000000).toFixed(1)}M
						</div>
						<p className="text-xs text-muted-foreground">
							<span className="text-success">+2.3%</span> barrels/day
						</p>
					</CardContent>
				</Card>

				<Card className="bg-gradient-surface border-border/50 hover:shadow-elevation transition-all duration-300">
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium text-muted-foreground">
							Network Integrity
						</CardTitle>
						<Shield className="h-4 w-4 text-success" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold text-foreground">{kpis.networkIntegrity}%</div>
						<p className="text-xs text-muted-foreground">
							<span className="text-success">+1.2%</span> from last month
						</p>
					</CardContent>
				</Card>

				<Card className="bg-gradient-surface border-border/50 hover:shadow-elevation transition-all duration-300">
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium text-muted-foreground">
							Operational Efficiency
						</CardTitle>
						<Zap className="h-4 w-4 text-warning" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold text-foreground">{kpis.operationalEfficiency}%</div>
						<p className="text-xs text-muted-foreground">
							<span className="text-warning">-0.5%</span> optimization needed
						</p>
					</CardContent>
				</Card>

				<Card className="bg-gradient-surface border-border/50 hover:shadow-elevation transition-all duration-300">
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium text-muted-foreground">
							Monthly Incidents
						</CardTitle>
						<AlertTriangle className="h-4 w-4 text-danger" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold text-foreground">{kpis.leakIncidents}</div>
						<p className="text-xs text-muted-foreground">
							<span className="text-success">-40%</span> vs. last month
						</p>
					</CardContent>
				</Card>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				{/* Throughput Trend */}
				<Card className="lg:col-span-2 bg-gradient-surface border-border/50">
					<CardHeader>
						<CardTitle className="text-foreground">Network Performance Trend</CardTitle>
						<CardDescription>30-day throughput and efficiency metrics</CardDescription>
					</CardHeader>
					<CardContent>
						<ResponsiveContainer width="100%" height={300}>
							<LineChart data={throughputTrend}>
								<CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
								<XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" />
								<YAxis yAxisId="left" stroke="hsl(var(--muted-foreground))" />
								<YAxis yAxisId="right" orientation="right" stroke="hsl(var(--muted-foreground))" />
								<Tooltip
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
									dataKey="throughput"
									stroke="hsl(var(--primary))"
									strokeWidth={2}
									name="Throughput (bbl/day)"
								/>
								<Line
									yAxisId="right"
									type="monotone"
									dataKey="efficiency"
									stroke="hsl(var(--warning))"
									strokeWidth={2}
									name="Efficiency (%)"
								/>
							</LineChart>
						</ResponsiveContainer>
					</CardContent>
				</Card>

				{/* Risk Distribution */}
				<Card className="bg-gradient-surface border-border/50">
					<CardHeader>
						<CardTitle className="text-foreground">Pipeline Health Status</CardTitle>
						<CardDescription>Current segment risk distribution</CardDescription>
					</CardHeader>
					<CardContent>
						<ResponsiveContainer width="100%" height={300}>
							<PieChart>
								<Pie
									data={riskDistribution}
									cx="50%"
									cy="50%"
									innerRadius={60}
									outerRadius={100}
									paddingAngle={5}
									dataKey="value"
								>
									{riskDistribution.map((entry, index) => (
										<Cell key={`cell-${index}`} fill={entry.color} />
									))}
								</Pie>
								<Tooltip
									contentStyle={{
										backgroundColor: "hsl(var(--popover))",
										border: "1px solid hsl(var(--border))",
										borderRadius: "8px"
									}}
								/>
								<Legend />
							</PieChart>
						</ResponsiveContainer>
					</CardContent>
				</Card>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				{/* Regional Performance */}
				<Card className="bg-gradient-surface border-border/50">
					<CardHeader>
						<CardTitle className="text-foreground">Regional Performance</CardTitle>
						<CardDescription>Throughput and integrity by region</CardDescription>
					</CardHeader>
					<CardContent>
						<ResponsiveContainer width="100%" height={300}>
							<BarChart data={regionStats}>
								<CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
								<XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
								<YAxis stroke="hsl(var(--muted-foreground))" />
								<Tooltip
									contentStyle={{
										backgroundColor: "hsl(var(--popover))",
										border: "1px solid hsl(var(--border))",
										borderRadius: "8px"
									}}
								/>
								<Legend />
								<Bar dataKey="integrity" fill="hsl(var(--primary))" name="Integrity %" />
								<Bar dataKey="riskScore" fill="hsl(var(--warning))" name="Risk Score" />
							</BarChart>
						</ResponsiveContainer>
					</CardContent>
				</Card>

				{/* AI Strategic Insights */}
				<Card className="bg-gradient-surface border-border/50">
					<CardHeader>
						<CardTitle className="text-foreground flex items-center">
							<div className="w-2 h-2 bg-primary rounded-full mr-2 animate-pulse"></div>
							AI Strategic Advisor
						</CardTitle>
						<CardDescription>Critical insights and recommendations</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						{criticalInsights.map((insight) => (
							<div
								key={insight.id}
								className="p-3 rounded-lg bg-muted/50 border border-border/50 hover:bg-muted/70 transition-all duration-200"
							>
								<div className="flex items-start justify-between">
									<div className="flex-1">
										<div className="flex items-center space-x-2 mb-1">
											<Badge
												variant={insight.severity === "critical" ? "destructive" : "secondary"}
												className="text-xs"
											>
												{insight.severity.toUpperCase()}
											</Badge>
											<Badge variant="outline" className="text-xs">
												{insight.confidence}% confidence
											</Badge>
										</div>
										<h4 className="font-semibold text-sm text-foreground">{insight.title}</h4>
										<p className="text-xs text-muted-foreground mt-1">{insight.description}</p>
										<div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
											<span>Impact: ${insight.estimatedImpact.cost.toLocaleString()}</span>
											<span>Downtime: {insight.estimatedImpact.downtime}h</span>
										</div>
									</div>
									{insight.actionRequired && (
										<AlertTriangle className="h-4 w-4 text-warning flex-shrink-0 ml-2" />
									)}
								</div>
							</div>
						))}
					</CardContent>
				</Card>
			</div>

			{/* Pipeline Segment Quick Access */}
			<Card className="bg-gradient-surface border-border/50">
				<CardHeader>
					<CardTitle className="text-foreground">Pipeline Network Overview</CardTitle>
					<CardDescription>Click any segment to drill down to operational details</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
						{pipelineData.slice(0, 12).map((segment) => (
							<Button
								key={segment.id}
								variant="outline"
								className="h-auto p-4 justify-start hover:shadow-glow transition-all duration-300"
								onClick={() => onSegmentSelect(segment.id)}
							>
								<div className="flex items-start space-x-3 w-full">
									<div
										className={`
                    w-3 h-3 rounded-full flex-shrink-0 mt-1
                    ${segment.status === "optimal" ? "bg-pipeline-optimal" : ""}
                    ${segment.status === "good" ? "bg-pipeline-good" : ""}
                    ${segment.status === "warning" ? "bg-pipeline-warning" : ""}
                    ${segment.status === "danger" ? "bg-pipeline-danger" : ""}
                    ${segment.status === "critical" ? "bg-pipeline-critical animate-pulse" : ""}
                  `}
									/>
									<div className="text-left flex-1">
										<div className="font-semibold text-sm">{segment.name}</div>
										<div className="text-xs text-muted-foreground">{segment.region}</div>
										<div className="text-xs text-muted-foreground mt-1">
											{(segment.throughput / 1000).toFixed(0)}k bbl/day
										</div>
									</div>
								</div>
							</Button>
						))}
					</div>
				</CardContent>
			</Card>
		</div>
	);
};
