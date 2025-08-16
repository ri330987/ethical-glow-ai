import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
	children: ReactNode;
	className?: string;
}

export default function DashboardLayout({ children, className }: DashboardLayoutProps) {
	return (
		<div
			className={cn(
				"min-h-screen bg-background text-foreground",
				"bg-gradient-to-br from-background via-secondary to-background",
				className
			)}
		>
			{/* Header */}
			<header className="border-b border-border bg-card/50 backdrop-blur-sm">
				<div className="container mx-auto px-4 py-4">
					<div className="flex items-center justify-between">
						<div className="flex items-center space-x-4">
							<div className="w-8 h-8 bg-gradient-digital rounded-lg flex items-center justify-center">
								<div className="w-4 h-4 bg-foreground rounded-sm" />
							</div>
							<div>
								<h1 className="text-xl font-bold bg-gradient-digital bg-clip-text text-transparent">
									Nexus Digital Command
								</h1>
								<p className="text-sm text-muted-foreground">
									Onshore Operations Modernization Platform
								</p>
							</div>
						</div>

						<div className="flex items-center space-x-4">
							<div className="flex items-center space-x-2 px-3 py-1 rounded-full bg-digital-success/20 border border-digital-success/30">
								<div className="w-2 h-2 bg-digital-success rounded-full animate-pulse" />
								<span className="text-sm text-digital-success font-medium">LIVE</span>
							</div>

							{/* <button className="px-6 py-2 bg-gradient-digital text-background rounded-lg font-medium hover:shadow-digital transition-all duration-300 transform hover:scale-105">
                Request Demo
              </button> */}
						</div>
					</div>
				</div>
			</header>

			{/* Main Content */}
			<main className="flex-1">{children}</main>

			{/* Footer */}
			<footer className="border-t border-border bg-card/30 backdrop-blur-sm mt-auto">
				<div className="container mx-auto px-4 py-6">
					<div className="flex items-center justify-between">
						<div className="text-sm text-muted-foreground">
							© 2024 Nexus Digital. Transforming traditional operations with cutting-edge
							technology.
						</div>
					</div>
				</div>
			</footer>
		</div>
	);
}
