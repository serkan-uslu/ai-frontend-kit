"use client";

import "@xyflow/react/dist/style.css";
import {
  Background,
  ReactFlow,
  ReactFlowProvider,
  Node,
  Edge,
  Position,
  MarkerType,
} from "@xyflow/react";
import { Message } from "@/lib/types";
import { useMemo } from "react";

interface ChatFlowViewProps {
  messages: Message[];
}

export function ChatFlowView({ messages }: ChatFlowViewProps) {
  // Create nodes from messages
  const nodes = useMemo(() => {
    // Calculate positions for side-by-side layout
    // We'll create a grid layout with multiple columns
    const columns = 4; // Number of nodes per row
    const horizontalGap = 250; // Gap between nodes horizontally
    const verticalGap = 150; // Gap between rows

    return messages.map((message, index) => {
      // Calculate row and column for grid layout
      const row = Math.floor(index / columns);
      const col = index % columns;

      // Calculate x and y positions based on grid
      const x = 100 + col * horizontalGap;
      const y = 100 + row * verticalGap;

      // Truncate message content for display
      const displayContent =
        message.content.length > 100
          ? message.content.substring(0, 100) + "..."
          : message.content;

      return {
        id: message.id,
        type: "chatMessage",
        position: { x, y },
        data: {
          label: message.isUser ? "User" : "AI",
          content: displayContent,
          isUser: message.isUser,
          isThinking: message.isThinking,
        },
        // Use right/left positions for better edge visibility in grid layout
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
      } as Node;
    });
  }, [messages]);

  // Create edges connecting the messages in sequence
  const edges = useMemo(() => {
    if (messages.length <= 1) return [];

    return messages.slice(1).map((message, index) => {
      const sourceId = messages[index].id;
      const targetId = message.id;

      return {
        id: `e-${sourceId}-${targetId}`,
        source: sourceId,
        target: targetId,
        type: "smoothstep", // Use smoothstep for better visibility
        // Add animated and smooth bezier curve styling
        animated: true,
        style: { stroke: "#ff0072", strokeWidth: 3 }, // Increased width for better visibility
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: "#ff0072",
          width: 20,
          height: 20,
        },
      } as Edge;
    });
  }, [messages]);

  // Custom node types
  const nodeTypes = useMemo(
    () => ({
      chatMessage: ChatMessageNode,
    }),
    [],
  );

  // We're using default edge types with custom styling

  const defaultViewport = { x: 0, y: 0, zoom: 1 };

  return (
    <div className="w-full h-[calc(100vh-200px)] border border-border rounded-md">
      <ReactFlowProvider>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          defaultViewport={defaultViewport}
          fitView
          fitViewOptions={{ padding: 0.2 }}
          minZoom={0.5}
          maxZoom={2}
          attributionPosition="bottom-right"
        >
          <Background gap={12} size={1} />
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  );
}

// Custom node component for chat messages
interface ChatMessageNodeData {
  label: string;
  content: string;
  isUser: boolean;
  isThinking?: boolean;
}

function ChatMessageNode({ data }: { data: ChatMessageNodeData }) {
  return (
    <div
      className={`p-4 rounded-lg shadow-md max-w-xs border ${
        data.isUser
          ? "bg-primary text-primary-foreground border-primary"
          : data.isThinking
            ? "bg-amber-50 border-amber-200 dark:bg-amber-950/30 dark:border-amber-800/50"
            : "bg-muted/50 border-muted-foreground/20"
      }`}
    >
      <div className="font-bold mb-2">{data.label}</div>
      <div className="text-sm">{data.content}</div>
    </div>
  );
}
