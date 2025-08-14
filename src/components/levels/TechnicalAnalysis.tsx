/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Text, Box, Sphere, Cylinder } from "@react-three/drei";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer
} from "recharts";
import { Cpu, Zap, AlertTriangle, Activity, Eye } from "lucide-react";
import { generate3DComponents, generateSensorData } from "@/lib/mockData";

interface TechnicalAnalysisProps {
	componentId: string;
}

// 3D Component Visualization
const Component3D = ({ component }: { component: any }) => {
	const getColor = (status: string) => {
		switch (status) {
			case "optimal":
				return "#22c55e";
			case "warning":
				return "#f59e0b";
			case "critical":
				return "#ef4444";
			default:
				return "#6b7280";
		}
	};

	return (
		<group position={component.position}>
			{component.type === "valve" && (
				<Cylinder args={[0.3, 0.3, 0.8]} rotation={[Math.PI / 2, 0, 0]}>
					<meshStandardMaterial color={getColor(component.status)} />
				</Cylinder>
			)}
			{component.type === "sensor" && (
				<Sphere args={[0.2]}>
					<meshStandardMaterial color={getColor(component.status)} />
				</Sphere>
			)}
			{component.type === "joint" && (
				<Box args={[0.4, 0.4, 0.4]}>
					<meshStandardMaterial color={getColor(component.status)} />
				</Box>
			)}
			<Text position={[0, 0.8, 0]} fontSize={0.15} color="white" anchorX="center" anchorY="middle">
				{component.name}
			</Text>
		</group>
	);
};

export const TechnicalAnalysis = ({ componentId }: TechnicalAnalysisProps) => {
	const [components] = useState(generate3DComponents());
	const [sensorData] = useState(generateSensorData(12));

	const selectedComponent = components.find((c) => c.id === componentId) || components[0];

	return (
		<div className="space-y-6 p-6">
			<Card className="bg-gradient-surface border-border/50">
				<CardHeader>
					<CardTitle className="flex items-center text-foreground">
						<Cpu className="h-5 w-5 mr-2 text-primary" />
						3D Digital Twin: {selectedComponent.name}
					</CardTitle>
					<CardDescription>Interactive component analysis and diagnostics</CardDescription>
				</CardHeader>
			</Card>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				{/* 3D Visualization */}
				<Card className="bg-gradient-surface border-border/50">
					<CardHeader>
						<CardTitle className="text-foreground">Component Visualization</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="h-96 w-full">
							<Canvas camera={{ position: [5, 5, 5] }}>
								<Suspense fallback={null}>
									<ambientLight intensity={0.5} />
									<pointLight position={[10, 10, 10]} />
									<Component3D component={selectedComponent} />
									<OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
								</Suspense>
							</Canvas>
						</div>
					</CardContent>
				</Card>

				{/* Component Details */}
				<Card className="bg-gradient-surface border-border/50">
					<CardHeader>
						<CardTitle className="text-foreground">Component Specifications</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="grid grid-cols-2 gap-4">
							<div>
								<span className="text-muted-foreground">Type:</span>
								<div className="font-medium">{selectedComponent.type}</div>
							</div>
							<div>
								<span className="text-muted-foreground">Status:</span>
								<Badge variant={selectedComponent.status === "optimal" ? "default" : "destructive"}>
									{selectedComponent.status}
								</Badge>
							</div>
						</div>
						{Object.entries(selectedComponent.specifications).map(([key, value]) => (
							<div key={key} className="flex justify-between">
								<span className="text-muted-foreground capitalize">{key.replace("_", " ")}:</span>
								<span className="font-medium">{value}</span>
							</div>
						))}
					</CardContent>
				</Card>
			</div>

			<Tabs defaultValue="diagnostics" className="space-y-6">
				<TabsList className="grid w-full grid-cols-3 bg-muted/50">
					<TabsTrigger value="diagnostics">AI Diagnostics</TabsTrigger>
					<TabsTrigger value="simulation">Failure Simulation</TabsTrigger>
					<TabsTrigger value="maintenance">Predictive Maintenance</TabsTrigger>
				</TabsList>

				<TabsContent value="diagnostics">
					<Card className="bg-gradient-surface border-border/50">
						<CardHeader>
							<CardTitle className="flex items-center text-foreground">
								<Activity className="h-5 w-5 mr-2" />
								High-Resolution Sensor Fusion
							</CardTitle>
						</CardHeader>
						<CardContent>
							<ResponsiveContainer width="100%" height={300}>
								<LineChart data={sensorData}>
									<CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
									<XAxis dataKey="timestamp" stroke="hsl(var(--muted-foreground))" />
									<YAxis stroke="hsl(var(--muted-foreground))" />
									<Tooltip
										contentStyle={{
											backgroundColor: "hsl(var(--popover))",
											border: "1px solid hsl(var(--border))"
										}}
									/>
									<Line
										type="monotone"
										dataKey="pressure"
										stroke="hsl(var(--primary))"
										strokeWidth={2}
									/>
									<Line
										type="monotone"
										dataKey="vibration"
										stroke="hsl(var(--danger))"
										strokeWidth={2}
									/>
								</LineChart>
							</ResponsiveContainer>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="simulation">
					<Card className="bg-gradient-surface border-border/50">
						<CardHeader>
							<CardTitle className="flex items-center text-foreground">
								<Zap className="h-5 w-5 mr-2" />
								Failure Scenario Modeling
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
								<div className="p-4 rounded-lg bg-danger/10 border border-danger/20">
									<h4 className="font-semibold text-danger">
										Critical Scenario: Pressure Overload
									</h4>
									<p className="text-sm text-muted-foreground mt-2">
										Simulation shows 85% probability of failure under sustained pressure above 1400
										PSI for 6+ hours.
									</p>
								</div>
							</div>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="maintenance">
					<Card className="bg-gradient-surface border-border/50">
						<CardHeader>
							<CardTitle className="flex items-center text-foreground">
								<Eye className="h-5 w-5 mr-2" />
								Predictive Maintenance Schedule
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="space-y-3">
								<div className="p-3 rounded-lg bg-warning/10 border border-warning/20">
									<div className="font-medium">Recommended Action: Valve Inspection</div>
									<div className="text-sm text-muted-foreground">
										Predicted failure window: 15-30 days
									</div>
								</div>
							</div>
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	);
};
