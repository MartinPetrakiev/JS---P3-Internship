import React, { useCallback, useEffect, useRef } from "react";
import { calculateSwipeDirection } from "../utils/utils";
import { KEYBOARD_KEYS, MOVE_DIRECTIONS } from "../utils/constants";

export const useHandleKeyDown = (
    onKeyDown,
    isPaused,
    moveDirection,
    setMoveDirection,
    setGameControls,
    isMoving,
    setIsMoving,
    speed
) => {
    const handleKeyDown = React.useCallback(
        (e) => {
            if (isMoving) return;

            onKeyDown(
                e,
                isPaused,
                moveDirection,
                setMoveDirection,
                setGameControls,
                setIsMoving,
                speed
            );
        },
        [isPaused, moveDirection, setMoveDirection, setGameControls, onKeyDown, isMoving, setIsMoving, speed]
    );

    React.useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [handleKeyDown]);
};

export const useHandleTouchStart = (
    isPaused,
    currentDirection,
    setMoveDirection
) => {
    const handleTouchStartCallback = UseHandleTouchStart(
        isPaused,
        currentDirection,
        setMoveDirection
    );

    useEffect(() => {
        document.addEventListener("touchstart", handleTouchStartCallback);

        return () => {
            document.removeEventListener(
                "touchstart",
                handleTouchStartCallback
            );
        };
    }, [isPaused, handleTouchStartCallback]);
};

export const useHandleDoubleTap = (isPaused, setGameControls) => {
    const handleDoubleTap = UseDoubleTapCallback(isPaused, setGameControls);

    useEffect(() => {
        document.addEventListener("touchend", handleDoubleTap);

        return () => {
            document.removeEventListener("touchend", handleDoubleTap);
        };
    }, [handleDoubleTap]);
};

export function onKeyDown(
    e,
    isPaused,
    moveDirection,
    setMoveDirection,
    setGameControls,
    setIsMoving,
    speed
) {
    const { UP, DOWN, LEFT, RIGHT, PAUSE } = KEYBOARD_KEYS;
    const oppositeDirections = {
        [RIGHT]: MOVE_DIRECTIONS.LEFT,
        [LEFT]: MOVE_DIRECTIONS.RIGHT,
        [DOWN]: MOVE_DIRECTIONS.UP,
        [UP]: MOVE_DIRECTIONS.DOWN,
    };

    if (moveDirection === oppositeDirections[e.keyCode]) {
        return;
    }

    setIsMoving(true);

    switch (e.keyCode) {
        case UP:
            !isPaused && setMoveDirection(MOVE_DIRECTIONS.UP);
            break;
        case DOWN:
            !isPaused && setMoveDirection(MOVE_DIRECTIONS.DOWN);
            break;
        case LEFT:
            !isPaused && setMoveDirection(MOVE_DIRECTIONS.LEFT);
            break;
        case RIGHT:
            !isPaused && setMoveDirection(MOVE_DIRECTIONS.RIGHT);
            break;
        case PAUSE:
            setGameControls((prevState) => {
                return {
                    ...prevState,
                    isPaused: !isPaused,
                };
            });
            break;
        default:
            break;
    }

    setTimeout(() => {
        setIsMoving(false);
    }, speed);
}

function UseHandleTouchStart(isPaused, currentDirection, setMoveDirection) {
    return useCallback(
        (e) => {
            if (!isPaused) {
                const touch = e.touches[0];
                const startX = touch.clientX;
                const startY = touch.clientY;

                const handleTouchEnd = (e) => {
                    const touch = e.changedTouches[0];
                    const endX = touch.clientX;
                    const endY = touch.clientY;

                    const swipeDirection = calculateSwipeDirection(
                        startX,
                        startY,
                        endX,
                        endY,
                        currentDirection
                    );

                    switch (swipeDirection) {
                        case MOVE_DIRECTIONS.UP:
                            setMoveDirection(MOVE_DIRECTIONS.UP);
                            break;
                        case MOVE_DIRECTIONS.DOWN:
                            setMoveDirection(MOVE_DIRECTIONS.DOWN);
                            break;
                        case MOVE_DIRECTIONS.LEFT:
                            setMoveDirection(MOVE_DIRECTIONS.LEFT);
                            break;
                        case MOVE_DIRECTIONS.RIGHT:
                            setMoveDirection(MOVE_DIRECTIONS.RIGHT);
                            break;
                        default:
                            break;
                    }
                };

                document.addEventListener("touchend", handleTouchEnd);

                return () => {
                    document.removeEventListener("touchend", handleTouchEnd);
                };
            }
        },
        [isPaused, currentDirection, setMoveDirection]
    );
}

const UseDoubleTapCallback = (isPaused, setGameControls) => {
    const lastTapTimeRef = useRef(0);

    return useCallback(() => {
        const now = Date.now();
        const timeSinceLastTap = now - lastTapTimeRef.current;

        if (timeSinceLastTap < 300) {
            setGameControls((prevState) => {
                return {
                    ...prevState,
                    isPaused: !isPaused,
                };
            });
        }

        lastTapTimeRef.current = now;
    }, [isPaused, setGameControls]);
};
