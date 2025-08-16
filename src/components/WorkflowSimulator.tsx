import { useState, useEffect } from "react";
import { Play, Pause, RotateCcw, AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface SimulationStep {
	id: string;
	title: string;
	description: string;
	duration: number;
	status: "pending" | "running" | "completed" | "error";
	result?: string;
	impact?: string;
}

interface Scenario {
	id: string;
	name: string;
	description: string;
	steps: SimulationStep[];
	expectedOutcome: string;
	efficiency: number;
}

const scenarios: Scenario[] = [
	{
		id: "sensor_alert",
		name: "Sensor Alert Response",
		description: "Simulate response to critical pressure sensor alert",
		expectedOutcome: "Automated safety shutdown and maintenance notification",
		efficiency: 95,
		steps: [
			{
				id: "detect",
				title: "Anomaly Detection",
				description: "AI detects pressure anomaly from sensor data",
				duration: 500,
				status: "pending"
			},
			{
				id: "analyze",
				title: "Risk Analysis",
				description: "Machine learning model assesses risk level",
				duration: 1000,
				status: "pending"
			},
			{
				id: "alert",
				title: "Alert Generation",
				description: "System generates priority alert for operators",
				duration: 300,
				status: "pending"
			},
			{
				id: "action",
				title: "Automated Response",
				description: "Execute safety protocols and shutdown procedures",
				duration: 2000,
				status: "pending"
			},
			{
				id: "verify",
				title: "Verification",
				description: "Confirm system state and generate report",
				duration: 800,
				status: "pending"
			}
		]
	},
	{
		id: "optimization",
		name: "Production Optimization",
		description: "AI-driven production parameter optimization",
		expectedOutcome: "12% increase in daily production output",
		efficiency: 88,
		steps: [
			{
				id: "collect",
				title: "Data Collection",
				description: "Gather real-time production metrics",
				duration: 800,
				status: "pending"
			},
			{
				id: "model",
				title: "ML Model Analysis",
				description: "Process data through optimization algorithms",
				duration: 1500,
				status: "pending"
			},
			{
				id: "recommend",
				title: "Generate Recommendations",
				description: "Create optimized parameter settings",
				duration: 600,
				status: "pending"
			},
			{
				id: "implement",
				title: "Apply Changes",
				description: "Gradually implement new parameters",
				duration: 2500,
				status: "pending"
			},
			{
				id: "monitor",
				title: "Monitor Results",
				description: "Track performance improvements",
				duration: 1000,
				status: "pending"
			}
		]
	}
];

function SimulationProgress({
	steps,
	currentStep
}: {
	steps: SimulationStep[];
	currentStep: number;
}) {
	return (
		<div className="space-y-3">
			{steps.map((step, index) => (
				<div key={step.id} className="flex items-center space-x-3">
					<div
						className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
							step.status === "completed"
								? "bg-digital-success text-background"
								: step.status === "running"
								? "bg-digital-primary text-background animate-pulse"
								: step.status === "error"
								? "bg-digital-danger text-background"
								: "bg-muted text-muted-foreground"
						}`}
					>
						{step.status === "completed" ? (
							<CheckCircle className="h-4 w-4" />
						) : step.status === "error" ? (
							<AlertTriangle className="h-4 w-4" />
						) : step.status === "running" ? (
							<Clock className="h-4 w-4" />
						) : (
							index + 1
						)}
					</div>

					<div className="flex-1">
						<div className="flex items-center justify-between">
							<span
								className={`text-sm font-medium ${
									step.status === "running" ? "text-digital-primary" : "text-foreground"
								}`}
							>
								{step.title}
							</span>
							<Badge
								variant={
									step.status === "completed"
										? "default"
										: step.status === "running"
										? "secondary"
										: step.status === "error"
										? "destructive"
										: "outline"
								}
							>
								{step.status}
							</Badge>
						</div>
						<p className="text-xs text-muted-foreground">{step.description}</p>
						{step.result && <p className="text-xs text-digital-success mt-1">{step.result}</p>}
					</div>
				</div>
			))}
		</div>
	);
}

export default function WorkflowSimulator() {
	const [selectedScenario, setSelectedScenario] = useState(scenarios[0]);
	const [isRunning, setIsRunning] = useState(false);
	const [currentStep, setCurrentStep] = useState(0);
	const [progress, setProgress] = useState(0);
	const [simulationSteps, setSimulationSteps] = useState(selectedScenario.steps);

	const startSimulation = () => {
		setIsRunning(true);
		setCurrentStep(0);
		setProgress(0);
		setSimulationSteps(selectedScenario.steps.map((step) => ({ ...step, status: "pending" })));
	};

	const pauseSimulation = () => {
		setIsRunning(false);
	};

	const resetSimulation = () => {
		setIsRunning(false);
		setCurrentStep(0);
		setProgress(0);
		setSimulationSteps(selectedScenario.steps.map((step) => ({ ...step, status: "pending" })));
	};

	useEffect(() => {
		if (!isRunning || currentStep >= simulationSteps.length) {
			if (currentStep >= simulationSteps.length) {
				setIsRunning(false);
			}
			return;
		}

		const currentStepData = simulationSteps[currentStep];

		// Mark current step as running
		setSimulationSteps((prev) =>
			prev.map((step, index) => (index === currentStep ? { ...step, status: "running" } : step))
		);

		const timer = setTimeout(() => {
			// Complete current step
			setSimulationSteps((prev) =>
				prev.map((step, index) =>
					index === currentStep
						? {
								...step,
								status: "completed",
								result: getStepResult(step.id)
						  }
						: step
				)
			);

			setCurrentStep((prev) => prev + 1);
			setProgress(((currentStep + 1) / simulationSteps.length) * 100);
		}, currentStepData.duration);

		return () => clearTimeout(timer);
	}, [isRunning, currentStep, simulationSteps.length]);

	const getStepResult = (stepId: string): string => {
		const results: Record<string, string> = {
			detect: "Pressure anomaly detected: 2947 psi (3% above threshold)",
			analyze: "Risk assessment: HIGH - Potential equipment damage",
			alert: "Alert sent to 3 operators, maintenance team notified",
			action: "Safety shutdown initiated, pressure reduced to 2650 psi",
			verify: "System stable, incident report generated",
			collect: "247 data points collected from 12 sensors",
			model: "Optimization model identified 3 improvement areas",
			recommend: "Flow rate: +8%, Pump cycle: -15%, Temperature: +2°C",
			implement: "Parameters updated gradually over 4-minute window",
			monitor: "Production increased by 11.8%, efficiency up 7%"
		};
		return results[stepId] || "Step completed successfully";
	};

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h2 className="text-lg font-semibold text-foreground">Workflow Simulator</h2>
					<p className="text-sm text-muted-foreground">Test AI-driven operational scenarios</p>
				</div>

				<div className="flex items-center space-x-2">
					<Button
						className="bg-secondary text-background hover:white text-white"
						variant="default"
						size="sm"
						onClick={resetSimulation}
						disabled={isRunning}
					>
						<RotateCcw className="h-4 w-4 mr-1" />
						Reset
					</Button>
					<Button
						variant={isRunning ? "secondary" : "default"}
						size="sm"
						onClick={isRunning ? pauseSimulation : startSimulation}
						className={!isRunning ? "bg-secondary text-background hover:white text-white" : ""}
					>
						{isRunning ? (
							<>
								<Pause className="h-4 w-4 mr-1" />
								Pause
							</>
						) : (
							<>
								<Play className="h-4 w-4 mr-1" />
								Start
							</>
						)}
					</Button>
				</div>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				<div className="space-y-4">
					<h3 className="text-sm font-medium text-foreground">Select Scenario</h3>
					{scenarios.map((scenario) => (
						<Card
							key={scenario.id}
							className={`cursor-pointer transition-all duration-300 ${
								selectedScenario.id === scenario.id
									? "border-digital-primary bg-digital-primary/10"
									: "border-border hover:border-digital-primary/50"
							}`}
							onClick={() => {
								if (!isRunning) {
									setSelectedScenario(scenario);
									setSimulationSteps(
										scenario.steps.map((step) => ({ ...step, status: "pending" }))
									);
									resetSimulation();
								}
							}}
						>
							<CardHeader className="pb-2">
								<CardTitle className="text-sm">{scenario.name}</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-xs text-muted-foreground mb-2">{scenario.description}</p>
								<div className="flex items-center justify-between text-xs">
									<span className="text-muted-foreground">Expected Efficiency:</span>
									<Badge className="bg-digital-success/20 text-digital-success border-digital-success/30">
										{scenario.efficiency}%
									</Badge>
								</div>
							</CardContent>
						</Card>
					))}
				</div>

				<div className="lg:col-span-2">
					<Card
						className="bg-card/50 backdrop-blur-sm border-border"
						style={{
							border: "2px solid rgba(0, 166, 255, 1)",
							borderRadius: "20px"
						}}
					>
						<CardHeader>
							<div className="flex items-center justify-between">
								<CardTitle className="text-base">{selectedScenario.name}</CardTitle>
								<div className="text-xs text-muted-foreground">
									Step {Math.min(currentStep + 1, simulationSteps.length)} of{" "}
									{simulationSteps.length}
								</div>
							</div>
							<Progress value={progress} className="h-2" />
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
								<div className="p-3 bg-muted/50 rounded-lg">
									<p className="text-sm text-foreground font-medium">Expected Outcome:</p>
									<p className="text-xs text-muted-foreground">
										{selectedScenario.expectedOutcome}
									</p>
								</div>

								<SimulationProgress steps={simulationSteps} currentStep={currentStep} />

								{progress === 100 && (
									<div className="p-4 bg-digital-success/10 border border-digital-success/30 rounded-lg">
										<div className="flex items-center space-x-2">
											<CheckCircle className="h-4 w-4 text-digital-success" />
											<span className="text-sm font-medium text-digital-success">
												Simulation Complete
											</span>
										</div>
										<p className="text-xs text-muted-foreground mt-1">
											All workflow steps executed successfully. Results available for analysis.
										</p>
									</div>
								)}
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
