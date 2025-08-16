import React from "react";
function TestSize() {
	return (
		<div
			style={{
				width: "100%",
				height: "100vh",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				backgroundColor: "red"
			}}
		>
			<div
				style={{
					aspectRatio: "7150 / 1800",
					width: "100%",
					maxHeight: "100%",
					backgroundColor: "red",
					border: "2px solid black"
				}}
			>
				<h1 style={{ textAlign: "center", paddingTop: "20px", color: "white" }}>
					Big Red Screen (Scaled)
				</h1>
			</div>
		</div>
	);
}
export default TestSize;
