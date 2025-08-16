// src/components/OnshoreVisual.tsx

import React, { useState } from "react";

// Import images
import onShoreRigImage from "../assets/visualBg.png";
import oilDropImage from "../assets/oilDrop.png";
import chat1 from "../assets/chat1.png";
import chat2 from "../assets/chat2.png";

// Import audio files
import audio1 from "../assets/s2Audio1.mp3";
import audio2 from "../assets/s2Audio2.mp3";

const OnshoreVisual: React.FC = () => {
	const [isplaying, setIsPlaying] = useState("");
	// Create audio objects
	const audioClip1 = new Audio(audio1);
	const audioClip2 = new Audio(audio2);

	// Function to play audio clips sequentially
	const playAudio = () => {
		setIsPlaying("audio1");
		audioClip1.play();
		audioClip1.onended = () => {
			setIsPlaying("audio2");
			audioClip2.play();
		};
	};

	return (
		<div
			style={{
				position: "relative",
				width: "100%",
				height: "100%",
				backgroundImage: `url(${onShoreRigImage})`,
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
					width: "200px",
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
					width: "250px",
					height: "150px",
					backgroundImage: `url(${chat1})`,
					backgroundSize: "contain",
					backgroundPosition: "center",
					backgroundRepeat: "no-repeat",
					zIndex: isplaying == "audio1" ? 1 : "-1",
					position: "absolute",
					bottom: "38%",
					left: "18%"
				}}
			></div>
			<div
				style={{
					width: "250px",
					height: "150px",
					backgroundImage: `url(${chat2})`,
					backgroundSize: "contain",
					backgroundPosition: "center",
					zIndex: isplaying == "audio2" ? 1 : "-1",
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

export default OnshoreVisual;
