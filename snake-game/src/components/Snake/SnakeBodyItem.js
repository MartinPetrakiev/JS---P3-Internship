import React from "react";
import { getRandomInt } from "../../utils/utils";
import { RAINBOW_COLORS } from "../../utils/constants";

function SnakeBodyItem({ snakeDot, discoMode }) {
    return (
        <rect
            className="snake-item snake-body"
            x={`${snakeDot[1]}rem`}
            y={`${snakeDot[0]}rem`}
            fill={discoMode ? RAINBOW_COLORS[getRandomInt(0, RAINBOW_COLORS.length - 1)] : "mediumseagreen"}
            role="snake-dot"
        />
    );
}

export default SnakeBodyItem;
