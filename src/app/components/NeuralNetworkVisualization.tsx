"use client";

import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import * as THREE from 'three';

// Neural network configuration
const NETWORK_CONFIG = {
  layers: [6, 10, 8, 4, 2], // Number of neurons in each layer
  neuronSize: 0.15,
  layerDistance: 1.5,
  colors: {
    input: '#4f46e5', // Indigo
    hidden: '#8b5cf6', // Purple
    output: '#ec4899', // Pink
    connections: '#94a3b8', // Slate
    activeNeuron: '#f59e0b', // Amber
    activeConnection: '#10b981', // Emerald
    text: '#f8fafc', // Slate 50
  }
};

interface NeuronProps {
  position: [number, number, number];
  color: string;
  size: number;
  isActive: boolean;
  label?: string;
}

// Single neuron component
function Neuron({ position, color, size, isActive, label }: NeuronProps) {
  const sphereRef = useRef<THREE.Mesh>(null);
  
  // Pulse effect for active neurons
  useFrame(({ clock }) => {
    if (sphereRef.current && isActive) {
      sphereRef.current.scale.setScalar(1 + Math.sin(clock.getElapsedTime() * 2) * 0.1);
    }
  });
  
  return (
    <group position={position}>
      <mesh ref={sphereRef}>
        <sphereGeometry args={[size, 16, 16]} />
        <meshStandardMaterial 
          color={isActive ? NETWORK_CONFIG.colors.activeNeuron : color} 
          roughness={0.3}
          metalness={0.8}
          emissive={isActive ? NETWORK_CONFIG.colors.activeNeuron : color}
          emissiveIntensity={isActive ? 0.5 : 0.2}
        />
      </mesh>
      {label && (
        <Text
          position={[0, -size * 1.8, 0]}
          fontSize={size * 0.8}
          color={NETWORK_CONFIG.colors.text}
          anchorX="center"
          anchorY="middle"
        >
          {label}
        </Text>
      )}
    </group>
  );
}

interface ConnectionProps {
  startPos: [number, number, number];
  endPos: [number, number, number];
  color: string;
  thickness: number;
  isActive: boolean;
}

// Connection between neurons
function Connection({ startPos, endPos, color, thickness, isActive }: ConnectionProps) {
  const lineRef = useRef<THREE.Line>(null);
  
  useEffect(() => {
    if (lineRef.current) {
      lineRef.current.geometry.setFromPoints([
        new THREE.Vector3(...startPos),
        new THREE.Vector3(...endPos)
      ]);
    }
  }, [startPos, endPos]);
  
  return (
    // @ts-expect-error - type incompatibility between Line and SVGLineElement
    <line ref={lineRef}>
      <bufferGeometry />
      <lineBasicMaterial 
        color={isActive ? NETWORK_CONFIG.colors.activeConnection : color} 
        linewidth={thickness}
        opacity={isActive ? 1 : 0.4}
        transparent={true}
      />
    </line>
  );
}

interface LayerProps {
  neurons: [number, number, number][];
  layerIndex: number;
  activeNeurons: number[];
}

// Layer of neurons
function Layer({ neurons, layerIndex, activeNeurons }: LayerProps) {
  const layerColor = layerIndex === 0 
    ? NETWORK_CONFIG.colors.input 
    : layerIndex === NETWORK_CONFIG.layers.length - 1 
      ? NETWORK_CONFIG.colors.output 
      : NETWORK_CONFIG.colors.hidden;
  
  const labels: {[key: number]: string[]} = {
    0: ['x₁', 'x₂', 'x₃', 'x₄', 'x₅', 'x₆'],
    [NETWORK_CONFIG.layers.length - 1]: ['y₁', 'y₂']
  };
  
  return (
    <group position={[layerIndex * NETWORK_CONFIG.layerDistance - (NETWORK_CONFIG.layers.length - 1) * NETWORK_CONFIG.layerDistance / 2, 0, 0]}>
      {neurons.map((neuronPos, i) => (
        <Neuron 
          key={`layer-${layerIndex}-neuron-${i}`}
          position={neuronPos}
          color={layerColor}
          size={NETWORK_CONFIG.neuronSize}
          isActive={activeNeurons.includes(i)}
          label={labels[layerIndex] ? labels[layerIndex][i] : undefined}
        />
      ))}
    </group>
  );
}

// Connection data type
type ConnectionData = [number, number, number, number]; // [sourceLayer, sourceNeuron, targetLayer, targetNeuron]

// Full neural network visualization
function NeuralNetwork() {
  // Store positions of all neurons in each layer
  const neuronPositions: [number, number, number][][] = NETWORK_CONFIG.layers.map((size) => {
    return Array(size).fill(0).map((_, neuronIndex) => {
      const yOffset = (size - 1) * NETWORK_CONFIG.neuronSize * 2 / 2;
      return [0, neuronIndex * NETWORK_CONFIG.neuronSize * 2.5 - yOffset, 0] as [number, number, number];
    });
  });
  
  // Randomly choose active neurons for visual effect
  const [activeNeurons, setActiveNeurons] = useState<number[][]>(
    NETWORK_CONFIG.layers.map(layerSize => 
      Array(Math.ceil(layerSize * 0.4))
        .fill(0)
        .map(() => Math.floor(Math.random() * layerSize))
    )
  );
  
  // Randomly choose active connections
  const [activeConnections, setActiveConnections] = useState<ConnectionData[]>([]);
  
  // Periodically change active neurons and connections for animation
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveNeurons(
        NETWORK_CONFIG.layers.map(layerSize => 
          Array(Math.ceil(layerSize * 0.4))
            .fill(0)
            .map(() => Math.floor(Math.random() * layerSize))
        )
      );
      
      // Generate random active connections
      const newActiveConnections: ConnectionData[] = [];
      for (let l = 0; l < NETWORK_CONFIG.layers.length - 1; l++) {
        const sourceNeurons = Math.ceil(NETWORK_CONFIG.layers[l] * 0.3);
        const targetNeurons = Math.ceil(NETWORK_CONFIG.layers[l+1] * 0.3);
        
        for (let i = 0; i < sourceNeurons; i++) {
          for (let j = 0; j < targetNeurons; j++) {
            const sourceIndex = Math.floor(Math.random() * NETWORK_CONFIG.layers[l]);
            const targetIndex = Math.floor(Math.random() * NETWORK_CONFIG.layers[l+1]);
            newActiveConnections.push([l, sourceIndex, l+1, targetIndex]);
          }
        }
      }
      setActiveConnections(newActiveConnections);
    }, 1200);
    
    return () => clearInterval(interval);
  }, []);
  
  // Create connections between all adjacent layers
  const connections = [];
  for (let layerIndex = 0; layerIndex < NETWORK_CONFIG.layers.length - 1; layerIndex++) {
    const currentLayer = neuronPositions[layerIndex];
    const nextLayer = neuronPositions[layerIndex + 1];
    
    for (let i = 0; i < currentLayer.length; i++) {
      for (let j = 0; j < nextLayer.length; j++) {
        const startPos: [number, number, number] = [
          layerIndex * NETWORK_CONFIG.layerDistance - (NETWORK_CONFIG.layers.length - 1) * NETWORK_CONFIG.layerDistance / 2 + NETWORK_CONFIG.neuronSize,
          currentLayer[i][1],
          0
        ];
        
        const endPos: [number, number, number] = [
          (layerIndex + 1) * NETWORK_CONFIG.layerDistance - (NETWORK_CONFIG.layers.length - 1) * NETWORK_CONFIG.layerDistance / 2 - NETWORK_CONFIG.neuronSize,
          nextLayer[j][1],
          0
        ];
        
        const isActive = activeConnections.some(
          conn => conn[0] === layerIndex && conn[1] === i && conn[2] === layerIndex + 1 && conn[3] === j
        );
        
        connections.push(
          <Connection 
            key={`connection-${layerIndex}-${i}-${layerIndex+1}-${j}`}
            startPos={startPos}
            endPos={endPos}
            color={NETWORK_CONFIG.colors.connections}
            thickness={1}
            isActive={isActive}
          />
        );
      }
    }
  }
  
  return (
    <>
      {/* Connections first (to appear behind neurons) */}
      {connections}
      
      {/* Layers */}
      {neuronPositions.map((neurons, layerIndex) => (
        <Layer 
          key={`layer-${layerIndex}`} 
          neurons={neurons} 
          layerIndex={layerIndex} 
          activeNeurons={activeNeurons[layerIndex]}
        />
      ))}
    </>
  );
}

export default function NeuralNetworkVisualization() {
  return (
    <div className="w-full h-[600px] rounded-xl overflow-hidden border border-slate-700/50 bg-slate-800/30 backdrop-blur-sm">
      <Canvas camera={{ position: [0, 0, 7.5], fov: 50 }}>
        <color attach="background" args={['#0f172a']} />
        
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
        
        <NeuralNetwork />
        
        <OrbitControls 
          enablePan={false} 
          enableZoom={true} 
          minDistance={4} 
          maxDistance={20}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
      
      <div className="absolute bottom-4 left-4 text-sm text-slate-300 bg-slate-900/70 p-2 rounded-lg">
        <p>Interactive 3D Neural Network Visualization</p>
        <p className="text-xs text-slate-400 mt-1">Drag to rotate • Scroll to zoom</p>
      </div>
    </div>
  );
} 