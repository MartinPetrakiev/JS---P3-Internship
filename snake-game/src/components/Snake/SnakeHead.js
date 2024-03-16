import React from "react";

function SnakeHead({ x, y, ...restOfProps }) {
    return (
        <circle
            className="snake-item snake-head"
            cx={`${x + 1}rem`}
            cy={`${y + 1}rem`}
            r={"21px"}
            data-move-direction={restOfProps["data-move-direction"]}
            data-testid="snake-head"
            role="snake-dot"
        />
    );
}

export default SnakeHead;
