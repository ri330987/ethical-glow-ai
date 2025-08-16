/* eslint-disable @typescript-eslint/no-explicit-any */
import { X, TrendingUp, Activity, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SensorPoint } from "./OilRig3D";

interface SensorDetailProps {
	sensor: SensorPoint | null;
	onClose: () => void;
}

function generateSensorHistory(sensor: SensorPoint) {
	const history = [];
	const baseValue = sensor.value;

	for (let i = 23; i >= 0; i--) {
		const variance = (Math.random() - 0.5) * (baseValue * 0.1);
		const timestamp = new Date();
		timestamp.setHours(timestamp.getHours() - i);

		history.push({
			time: timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
			value: Math.round((baseValue + variance) * 100) / 100
		});
	}

	return history;
}

function MiniChart({ data, color }: { data: any[]; color: string }) {
	const maxValue = Math.max(...data.map((d) => d.value));
	const minValue = Math.min(...data.map((d) => d.value));
	const range = maxValue - minValue || 1;

	return (
		<div className="relative h-16 w-full">
			<svg className="w-full h-full" viewBox="0 0 240 64">
				<path
					d={data
						.map((point, index) => {
							const x = (index / (data.length - 1)) * 240;
							const y = 64 - ((point.value - minValue) / range) * 64;
							return `${index === 0 ? "M" : "L"} ${x} ${y}`;
						})
						.join(" ")}
					fill="none"
					stroke={color}
					strokeWidth="2"
					className="drop-shadow-sm"
				/>
				<defs>
					<linearGradient id={`gradient-${color}`} x1="0%" y1="0%" x2="0%" y2="100%">
						<stop offset="0%" stopColor={color} stopOpacity="0.3" />
						<stop offset="100%" stopColor={color} stopOpacity="0" />
					</linearGradient>
				</defs>
				<path
					d={`${data
						.map((point, index) => {
							const x = (index / (data.length - 1)) * 240;
							const y = 64 - ((point.value - minValue) / range) * 64;
							return `${index === 0 ? "M" : "L"} ${x} ${y}`;
						})
						.join(" ")} L 240 64 L 0 64 Z`}
					fill={`url(#gradient-${color})`}
				/>
			</svg>
		</div>
	);
}

export default function SensorDetail({ sensor, onClose }: SensorDetailProps) {
	if (!sensor) return null;

	const history = generateSensorHistory(sensor);

	const getStatusInfo = () => {
		switch (sensor.status) {
			case "critical":
				return {
					color: "text-digital-danger",
					bgColor: "bg-digital-danger/10 border-digital-danger/30",
					icon: AlertTriangle,
					message: "Immediate attention required"
				};
			case "warning":
				return {
					color: "text-digital-warning",
					bgColor: "bg-digital-warning/10 border-digital-warning/30",
					icon: AlertTriangle,
					message: "Monitoring recommended"
				};
			default:
				return {
					color: "text-digital-success",
					bgColor: "bg-digital-success/10 border-digital-success/30",
					icon: Activity,
					message: "Operating normally"
				};
		}
	};

	const statusInfo = getStatusInfo();
	const StatusIcon = statusInfo.icon;

	const getUnit = () => {
		switch (sensor.type) {
			case "pressure":
				return "psi";
			case "flow":
				return "bbl/h";
			case "temperature":
				return "°C";
			case "vibration":
				return "mm/s";
			default:
				return "";
		}
	};

	const getThresholds = () => {
		switch (sensor.type) {
			case "pressure":
				return { min: 2500, max: 3000, optimal: 2800 };
			case "flow":
				return { min: 100, max: 200, optimal: 150 };
			case "temperature":
				return { min: 60, max: 95, optimal: 80 };
			case "vibration":
				return { min: 0, max: 1.5, optimal: 0.5 };
			default:
				return { min: 0, max: 100, optimal: 50 };
		}
	};

	const thresholds = getThresholds();

	return (
		<div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
			<Card className="w-full max-w-2xl max-h-[90vh] overflow-auto bg-card border-border shadow-2xl">
				<CardHeader>
					<div className="flex items-center justify-between">
						<div className="flex items-center space-x-3">
							<div
								className={`w-3 h-3 rounded-full ${
									sensor.status === "critical"
										? "bg-digital-danger"
										: sensor.status === "warning"
										? "bg-digital-warning"
										: "bg-digital-success"
								} animate-pulse`}
							/>
							<div>
								<CardTitle className="text-lg capitalize">{sensor.type} Sensor</CardTitle>
								<p className="text-sm text-muted-foreground">
									Sensor ID: {sensor.id.toUpperCase()}
								</p>
							</div>
						</div>
						<Button variant="ghost" size="sm" onClick={onClose}>
							<X className="h-4 w-4" />
						</Button>
					</div>
				</CardHeader>

				<CardContent className="space-y-6">
					{/* Current Status */}
					<div className={`p-4 rounded-lg border ${statusInfo.bgColor}`}>
						<div className="flex items-center space-x-3">
							<StatusIcon className={`h-5 w-5 ${statusInfo.color}`} />
							<div>
								<div className="flex items-center space-x-2">
									<span className="text-2xl font-bold text-foreground">{sensor.value}</span>
									<span className="text-muted-foreground">{getUnit()}</span>
									<Badge className={statusInfo.color}>{sensor.status.toUpperCase()}</Badge>
								</div>
								<p className={`text-sm ${statusInfo.color}`}>{statusInfo.message}</p>
							</div>
						</div>
					</div>

					{/* 24-Hour Trend */}
					<div>
						<div className="flex items-center justify-between mb-3">
							<h3 className="text-sm font-medium text-foreground">24-Hour Trend</h3>
							<div className="flex items-center space-x-1 text-xs text-muted-foreground">
								<TrendingUp className="h-3 w-3" />
								<span>Last 24 hours</span>
							</div>
						</div>
						<MiniChart
							data={history}
							color={
								sensor.status === "critical"
									? "#ff4444"
									: sensor.status === "warning"
									? "#ffaa00"
									: "#00ffaa"
							}
						/>
					</div>

					{/* Operating Thresholds */}
					<div>
						<h3 className="text-sm font-medium text-foreground mb-3">Operating Thresholds</h3>
						<div className="space-y-3">
							<div className="flex items-center justify-between text-sm">
								<span className="text-muted-foreground">Minimum Safe:</span>
								<span className="text-foreground">
									{thresholds.min} {getUnit()}
								</span>
							</div>
							<div className="flex items-center justify-between text-sm">
								<span className="text-muted-foreground">Optimal Range:</span>
								<span className="text-digital-success">
									{thresholds.optimal} {getUnit()}
								</span>
							</div>
							<div className="flex items-center justify-between text-sm">
								<span className="text-muted-foreground">Maximum Safe:</span>
								<span className="text-foreground">
									{thresholds.max} {getUnit()}
								</span>
							</div>
						</div>
					</div>

					{/* Recent Readings */}
					<div>
						<h3 className="text-sm font-medium text-foreground mb-3">Recent Readings</h3>
						<div className="space-y-2 max-h-32 overflow-y-auto">
							{history
								.slice(-8)
								.reverse()
								.map((reading, index) => (
									<div
										key={index}
										className="flex items-center justify-between text-xs p-2 bg-muted/30 rounded"
									>
										<span className="text-muted-foreground">{reading.time}</span>
										<span className="text-foreground font-medium">
											{reading.value} {getUnit()}
										</span>
									</div>
								))}
						</div>
					</div>

					{/* Action Buttons */}
					{/* <div className="flex items-center space-x-3 pt-4 border-t border-border">
						<Button className="bg-gradient-digital text-background hover:shadow-digital">
							Generate Report
						</Button>
						<Button variant="outline">Schedule Maintenance</Button>
						<Button variant="outline">Set Alert Threshold</Button>
					</div> */}
				</CardContent>
			</Card>
		</div>
	);
}
