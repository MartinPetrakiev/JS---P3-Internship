import React from "react";
import Food from "./Food";
import {
    useFoodContext,
    useGameControls,
    useObstacleContext,
} from "../../ContextProviders";
import { generateFoodDots } from "../../utils/utils";

function FoodDots() {
    const { foodDots, setFoodDots } = useFoodContext();
    const { obstacles } = useObstacleContext();
    const { gameControls } = useGameControls();
    const { isPaused, gameLevel } = gameControls;

    React.useEffect(() => {
        const foodGenerateTimeout = generateFoodDots(
            isPaused,
            setFoodDots,
            obstacles,
            gameLevel
        );

        return () => {
            clearTimeout(foodGenerateTimeout);
        };
    }, [isPaused, gameLevel, setFoodDots, foodDots.length, obstacles]);

    React.useEffect(() => {
        if (!isPaused && foodDots.length > 6) {
            setFoodDots((prev) => {
                return [...prev.slice(prev.length - 2)];
            });
        }
    }, [isPaused, foodDots.length, setFoodDots]);

    return (
        <>
            {foodDots.length > 0 &&
                foodDots.map(({ key, x, y, disco, alcohol }) => (
                    <Food
                        key={key}
                        x={x}
                        y={y}
                        disco={disco}
                        alcohol={alcohol}
                    />
                ))}
        </>
    );
}

export default React.memo(FoodDots);
