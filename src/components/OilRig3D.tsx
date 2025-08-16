import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text, Html } from "@react-three/drei";
import * as THREE from "three";

interface SensorPoint {
	id: string;
	position: [number, number, number];
	type: "pressure" | "flow" | "temperature" | "vibration";
	value: number;
	status: "normal" | "warning" | "critical";
}

const sensorData: SensorPoint[] = [
	{ id: "p1", position: [-2, 8, 0], type: "pressure", value: 2850, status: "normal" },
	{ id: "f1", position: [2, 6, 0], type: "flow", value: 145, status: "warning" },
	{ id: "t1", position: [0, 4, 1], type: "temperature", value: 89, status: "normal" },
	{ id: "v1", position: [-1, 2, -1], type: "vibration", value: 0.8, status: "critical" },
	{ id: "p2", position: [1.5, 7, 0.5], type: "pressure", value: 2920, status: "normal" }
];

function RigStructure() {
	const rigRef = useRef<THREE.Group>(null);

	useFrame((state) => {
		if (rigRef.current) {
			rigRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.02;
		}
	});

	return (
		<group ref={rigRef}>
			{/* Main tower */}
			<mesh position={[0, 5, 0]}>
				<boxGeometry args={[0.5, 10, 0.5]} />
				<meshStandardMaterial color="#8B4513" roughness={0.8} metalness={0.2} />
			</mesh>

			{/* Cross beams */}
			<mesh position={[0, 8, 0]} rotation={[0, 0, Math.PI / 2]}>
				<boxGeometry args={[0.3, 4, 0.3]} />
				<meshStandardMaterial color="#A0522D" roughness={0.7} metalness={0.3} />
			</mesh>

			<mesh position={[0, 6, 0]} rotation={[0, 0, Math.PI / 2]}>
				<boxGeometry args={[0.3, 3, 0.3]} />
				<meshStandardMaterial color="#A0522D" roughness={0.7} metalness={0.3} />
			</mesh>

			{/* Base platform */}
			<mesh position={[0, 0.5, 0]}>
				<boxGeometry args={[4, 0.2, 4]} />
				<meshStandardMaterial color="#696969" roughness={0.6} metalness={0.4} />
			</mesh>

			{/* Drill platform */}
			<mesh position={[0, 1.5, 0]}>
				<cylinderGeometry args={[1.5, 1.5, 0.3]} />
				<meshStandardMaterial color="#708090" roughness={0.5} metalness={0.5} />
			</mesh>

			{/* Equipment boxes */}
			<mesh position={[-1.5, 1, 1.5]}>
				<boxGeometry args={[0.8, 0.6, 0.8]} />
				<meshStandardMaterial color="#4682B4" roughness={0.3} metalness={0.7} />
			</mesh>

			<mesh position={[1.5, 1, 1.5]}>
				<boxGeometry args={[0.6, 0.8, 0.6]} />
				<meshStandardMaterial color="#2F4F4F" roughness={0.4} metalness={0.6} />
			</mesh>
		</group>
	);
}

function SensorHotspot({
	sensor,
	onClick
}: {
	sensor: SensorPoint;
	onClick: (sensor: SensorPoint) => void;
}) {
	const [hovered, setHovered] = useState(false);
	const meshRef = useRef<THREE.Mesh>(null);

	useFrame((state) => {
		if (meshRef.current) {
			meshRef.current.scale.setScalar(
				hovered ? 1.2 + Math.sin(state.clock.elapsedTime * 4) * 0.1 : 1
			);
		}
	});

	const getColor = () => {
		switch (sensor.status) {
			case "critical":
				return "#ff4444";
			case "warning":
				return "#ffaa00";
			default:
				return "#00ffaa";
		}
	};

	return (
		<mesh
			ref={meshRef}
			position={sensor.position}
			onPointerEnter={() => setHovered(true)}
			onPointerLeave={() => setHovered(false)}
			onClick={() => onClick(sensor)}
		>
			<sphereGeometry args={[0.1]} />
			<meshStandardMaterial
				color={getColor()}
				emissive={getColor()}
				emissiveIntensity={hovered ? 0.5 : 0.2}
				transparent
				opacity={0.8}
			/>
			{hovered && (
				<Html distanceFactor={10}>
					<div className="bg-card border border-digital-primary rounded-lg p-2 text-xs whitespace-nowrap">
						<div className="text-digital-primary font-semibold">{sensor.type.toUpperCase()}</div>
						<div className="text-foreground">{sensor.value}</div>
						<div
							className={`text-xs ${
								sensor.status === "critical"
									? "text-digital-danger"
									: sensor.status === "warning"
									? "text-digital-warning"
									: "text-digital-success"
							}`}
						>
							{sensor.status}
						</div>
					</div>
				</Html>
			)}
		</mesh>
	);
}

function DigitalTwin() {
	const twinRef = useRef<THREE.Group>(null);

	useFrame((state) => {
		if (twinRef.current) {
			twinRef.current.position.y = 12 + Math.sin(state.clock.elapsedTime) * 0.3;
			twinRef.current.rotation.y = state.clock.elapsedTime * 0.5;
		}
	});

	return (
		<group ref={twinRef} position={[5, 2, 0]}>
			<mesh>
				<boxGeometry args={[0.3, 6, 0.3]} />
				<meshStandardMaterial color="#00ffff" transparent opacity={0.3} wireframe />
			</mesh>
			<mesh position={[0, 2, 0]}>
				<boxGeometry args={[2, 0.1, 2]} />
				<meshStandardMaterial color="#00ffff" transparent opacity={0.3} wireframe />
			</mesh>
			<Text
				position={[0, -3.5, 0]}
				fontSize={0.5}
				color="#00ffff"
				anchorX="center"
				anchorY="middle"
			>
				DIGITAL TWIN
			</Text>
		</group>
	);
}

interface OilRig3DProps {
	onSensorClick: (sensor: SensorPoint) => void;
}

export default function OilRig3D({ onSensorClick }: OilRig3DProps) {
	return (
		<div className="w-full h-[100vh] bg-gradient-to-b from-background to-secondary">
			<Canvas camera={{ position: [10, 18, 10], fov: 90 }}>
				<ambientLight intensity={0.3} />
				<directionalLight position={[10, 10, 5]} intensity={1} castShadow />
				<pointLight position={[0, 15, 0]} intensity={0.5} color="#00ffff" />

				<RigStructure />
				<DigitalTwin />

				{sensorData.map((sensor) => (
					<SensorHotspot key={sensor.id} sensor={sensor} onClick={onSensorClick} />
				))}

				<OrbitControls
					enablePan={true}
					enableZoom={true}
					enableRotate={true}
					minDistance={5}
					maxDistance={25}
					minPolarAngle={0}
					maxPolarAngle={Math.PI / 2}
				/>

				<gridHelper args={[20, 20, "#333333", "#333333"]} />
			</Canvas>
		</div>
	);
}

export type { SensorPoint };
