import React from "react";
import { OBSTACLE_SIZE } from "../../utils/constants";


function ObstacleItem({ x, y }) {
  return (
    <rect
      className="obstacle"
      x={`${x * OBSTACLE_SIZE}rem`}
      y={`${y * OBSTACLE_SIZE}rem`}
      data-testid={`obstacle-${x}-${y}`}
      data-x={x}
      data-y={y}
    />
  );
}

export default ObstacleItem;
