/* eslint-disable @typescript-eslint/no-explicit-any */
// Mock data generators for Digital Pipeline Network Dashboard

export interface PipelineSegment {
	id: string;
	name: string;
	region: string;
	coordinates: [number, number][];
	status: "optimal" | "good" | "warning" | "danger" | "critical";
	throughput: number; // barrels/day
	pressure: number; // PSI
	temperature: number; // °F
	integrity: number; // 0-100%
	lastMaintenance: Date;
	nextMaintenance: Date;
	riskScore: number; // 0-100
}

export interface SensorData {
	timestamp: Date;
	pressure: number;
	temperature: number;
	vibration: number;
	flow: number;
	corrosion: number;
	integrity: number;
}

export interface Component3D {
	id: string;
	type: "valve" | "joint" | "weld" | "sensor" | "pump";
	name: string;
	position: [number, number, number];
	status: "optimal" | "warning" | "critical";
	lastInspection: Date;
	specifications: Record<string, any>;
}

export interface AIInsight {
	id: string;
	type: "prediction" | "alert" | "optimization" | "maintenance";
	severity: "low" | "medium" | "high" | "critical";
	title: string;
	description: string;
	confidence: number; // 0-100%
	timestamp: Date;
	actionRequired: boolean;
	estimatedImpact: {
		cost: number;
		downtime: number; // hours
		environmental: "low" | "medium" | "high";
	};
}

// Generate realistic pipeline network
export const generatePipelineNetwork = (): PipelineSegment[] => {
	const regions = ["North Texas", "South Texas", "Louisiana", "Oklahoma", "New Mexico"];
	const statuses: PipelineSegment["status"][] = [
		"optimal",
		"good",
		"warning",
		"danger",
		"critical"
	];

	return Array.from({ length: 25 }, (_, i) => ({
		id: `pipeline-${i + 1}`,
		name: `Pipeline Segment ${i + 1}`,
		region: regions[Math.floor(Math.random() * regions.length)],
		coordinates: generatePipelineCoordinates(),
		status: statuses[Math.floor(Math.random() * statuses.length)],
		throughput: Math.round(50000 + Math.random() * 200000),
		pressure: Math.round(800 + Math.random() * 400),
		temperature: Math.round(60 + Math.random() * 80),
		integrity: Math.round(65 + Math.random() * 35),
		lastMaintenance: new Date(Date.now() - Math.random() * 180 * 24 * 60 * 60 * 1000),
		nextMaintenance: new Date(Date.now() + Math.random() * 90 * 24 * 60 * 60 * 1000),
		riskScore: Math.round(Math.random() * 100)
	}));
};

const generatePipelineCoordinates = (): [number, number][] => {
	const startLat = 29 + Math.random() * 8; // Texas/Louisiana area
	const startLng = -106 + Math.random() * 12;
	const points = 8 + Math.floor(Math.random() * 12);

	return Array.from({ length: points }, (_, i) => [
		startLng + i * 0.1 + (Math.random() - 0.5) * 0.05,
		startLat + (Math.random() - 0.5) * 0.05
	]);
};

// Generate real-time sensor data
export const generateSensorData = (hours: number = 24): SensorData[] => {
	const now = new Date();
	return Array.from({ length: hours * 4 }, (_, i) => ({
		timestamp: new Date(now.getTime() - (hours * 4 - i - 1) * 15 * 60 * 1000),
		pressure: 1000 + Math.sin(i * 0.1) * 50 + (Math.random() - 0.5) * 20,
		temperature: 75 + Math.sin(i * 0.05) * 10 + (Math.random() - 0.5) * 5,
		vibration: 0.5 + Math.random() * 1.5,
		flow: 80 + Math.sin(i * 0.08) * 15 + (Math.random() - 0.5) * 8,
		corrosion: Math.max(0, 2 + Math.random() * 3),
		integrity: Math.max(70, 95 - Math.random() * 5)
	}));
};

// Generate 3D components for digital twin
export const generate3DComponents = (): Component3D[] => {
	const types: Component3D["type"][] = ["valve", "joint", "weld", "sensor", "pump"];
	const statuses: Component3D["status"][] = ["optimal", "warning", "critical"];

	return Array.from({ length: 20 }, (_, i) => ({
		id: `component-${i + 1}`,
		type: types[Math.floor(Math.random() * types.length)],
		name: `Component ${i + 1}`,
		position: [(Math.random() - 0.5) * 10, Math.random() * 3, (Math.random() - 0.5) * 10] as [
			number,
			number,
			number
		],
		status: statuses[Math.floor(Math.random() * statuses.length)],
		lastInspection: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
		specifications: {
			pressure_rating: `${800 + Math.floor(Math.random() * 400)} PSI`,
			material: ["Carbon Steel", "Stainless Steel", "Aluminum"][Math.floor(Math.random() * 3)],
			diameter: `${4 + Math.floor(Math.random() * 16)} inches`,
			age: `${Math.floor(Math.random() * 20)} years`
		}
	}));
};

// Generate AI insights and recommendations
export const generateAIInsights = (): AIInsight[] => {
	const types: AIInsight["type"][] = ["prediction", "alert", "optimization", "maintenance"];
	const severities: AIInsight["severity"][] = ["low", "medium", "high", "critical"];

	const insights = [
		{
			title: "Corrosion Risk Detected",
			description:
				"Pipeline segment 7 showing elevated corrosion indicators. Recommend inspection within 48 hours."
		},
		{
			title: "Flow Optimization Opportunity",
			description:
				"Pressure adjustment in segments 12-15 could increase throughput by 8% with minimal cost."
		},
		{
			title: "Predictive Maintenance Alert",
			description:
				"Valve assembly in sector 3 predicted to fail within 30 days based on vibration analysis."
		},
		{
			title: "Environmental Compliance",
			description:
				"Emission levels approaching regulatory limits. Recommend immediate review of filtration systems."
		},
		{
			title: "Weather Impact Assessment",
			description:
				"Incoming storm system may affect segments 18-22. Recommend preemptive pressure reduction."
		}
	];

	return insights.map((insight, i) => ({
		id: `insight-${i + 1}`,
		type: types[Math.floor(Math.random() * types.length)],
		severity: severities[Math.floor(Math.random() * severities.length)],
		title: insight.title,
		description: insight.description,
		confidence: Math.round(70 + Math.random() * 30),
		timestamp: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000),
		actionRequired: Math.random() > 0.4,
		estimatedImpact: {
			cost: Math.round(5000 + Math.random() * 50000),
			downtime: Math.round(Math.random() * 24),
			environmental: ["low", "medium", "high"][Math.floor(Math.random() * 3)] as
				| "low"
				| "medium"
				| "high"
		}
	}));
};

// Global KPIs for Level 1
export const generateGlobalKPIs = () => ({
	totalThroughput: 4250000, // barrels/day
	leakIncidents: 3, // monthly
	emissionsFootprint: 125000, // tons CO2 equivalent
	networkIntegrity: 87, // percentage
	operationalEfficiency: 94, // percentage
	predictedDowntime: 12, // hours this month
	maintenanceCosts: 2400000, // dollars this month
	riskScore: 23 // 0-100, lower is better
});
