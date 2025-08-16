/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { Brain, AlertTriangle, CheckCircle, Clock, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Recommendation {
	id: string;
	title: string;
	description: string;
	priority: "high" | "medium" | "low";
	category: "efficiency" | "maintenance" | "safety" | "optimization";
	impact: string;
	estimatedSavings: number;
	timeToImplement: string;
	confidence: number;
	actions: string[];
	status: "new" | "reviewing" | "implementing" | "completed";
}

const mockRecommendations: Recommendation[] = [
	{
		id: "rec1",
		title: "Optimize Pump Scheduling",
		description:
			"AI analysis shows 12% efficiency gain by adjusting pump cycles during peak production hours.",
		priority: "high",
		category: "efficiency",
		impact: "Reduce energy consumption by 340 kWh/day",
		estimatedSavings: 15600,
		timeToImplement: "2-3 days",
		confidence: 94,
		actions: ["Adjust pump cycle timing", "Update control algorithms", "Monitor for 48h"],
		status: "new"
	},
	{
		id: "rec2",
		title: "Predictive Maintenance Alert",
		description:
			"Vibration sensor data indicates bearing replacement needed within 2 weeks to prevent failure.",
		priority: "high",
		category: "maintenance",
		impact: "Prevent $45K equipment failure",
		estimatedSavings: 45000,
		timeToImplement: "1 week",
		confidence: 87,
		actions: ["Schedule maintenance window", "Order replacement parts", "Prepare backup systems"],
		status: "reviewing"
	},
	{
		id: "rec3",
		title: "Flow Rate Optimization",
		description:
			"Machine learning model suggests flow rate adjustments to increase daily production by 8%.",
		priority: "medium",
		category: "optimization",
		impact: "Increase production by 227 bbl/day",
		estimatedSavings: 12400,
		timeToImplement: "1 day",
		confidence: 91,
		actions: ["Implement flow control changes", "Monitor production metrics"],
		status: "implementing"
	}
];

function RecommendationCard({
	recommendation,
	onAction
}: {
	recommendation: Recommendation;
	onAction: (id: string, action: string) => void;
}) {
	const getPriorityColor = () => {
		switch (recommendation.priority) {
			case "high":
				return "border-digital-danger";
			case "medium":
				return "border-digital-warning";
			default:
				return "border-digital-success";
		}
	};

	const getCategoryIcon = () => {
		switch (recommendation.category) {
			case "maintenance":
				return <AlertTriangle className="h-4 w-4" />;
			case "safety":
				return <AlertTriangle className="h-4 w-4" />;
			case "efficiency":
				return <CheckCircle className="h-4 w-4" />;
			default:
				return <Brain className="h-4 w-4" />;
		}
	};

	const getStatusBadge = () => {
		const statusConfig = {
			new: { color: "bg-digital-primary", text: "NEW" },
			reviewing: { color: "bg-digital-warning", text: "REVIEWING" },
			implementing: { color: "bg-digital-success", text: "IMPLEMENTING" },
			completed: { color: "bg-muted", text: "COMPLETED" }
		};

		const config = statusConfig[recommendation.status];
		return <Badge className={`${config.color} text-background text-xs`}>{config.text}</Badge>;
	};

	return (
		<Card
			className={`bg-card/50 backdrop-blur-sm border-1[px] ${getPriorityColor()} hover:shadow-digital transition-all duration-300`}
		>
			<CardHeader>
				<div className="flex items-center justify-between">
					<CardTitle className="flex items-center space-x-2 text-sm">
						{getCategoryIcon()}
						<span>{recommendation.title}</span>
					</CardTitle>
					{getStatusBadge()}
				</div>
			</CardHeader>
			<CardContent className="space-y-4">
				<p className="text-sm text-muted-foreground">{recommendation.description}</p>

				<div className="grid grid-cols-2 gap-4 text-xs">
					<div>
						<span className="text-muted-foreground">Impact:</span>
						<p className="text-foreground font-medium">{recommendation.impact}</p>
					</div>
					<div>
						<span className="text-muted-foreground">Est. Savings:</span>
						<p className="text-digital-success font-medium">
							${recommendation.estimatedSavings.toLocaleString()}
						</p>
					</div>
					<div>
						<span className="text-muted-foreground">Time:</span>
						<p className="text-foreground font-medium">{recommendation.timeToImplement}</p>
					</div>
					<div>
						<span className="text-muted-foreground">Confidence:</span>
						<p className="text-digital-primary font-medium">{recommendation.confidence}%</p>
					</div>
				</div>

				<div className="space-y-2">
					<h4 className="text-xs font-medium text-muted-foreground">Recommended Actions:</h4>
					<ul className="space-y-1">
						{recommendation.actions.map((action, index) => (
							<li key={index} className="text-xs text-foreground flex items-center space-x-2">
								<div className="w-1.5 h-1.5 bg-digital-primary rounded-full" />
								<span>{action}</span>
							</li>
						))}
					</ul>
				</div>

				<div className="flex items-center space-x-2 pt-2">
					<Button
						size="sm"
						className="bg-gradient-digital text-background hover:shadow-digital"
						onClick={() => onAction(recommendation.id, "implement")}
					>
						<ArrowRight className="h-3 w-3 mr-1" />
						Implement
					</Button>
					<Button variant="outline" size="sm" onClick={() => onAction(recommendation.id, "review")}>
						Review Details
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}

export default function AIRecommendations() {
	const [recommendations, setRecommendations] = useState(mockRecommendations);
	const [newRecommendations, setNewRecommendations] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setNewRecommendations((prev) => {
				const count = recommendations.filter((r) => r.status === "new").length;
				return count;
			});
		}, 1000);

		return () => clearInterval(interval);
	}, [recommendations]);

	const handleAction = (id: string, action: string) => {
		setRecommendations((prev) =>
			prev.map((rec) =>
				rec.id === id
					? { ...rec, status: action === "implement" ? "implementing" : ("reviewing" as any) }
					: rec
			)
		);
	};

	return (
		<div className="space-y-4">
			<div className="flex items-center justify-between">
				<div className="flex items-center space-x-3">
					<Brain className="h-6 w-6 text-digital-primary" />
					<div>
						<h2 className="text-lg font-semibold text-foreground">AI Recommendations</h2>
						<p className="text-xs text-muted-foreground">Powered by machine learning analysis</p>
					</div>
				</div>

				{newRecommendations > 0 && (
					<div className="flex items-center space-x-2 px-3 py-1 rounded-full bg-digital-primary/20 border border-digital-primary/30">
						<Clock className="h-3 w-3 text-digital-primary animate-pulse" />
						<span className="text-xs text-digital-primary font-medium">
							{newRecommendations} New Insights
						</span>
					</div>
				)}
			</div>

			<div className="space-y-4">
				{recommendations.map((rec) => (
					<RecommendationCard key={rec.id} recommendation={rec} onAction={handleAction} />
				))}
			</div>
		</div>
	);
}
