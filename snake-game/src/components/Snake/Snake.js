import React from "react";
import SnakeTail from "./SnakeTail";
import SnakeHead from "./SnakeHead";
import SnakeBodyItem from "./SnakeBodyItem";
import {
    INITIAL_GAME_SPEED,
    INITIAL_SNAKE_DOTS,
    MOVE_DIRECTIONS,
} from "../../utils/constants";
import {
    useFoodContext,
    useGameControls,
    useObstacleContext,
} from "../../ContextProviders";
import { useGameLoop } from "../../hooks/useGameLoop";
import { useHandleOverlappingObjects } from "../../hooks/useOverlapDetection";
import {
    onKeyDown,
    useHandleDoubleTap,
    useHandleKeyDown,
    useHandleTouchStart,
} from "../../hooks/useSnakeControls";

function Snake() {
    const { gameControls, setGameControls } = useGameControls();
    const { foodDots, setFoodDots } = useFoodContext();
    const { obstacles, setObstacles } = useObstacleContext();
    const [snakeDots, setSnakeDots] = React.useState(INITIAL_SNAKE_DOTS);
    const [speed, setSpeed] = React.useState(INITIAL_GAME_SPEED);
    const [moveDirection, setMoveDirection] = React.useState(
        MOVE_DIRECTIONS.RIGHT
    );
    const [isMoving, setIsMoving] = React.useState(false);

    const { isPaused, gameLevel, discoMode } = gameControls;

    const gameParams = {
        moveDirection,
        speed,
        snakeDots,
        foodDots,
        obstacles,
        gameControls,
    };

    const gameStateSetters = {
        setSnakeDots,
        setFoodDots,
        setObstacles,
        setMoveDirection,
        setSpeed,
        setGameControls,
    };

    useHandleKeyDown(
        onKeyDown,
        isPaused,
        moveDirection,
        setMoveDirection,
        setGameControls,
        isMoving,
        setIsMoving,
        speed
    );
    useHandleTouchStart(isPaused, moveDirection, setMoveDirection);
    useHandleDoubleTap(isPaused, setGameControls);

    useGameLoop(gameParams, gameStateSetters);

    useHandleOverlappingObjects(
        isPaused,
        gameLevel,
        setFoodDots,
        setObstacles,
        snakeDots,
        foodDots,
        obstacles
    );

    return (
        <>
            {snakeDots?.map((snakeDot, index, allDots) => (
                <React.Fragment key={index}>
                    {index === 0 && (
                        <SnakeTail
                            snakeDot={snakeDot}
                            snakeDotAdjacent={allDots[1]}
                        />
                    )}
                    {index !== 0 && index !== allDots.length - 1 && (
                        <SnakeBodyItem
                            snakeDot={snakeDot}
                            discoMode={discoMode}
                        />
                    )}
                    {index === allDots.length - 1 && (
                        <SnakeHead
                            x={snakeDot[1]}
                            y={snakeDot[0]}
                            data-move-direction={moveDirection}
                        />
                    )}
                </React.Fragment>
            ))}
        </>
    );
}

export default React.memo(Snake);
