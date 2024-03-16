import React from "react";
import FoodItem from "./FoodItem";

function Food({ x, y, disco, alcohol }) {
    return (
        <svg
            className="food-item"
            x={`${x}rem`}
            y={`${y}rem`}
            data-testid={`food-${x}-${y}`}
            data-x={x}
            data-y={y}
            data-disco={disco}
            data-alcohol={alcohol}
        >
            <FoodItem disco={disco} alcohol={alcohol} />
        </svg>
    );
}

export default Food;
