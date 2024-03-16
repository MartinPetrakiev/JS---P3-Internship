import React, { useEffect, useRef } from "react";
import ObstacleItem from "./ObstacleItem";
import {
    useFoodContext,
    useGameControls,
    useObstacleContext,
} from "../../ContextProviders";
import { generateObstacles } from "../../utils/utils";

function ObstacleDots() {
    const { foodDots } = useFoodContext();
    const { obstacles, setObstacles } = useObstacleContext();
    const { gameControls } = useGameControls();
    const { gameLevel } = gameControls;

    const foodDotsRef = useRef(foodDots);

    useEffect(() => {
        foodDotsRef.current = foodDots;
    }, [foodDots]);

    useEffect(() => {
        generateObstacles(gameLevel, foodDotsRef, setObstacles);
    }, [gameLevel, setObstacles]);

    return (
        <g>
            {obstacles.map(([x, y], index) => (
                <ObstacleItem key={index} x={x} y={y} />
            ))}
        </g>
    );
}

export default React.memo(ObstacleDots);
