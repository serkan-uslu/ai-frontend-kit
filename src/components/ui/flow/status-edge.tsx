"use client";

import {
  BaseEdge,
  EdgeLabelRenderer,
  EdgeProps,
  getBezierPath,
} from "@xyflow/react";

export function StatusEdge({
  // id is required in props but not used in this component
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  data,
}: EdgeProps) {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <>
      <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />
      <EdgeLabelRenderer>
        <div
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            pointerEvents: "all",
          }}
          className="nodrag nopan"
        >
          <div
            className={`rounded-md px-2 py-1 text-xs font-bold ${
              data?.error
                ? "bg-red-500/20 text-red-500 border border-red-500"
                : "bg-green-500/20 text-green-500 border border-green-500"
            }`}
          >
            {data?.error ? "Error" : "Success"}
          </div>
        </div>
      </EdgeLabelRenderer>
    </>
  );
}
