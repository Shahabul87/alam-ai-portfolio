"use client";

import { useRef, useEffect } from 'react';

export default function SimpleAIVisualization() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const resizeCanvas = () => {
      const container = canvas.parentElement;
      if (!container) return;
      
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
      
      // Force redraw when resizing
      initializeVisualization();
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    // Initialize visualization function
    function initializeVisualization() {
      if (!canvas) return;
      
      // Create neural network nodes
      const layers = [5, 10, 10, 5];
      const nodes: {
        x: number;
        y: number;
        radius: number;
        layer: number;
        index: number;
        connections: number[];
        color: string;
        pulseEffect: number;
        pulseDirection: number;
      }[] = [];
      
      // Node colors based on existing design
      const colors = ['#4F46E5', '#7C3AED', '#8B5CF6', '#EC4899'];
      
      // Create nodes for each layer
      layers.forEach((nodeCount, layerIndex) => {
        const layerX = canvas.width * (layerIndex + 1) / (layers.length + 1);
        
        for (let i = 0; i < nodeCount; i++) {
          // Calculate vertical spacing based on container height to prevent clipping
          const containerHeight = canvas.height;
          const margin = containerHeight * 0.12; // Add margin at top and bottom
          const availableHeight = containerHeight - (margin * 2);
          const spacing = availableHeight / Math.max(...layers);
          
          // Calculate y position with margin to prevent clipping
          const layerHeight = (nodeCount - 1) * spacing;
          const nodeY = margin + (availableHeight / 2 - layerHeight / 2) + (i * spacing);
          
          nodes.push({
            x: layerX,
            y: nodeY,
            radius: 10,
            layer: layerIndex,
            index: i,
            connections: [],
            color: colors[layerIndex % colors.length],
            pulseEffect: Math.random(),
            pulseDirection: Math.random() > 0.5 ? 1 : -1
          });
        }
      });
      
      // Create connections between nodes
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        if (node.layer < layers.length - 1) {
          const nextLayerStartIndex = nodes.findIndex(n => n.layer === node.layer + 1);
          const nextLayerCount = layers[node.layer + 1];
          
          // Connect to some nodes in the next layer
          for (let j = 0; j < nextLayerCount; j++) {
            // Add more connections for a denser network
            if (Math.random() > 0.2) {
              node.connections.push(nextLayerStartIndex + j);
            }
          }
        }
      }
      
      // Animation variables
      let animationFrameId: number;
      const signals: {
        startNode: number;
        endNode: number;
        progress: number;
        speed: number;
        color: string;
        size: number;
      }[] = [];
      
      // Create initial signals
      const createNewSignal = () => {
        // Find a random node from first layer
        const startLayerNodes = nodes.filter(node => node.layer === 0);
        const startNode = startLayerNodes[Math.floor(Math.random() * startLayerNodes.length)];
        
        if (startNode && startNode.connections.length > 0) {
          const endNodeIndex = startNode.connections[Math.floor(Math.random() * startNode.connections.length)];
          signals.push({
            startNode: nodes.indexOf(startNode),
            endNode: endNodeIndex,
            progress: 0,
            speed: 0.01 + Math.random() * 0.02,
            color: startNode.color,
            size: 3 + Math.random() * 2
          });
        }
      };
      
      // Start with a few signals
      for (let i = 0; i < 3; i++) {
        createNewSignal();
      }
      
      // Animation function
      const animate = () => {
        if (!ctx || !canvas) return;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw connections
        for (const node of nodes) {
          for (const connectionIndex of node.connections) {
            const connectedNode = nodes[connectionIndex];
            
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(connectedNode.x, connectedNode.y);
            ctx.stroke();
          }
        }
        
        // Update and draw signals
        for (let i = signals.length - 1; i >= 0; i--) {
          const signal = signals[i];
          const startNode = nodes[signal.startNode];
          const endNode = nodes[signal.endNode];
          
          signal.progress += signal.speed;
          
          if (signal.progress >= 1) {
            // Signal reached its destination
            endNode.pulseEffect = 1; // Create pulse effect on arrival
            
            // If there are more layers ahead, continue the signal
            if (endNode.layer < layers.length - 1 && endNode.connections.length > 0) {
              // Pick a random connection to the next layer
              const nextNodeIndex = endNode.connections[Math.floor(Math.random() * endNode.connections.length)];
              signals[i] = {
                startNode: signal.endNode,
                endNode: nextNodeIndex,
                progress: 0,
                speed: 0.01 + Math.random() * 0.02,
                color: endNode.color,
                size: signal.size
              };
            } else {
              // End of network reached, remove signal and create a new one
              signals.splice(i, 1);
              if (Math.random() < 0.3) {
                createNewSignal();
              }
            }
          } else {
            // Draw moving signal
            const x = startNode.x + (endNode.x - startNode.x) * signal.progress;
            const y = startNode.y + (endNode.y - startNode.y) * signal.progress;
            
            ctx.fillStyle = signal.color;
            ctx.beginPath();
            ctx.arc(x, y, signal.size, 0, Math.PI * 2);
            ctx.fill();
            
            // Add glow to signals
            const signalGlow = ctx.createRadialGradient(
              x, y, 0,
              x, y, signal.size * 3
            );
            signalGlow.addColorStop(0, signal.color);
            signalGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
            
            ctx.fillStyle = signalGlow;
            ctx.globalAlpha = 0.3;
            ctx.beginPath();
            ctx.arc(x, y, signal.size * 3, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalAlpha = 1.0;
          }
        }
        
        // Occasionally create new signals
        if (Math.random() < 0.03 && signals.length < 15) {
          createNewSignal();
        }
        
        // Draw nodes
        for (const node of nodes) {
          // Update pulse effect
          if (node.pulseEffect > 0) {
            node.pulseEffect -= 0.02;
            if (node.pulseEffect < 0) node.pulseEffect = 0;
          }
          
          // Draw node with pulse effect
          const glow = ctx.createRadialGradient(
            node.x, node.y, node.radius,
            node.x, node.y, node.radius * (1 + node.pulseEffect * 2)
          );
          
          glow.addColorStop(0, node.color);
          glow.addColorStop(1, 'rgba(0, 0, 0, 0)');
          
          // Draw glow if pulsing
          if (node.pulseEffect > 0) {
            ctx.fillStyle = glow;
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.radius * (1 + node.pulseEffect * 2), 0, Math.PI * 2);
            ctx.fill();
          }
          
          // Draw main node
          ctx.fillStyle = node.color;
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
          ctx.fill();
          
          // Add white core to the node
          ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius * 0.4, 0, Math.PI * 2);
          ctx.fill();
        }
        
        animationFrameId = requestAnimationFrame(animate);
      };
      
      // Start animation
      animate();
      
      // Return cleanup function
      return () => {
        cancelAnimationFrame(animationFrameId);
      };
    }
    
    // Initialize visualization
    const cleanup = initializeVisualization();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (cleanup) cleanup();
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="w-full h-full"
      style={{ 
        background: 'transparent',
        pointerEvents: 'none'
      }} 
    />
  );
} 