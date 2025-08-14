// src/components/PipelineVisuals.tsx

import React from "react";

// Import images
import pipelineImage from "../assets/pipeline.png";
import oilDropImage from "../assets/oilDrop.png";
import bubbleChat1Image from "../assets/chat1.png";
import bubbleChat2Image from "../assets/chat2.png";

// Import audio files
import audio1 from "../assets/s1Dialogue1.mp3";
import audio2 from "../assets/s1Dialogue2.mp3";

const PipelineVisuals: React.FC = () => {
	// Create audio objects
	const audioClip1 = new Audio(audio1);
	const audioClip2 = new Audio(audio2);

	// Function to play audio clips sequentially
	const playAudio = () => {
		audioClip1.play();
		audioClip1.onended = () => {
			audioClip2.play();
		};
	};

	return (
		<div
			style={{
				position: "relative",
				width: "100%",
				height: "100%",
				backgroundImage: `url(${pipelineImage})`,
				backgroundSize: "cover",
				backgroundPosition: "center",
				backgroundRepeat: "no-repeat"
			}}
			onClick={(e) => {
				// Check if the click is in the upper part of the screen
				const screenHeight = window.innerHeight;
				if (e.clientY < screenHeight / 2) {
					playAudio();
				}
			}}
		>
			<div
				style={{
					width: "100px",
					height: "100px",
					backgroundImage: `url(${oilDropImage})`,
					backgroundSize: "contain",
					backgroundPosition: "bottom",
					backgroundRepeat: "no-repeat",
					position: "absolute",
					bottom: "20%",
					left: "20%",
					animation: "hover 0.5s infinite alternate"
				}}
			></div>
			<div
				style={{
					width: "200px",
					height: "100px",
					backgroundImage: `url(${bubbleChat1Image})`,
					backgroundSize: "contain",
					backgroundPosition: "center",
					backgroundRepeat: "no-repeat",

					position: "absolute",
					bottom: "38%",
					left: "18%"
				}}
			></div>
			<div
				style={{
					width: "200px",
					height: "100px",
					backgroundImage: `url(${bubbleChat2Image})`,
					backgroundSize: "contain",
					backgroundPosition: "center",
					backgroundRepeat: "no-repeat",

					position: "absolute",
					top: "30%",
					right: "15%"
				}}
			></div>
			<style>
				{`
          @keyframes hover {
            0% {
              transform: translateY(0);
            }
            100% {
              transform: translateY(-10px);
            }
          }
        `}
			</style>
		</div>
	);
};

export default PipelineVisuals;
