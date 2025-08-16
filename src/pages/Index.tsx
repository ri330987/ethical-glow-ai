import { useState, Suspense } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import KPIPanel from "@/components/KPIPanel";
import AIRecommendations from "@/components/AIRecommendations";
import WorkflowSimulator from "@/components/WorkflowSimulator";
import SensorDetail from "@/components/SensorDetail";
import OilRig3D, { SensorPoint } from "@/components/OilRig3D";
import oilrigHero from "@/assets/oilrig.jpg";
import digitalTwin from "@/assets/oilrig3dTwin.png";
import inspectionRobot from "@/assets/inspectionRobots.png";
import bg from "@/assets/bg.jpeg";
import OnshoreVisual from "./OnshoreVisuals";

const Index = () => {
	const [selectedSensor, setSelectedSensor] = useState<SensorPoint | null>(null);

	const handleSensorClick = (sensor: SensorPoint) => {
		setSelectedSensor(sensor);
	};

	const closeSensorDetail = () => {
		setSelectedSensor(null);
	};

	return (
		<div
			style={{
				width: "100%",
				height: "100vh",
				display: "flex",
				justifyContent: "center",
				alignItems: "center"
			}}
		>
			<div
				style={{
					aspectRatio: "7150 / 1840",
					width: "100%",
					maxHeight: "100%",
					border: "2px solid black",
					display: "flex",
					flexDirection: "column",
					overflow: "hidden"
				}}
			>
				<div className="flex h-screen w-screen overflow-hidden">
					{/* Left 25% - Static Image */}
					<div className="w-2/5 h-full">
						{/* <div
							style={{
								position: "absolute",
								top: 0,
								left: "0", // Start at the right edge of the left panel (w-2/5 = 40%)
								width: "45px", // Adjust for fade width
								height: "100%",
								pointerEvents: "none",
								zIndex: 20,
								background: "linear-gradient(to left, rgba(10, 0, 0, 1), rgba(255,255,255,0))"
							}}
						/> */}
						{/* You can add overlay or content here if needed */}
						<OnshoreVisual />
					</div>
					{/* Fade Overlay */}
					<div
						style={{
							position: "absolute",
							top: 0,
							left: "40%", // Start at the right edge of the left panel (w-2/5 = 40%)
							width: "45px", // Adjust for fade width
							height: "100%",
							pointerEvents: "none",
							zIndex: 20,
							background: "linear-gradient(to right, rgba(10, 0, 0, 1), rgba(255,255,255,0))"
						}}
					/>

					{/* Right 75% - Dashboard Content */}
					<div
						className="w-3/5 h-full overflow-auto"
						style={{
							padding: "15px",
							backgroundImage: `url(${bg})`,
							backgroundSize: "cover",
							backgroundPosition: "center",
							backgroundRepeat: "no-repeat",
							backgroundAttachment: "fixed"
						}}
					>
						{/* If you want to keep DashboardLayout, move it inside this div */}
						{/* <DashboardLayout> */}
						<div className="container mx-auto px-4 py-6 space-y-8">
							{/* Hero Section */}
							<div className="relative rounded-2xl overflow-hidden bg-gradient-industrial">
								<div
									className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
									style={{
										backgroundImage: `url(${oilrigHero})`,
										filter: "blur(3px)", // Adjust blur as needed
										opacity: 0.8
									}}
								/>
								<div className="relative z-10 p-6 lg:p-12">
									<div className="max-w-3xl">
										<h1 className="text-4xl lg:text-4xl font-bold text-foreground mb-4">
											Digital Transformation
											<span
												className="block bg-gradient-digital bg-clip-text text-transparent"
												style={{ color: "rgba(2, 255, 238, 0.87)" }}
											>
												Onshore Rig Dashboard
											</span>
										</h1>
									</div>
								</div>
							</div>

							{/* Main Dashboard Tabs */}
							<Tabs defaultValue="overview" className="space-y-6">
								<TabsList className="grid w-full grid-cols-4 bg-card/50 border border-border">
									<TabsTrigger
										value="overview"
										className="data-[state=active]:bg-secondary data-[state=active]:text-white"
									>
										Operations Overview
									</TabsTrigger>
									<TabsTrigger
										value="3d-model"
										className="data-[state=active]:bg-secondary data-[state=active]:text-white"
									>
										3D Rig Model
									</TabsTrigger>
									<TabsTrigger
										value="ai-insights"
										className="data-[state=active]:bg-secondary data-[state=active]:text-white"
									>
										AI Insights
									</TabsTrigger>
									<TabsTrigger
										value="simulator"
										className="data-[state=active]:bg-secondary data-[state=active]:text-white"
									>
										Workflow Simulator
									</TabsTrigger>
								</TabsList>

								<TabsContent value="overview" className="space-y-6">
									<KPIPanel />
									<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[60vh]">
										<Card className="bg-card/50 backdrop-blur-sm border-border overflow-hidden">
											<div className="relative h-[60vh]">
												<img
													src={digitalTwin}
													alt="Digital Twin Interface"
													className="w-full h-full object-cover"
												/>
												<div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
												<div className="absolute bottom-4 left-4 right-4">
													<h3 className="text-lg font-semibold text-foreground mb-2">
														Digital Twin Monitoring
													</h3>
													<p className="text-sm text-muted-foreground">
														Real-time 3D model synchronized with live sensor data for predictive
														analysis
													</p>
												</div>
											</div>
										</Card>
										<Card className="bg-card/50 backdrop-blur-sm border-border overflow-hidden">
											<div className="relative h-[60vh]">
												<img
													src={inspectionRobot}
													alt="Inspection Robot"
													className="w-full h-full object-cover"
												/>
												<div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
												<div className="absolute bottom-4 left-4 right-4">
													<h3 className="text-lg font-semibold text-foreground mb-2">
														Autonomous Inspection
													</h3>
													<p className="text-sm text-muted-foreground">
														Mobile robots performing continuous equipment monitoring and safety
														inspections
													</p>
												</div>
											</div>
										</Card>
									</div>
								</TabsContent>

								<TabsContent value="3d-model" className="space-y-6">
									<Card className="bg-card/50 backdrop-blur-sm border-border">
										<CardContent className="p-0">
											<div className="h-[70vh] rounded-lg overflow-hidden">
												<Suspense
													fallback={
														<div className="h-full flex items-center justify-center bg-secondary">
															<div className="text-center">
																<div className="w-8 h-8 bg-digital-primary rounded-full animate-pulse mx-auto mb-4" />
																<p className="text-muted-foreground">Loading 3D Rig Model...</p>
															</div>
														</div>
													}
												>
													<OilRig3D onSensorClick={handleSensorClick} />
												</Suspense>
											</div>
										</CardContent>
									</Card>
								</TabsContent>

								<TabsContent value="ai-insights" className="space-y-6">
									<AIRecommendations />
								</TabsContent>

								<TabsContent value="simulator" className="space-y-6">
									<WorkflowSimulator />
								</TabsContent>
							</Tabs>

							<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
								<Card className="bg-card/50 backdrop-blur-sm border-border hover:border-digital-primary/50 transition-all duration-300">
									<CardContent className="p-6 text-center">
										<div className="w-12 h-12 bg-gradient-digital rounded-full flex items-center justify-center mx-auto mb-4">
											<div className="w-6 h-6 bg-background rounded-sm" />
										</div>
										<h3 className="text-lg font-semibold text-foreground mb-2">
											Real-Time Monitoring
										</h3>
										<p className="text-sm text-muted-foreground">
											Continuous sensor data collection with instant anomaly detection and automated
											alerts
										</p>
									</CardContent>
								</Card>
								<Card className="bg-card/50 backdrop-blur-sm border-border hover:border-digital-primary/50 transition-all duration-300">
									<CardContent className="p-6 text-center">
										<div className="w-12 h-12 bg-gradient-industrial rounded-full flex items-center justify-center mx-auto mb-4">
											<div className="w-6 h-6 bg-foreground rounded-sm" />
										</div>
										<h3 className="text-lg font-semibold text-foreground mb-2">
											Predictive Maintenance
										</h3>
										<p className="text-sm text-muted-foreground">
											AI-powered analysis predicts equipment failures before they occur, reducing
											downtime
										</p>
									</CardContent>
								</Card>
								<Card className="bg-card/50 backdrop-blur-sm border-border hover:border-digital-primary/50 transition-all duration-300">
									<CardContent className="p-6 text-center">
										<div className="w-12 h-12 bg-digital-success/20 border border-digital-success rounded-full flex items-center justify-center mx-auto mb-4">
											<div className="w-6 h-6 bg-digital-success rounded-sm" />
										</div>
										<h3 className="text-lg font-semibold text-foreground mb-2">
											Efficiency Optimization
										</h3>
										<p className="text-sm text-muted-foreground">
											Machine learning algorithms continuously optimize operations for maximum
											efficiency
										</p>
									</CardContent>
								</Card>
							</div>
						</div>
						{/* </DashboardLayout> */}
						<SensorDetail sensor={selectedSensor} onClose={closeSensorDetail} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Index;
