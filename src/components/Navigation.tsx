import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Map, Layers, Microscope, ArrowLeft, Activity, AlertTriangle } from "lucide-react";

export type DashboardLevel = "strategic" | "operational" | "technical";

interface NavigationProps {
	currentLevel: DashboardLevel;
	onLevelChange: (level: DashboardLevel) => void;
	selectedSegment?: string;
	selectedComponent?: string;
}

export const Navigation = ({
	currentLevel,
	onLevelChange,
	selectedSegment,
	selectedComponent
}: NavigationProps) => {
	const levels = [
		{
			id: "strategic" as const,
			name: "Strategic Overview",
			description: "Executive monitoring and risk assessment",
			icon: Map,
			color: "from-primary to-primary-glow",
			badge: "L1"
		},
		{
			id: "operational" as const,
			name: "Segment Operations",
			description: "Real-time monitoring and optimization",
			icon: Layers,
			color: "from-warning to-yellow-400",
			badge: "L2"
		},
		{
			id: "technical" as const,
			name: "Component Analysis",
			description: "Technical diagnostics and simulation",
			icon: Microscope,
			color: "from-danger to-red-400",
			badge: "L3"
		}
	];

	const currentLevelData = levels.find((l) => l.id === currentLevel);

	return (
		<div className="top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
			<div className=" container mx-auto px-6 py-4">
				{/* Breadcrumb Navigation */}
				<div className=" items-center justify-between mb-4">
					<div className=" items-center space-x-2 text-sm">
						<Activity className="h-5 w-5 text-primary" />
						<span className="text-muted-foreground">Digital Pipeline Network</span>
						{selectedSegment && (
							<>
								<span className="text-muted-foreground">/</span>
								<span className="text-foreground">{selectedSegment}</span>
							</>
						)}
						{selectedComponent && (
							<>
								<span className="text-muted-foreground">/</span>
								<span className="text-foreground">{selectedComponent}</span>
							</>
						)}
					</div>

					<div className="flex items-center space-x-2">
						<Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
							<AlertTriangle className="h-3 w-3 mr-1" />3 Active Alerts
						</Badge>
						<Badge variant="outline" className="bg-success/10 text-success border-success/20">
							Network: 87% Health
						</Badge>
					</div>
				</div>

				{/* Level Navigation */}
				<div className="flex flex-wrap items-center space-x-2 w-full">
					{levels.map((level, index) => {
						const Icon = level.icon;
						const isActive = level.id === currentLevel;
						const isAccessible =
							level.id === "strategic" ||
							(level.id === "operational" && selectedSegment) ||
							(level.id === "technical" && selectedComponent);

						return (
							<div key={level.id} className="flex items-center">
								<Button
									variant={isActive ? "default" : "ghost"}
									size="lg"
									onClick={() => onLevelChange(level.id)}
									disabled={!isAccessible}
									className={`
                    relative group transition-all duration-300
                    ${
											isActive
												? `bg-gradient-to-r ${level.color} text-white shadow-glow hover:shadow-xl`
												: "hover:bg-muted/50"
										}
                    ${!isAccessible ? "opacity-50 cursor-not-allowed" : ""}
                  `}
								>
									<div className="flex items-center space-x-3">
										<Badge
											variant="secondary"
											className={`
                        text-xs font-mono
                        ${isActive ? "bg-white/20 text-white" : "bg-muted text-muted-foreground"}
                      `}
										>
											{level.badge}
										</Badge>
										<Icon
											className={`h-5 w-5 ${isActive ? "text-white" : "text-muted-foreground"}`}
										/>
										<div className="text-left">
											<div
												className={`font-semibold ${isActive ? "text-white" : "text-foreground"}`}
											>
												{level.name}
											</div>
											<div
												className={`text-xs ${
													isActive ? "text-white/80" : "text-muted-foreground"
												}`}
											>
												{level.description}
											</div>
										</div>
									</div>
								</Button>

								{index < levels.length - 1 && <div className="h-px w-8 bg-border mx-2" />}
							</div>
						);
					})}
				</div>

				{/* Current Level Description */}
				{currentLevelData && (
					<div className="mt-4 p-4 rounded-lg bg-gradient-surface border border-border/50">
						<div className="flex items-center justify-between">
							<div>
								<h2 className="text-xl font-bold text-foreground mb-1">{currentLevelData.name}</h2>
								<p className="text-muted-foreground">{currentLevelData.description}</p>
							</div>

							{currentLevel !== "strategic" && (
								<Button
									variant="outline"
									size="sm"
									onClick={() => {
										if (currentLevel === "technical") {
											onLevelChange("operational");
										} else {
											onLevelChange("strategic");
										}
									}}
									className="hover:bg-muted/50"
								>
									<ArrowLeft className="h-4 w-4 mr-2" />
									Go Back
								</Button>
							)}
						</div>
					</div>
				)}
			</div>
		</div>
	);
};
