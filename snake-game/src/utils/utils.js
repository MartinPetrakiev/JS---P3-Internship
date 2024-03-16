import {
    LEVEL_2,
    LOW_LEVEL_OBSTACLES_COUNT,
    HIGHER_LEVEL_OBSTACLES_COUNT,
    MOVE_DIRECTIONS,
    OFFSET_X_FULL,
    OFFSET_X_HALF,
} from "./constants";
import { generateRandomObstacle, getRandomCoordinates } from "./gameLogic";
import { v4 as uuidv4 } from "uuid";

export const calculateSwipeDirection = (
    startX,
    startY,
    endX,
    endY,
    currentDirection
) => {
    const deltaX = endX - startX;
    const deltaY = endY - startY;
    const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

    const oppositeDirections = {
        [MOVE_DIRECTIONS.RIGHT]: MOVE_DIRECTIONS.LEFT,
        [MOVE_DIRECTIONS.LEFT]: MOVE_DIRECTIONS.RIGHT,
        [MOVE_DIRECTIONS.DOWN]: MOVE_DIRECTIONS.UP,
        [MOVE_DIRECTIONS.UP]: MOVE_DIRECTIONS.DOWN,
    };

    if (angle >= -45 && angle < 45) {
        return MOVE_DIRECTIONS.RIGHT === oppositeDirections[currentDirection]
            ? currentDirection
            : MOVE_DIRECTIONS.RIGHT;
    } else if (angle >= 45 && angle < 135) {
        return MOVE_DIRECTIONS.DOWN === oppositeDirections[currentDirection]
            ? currentDirection
            : MOVE_DIRECTIONS.DOWN;
    } else if (angle >= -135 && angle < -45) {
        return MOVE_DIRECTIONS.UP === oppositeDirections[currentDirection]
            ? currentDirection
            : MOVE_DIRECTIONS.UP;
    } else {
        return MOVE_DIRECTIONS.LEFT === oppositeDirections[currentDirection]
            ? currentDirection
            : MOVE_DIRECTIONS.LEFT;
    }
};

export function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function handlePlayerNameInput(e, stateSetter) {
    stateSetter((prevState) => {
        return {
            ...prevState,
            playerName: e.target.value,
        };
    });
}

export function buildSnakeTailPoints(snakeDot, snakeDotAdjacent) {
    const [dotX, dotY] = snakeDot.map((x) => x * OFFSET_X_HALF);
    const [adjDotX, adjDotY] = snakeDotAdjacent.map((x) => x * OFFSET_X_HALF);

    const TRIANGLE_POINTS_UP = [
        { x: dotY, y: dotX },
        { x: dotY + OFFSET_X_FULL, y: dotX },
        { x: dotY + OFFSET_X_HALF, y: dotX + OFFSET_X_FULL },
    ];

    const TRIANGLE_POINTS_RIGHT = [
        { x: dotY + OFFSET_X_FULL, y: dotX },
        { x: dotY + OFFSET_X_FULL, y: dotX + OFFSET_X_FULL },
        { x: dotY, y: dotX + OFFSET_X_HALF },
    ];

    const TRIANGLE_POINTS_LEFT = [
        { x: dotY, y: dotX },
        { x: dotY, y: dotX + OFFSET_X_FULL },
        { x: dotY + OFFSET_X_FULL, y: dotX + OFFSET_X_HALF },
    ];

    const TRIANGLE_POINTS_DOWN = [
        { x: dotY + OFFSET_X_HALF, y: dotX },
        { x: dotY, y: dotX + OFFSET_X_FULL },
        { x: dotY + OFFSET_X_FULL, y: dotX + OFFSET_X_FULL },
    ];

    let pointsString = "";

    if (adjDotX < dotX) {
        pointsString = TRIANGLE_POINTS_UP.map(({ x, y }) => `${x},${y}`).join(
            " "
        );
    } else if (adjDotX > dotX) {
        pointsString = TRIANGLE_POINTS_DOWN.map(({ x, y }) => `${x},${y}`).join(
            " "
        );
    } else if (adjDotY < dotY) {
        pointsString = TRIANGLE_POINTS_LEFT.map(({ x, y }) => `${x},${y}`).join(
            " "
        );
    } else if (adjDotY > dotY) {
        pointsString = TRIANGLE_POINTS_RIGHT.map(
            ({ x, y }) => `${x},${y}`
        ).join(" ");
    }

    return pointsString;
}

export const generateFoodDots = (isPaused, setFoodDots, obstacles, gameLevel) =>
    setTimeout(() => {
        if (!isPaused) {
            const randomInt = getRandomInt(1, 200);

            setFoodDots((prev) => {
                const [randomX, randomY] = getRandomCoordinates(
                    prev,
                    obstacles
                );

                return [
                    ...prev,
                    {
                        key: uuidv4(),
                        x: randomX,
                        y: randomY,
                        disco:
                            randomInt > 50 &&
                            randomInt < 120 &&
                            gameLevel > LEVEL_2,
                        alcohol:
                            randomInt > 120 &&
                            randomInt < 200 &&
                            gameLevel > LEVEL_2,
                    },
                ];
            });
        }
    }, 5000);

export const generateObstacles = (gameLevel, foodDots, setObstacles) => {
    let numberOfObstacles = 0;

    if (gameLevel === LEVEL_2) {
        numberOfObstacles = LOW_LEVEL_OBSTACLES_COUNT;
    } else if (gameLevel > 2) {
        numberOfObstacles = HIGHER_LEVEL_OBSTACLES_COUNT + gameLevel;
    }

    const newObstacles = Array.from({ length: numberOfObstacles }, () =>
        generateRandomObstacle(foodDots)
    );

    setObstacles(newObstacles);
};
