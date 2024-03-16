import { useEffect } from "react";
import { gameRun, moveSnake } from "../utils/gameLogic";

export function useGameLoop(
    {
        moveDirection,
        speed,
        snakeDots,
        foodDots,
        obstacles,
        gameControls,
    },
    {
        setSnakeDots,
        setFoodDots,
        setObstacles,
        setMoveDirection,
        setSpeed,
        setGameControls,
    }
) {
    const { alive: isAlive, isPaused } = gameControls;

    useEffect(() => {
        let run;

        if (!isPaused && isAlive) {
            run = setInterval(() => {
                moveSnake(moveDirection, snakeDots, setSnakeDots);

                gameRun(
                    {
                        snakeDots,
                        foodDots,
                        obstacles,
                        moveDirection,
                        speed,
                        gameControls,
                    },
                    {
                        setSnakeDots,
                        setFoodDots,
                        setObstacles,
                        setMoveDirection,
                        setSpeed,
                        setGameControls,
                    }
                );
            }, speed);
        }

        return () => {
            clearInterval(run);
        };
    }, [
        isPaused,
        isAlive,
        moveDirection,
        speed,
        snakeDots,
        foodDots,
        obstacles,
        gameControls,
        setSnakeDots,
        setFoodDots,
        setObstacles,
        setMoveDirection,
        setSpeed,
        setGameControls,
    ]);
}
