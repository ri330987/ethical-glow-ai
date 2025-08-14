import { useState } from "react";
import { Navigation, type DashboardLevel } from "@/components/Navigation";
import { StrategicOverview } from "@/components/levels/StrategicOverview";
import { OperationalDashboard } from "@/components/levels/OperationalDashboard";
import { TechnicalAnalysis } from "@/components/levels/TechnicalAnalysis";
import bg from "@/assets/bg.jpeg";

const Index = () => {
	const [currentLevel, setCurrentLevel] = useState<DashboardLevel>("strategic");
	const [selectedSegment, setSelectedSegment] = useState<string>("");
	const [selectedComponent, setSelectedComponent] = useState<string>("");

	const handleLevelChange = (level: DashboardLevel) => {
		setCurrentLevel(level);
	};

	const handleSegmentSelect = (segmentId: string) => {
		setSelectedSegment(segmentId);
		setCurrentLevel("operational");
	};

	const handleComponentSelect = (componentId: string) => {
		setSelectedComponent(componentId);
		setCurrentLevel("technical");
	};

	return (
		<div
			className="min-h-screen bg-background"
			style={{
				backgroundImage: `url(${bg})`,
				backgroundSize: "cover",
				backgroundPosition: "center",
				backgroundRepeat: "no-repeat",
				backgroundAttachment: "fixed" //
			}}
		>
			<Navigation
				currentLevel={currentLevel}
				onLevelChange={handleLevelChange}
				selectedSegment={selectedSegment}
				selectedComponent={selectedComponent}
			/>

			<main className="container mx-auto">
				{currentLevel === "strategic" && (
					<StrategicOverview onSegmentSelect={handleSegmentSelect} />
				)}

				{currentLevel === "operational" && selectedSegment && (
					<OperationalDashboard
						segmentId={selectedSegment}
						onComponentSelect={handleComponentSelect}
					/>
				)}

				{currentLevel === "technical" && selectedComponent && (
					<TechnicalAnalysis componentId={selectedComponent} />
				)}
			</main>
		</div>
	);
};

export default Index;
