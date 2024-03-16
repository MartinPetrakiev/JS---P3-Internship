import { useEffect, useRef } from "react";
import { checkSnakeOverlap } from "../utils/gameLogic";
import { GAME_OBJECT_TYPES } from "../utils/constants";
import { generateFoodDots, generateObstacles } from "../utils/utils";

export function useHandleOverlappingObjects(
    isPaused,
    gameLevel,
    setFoodDots,
    setObstacles,
    snakeDots,
    foodDots,
    obstacles
  ) {
    const snakeDotsRef = useRef(snakeDots);
    const foodDotsRef = useRef(foodDots);
    const obstaclesRef = useRef(obstacles);

    useEffect(() => {
        snakeDotsRef.current = snakeDots;
        foodDotsRef.current = foodDots;
        obstaclesRef.current = obstacles;
    }, [snakeDots, foodDots, obstacles]);

    useEffect(() => {
      if (!isPaused) {
        let overlappingObject = null;
  
        do {
          overlappingObject = checkSnakeOverlap(
            snakeDotsRef.current,
            foodDotsRef.current,
            obstaclesRef.current
          );
  
          if (overlappingObject) {
            switch (overlappingObject) {
              case GAME_OBJECT_TYPES.OBSTACLE:
                generateObstacles(gameLevel, foodDotsRef.current, setObstacles);
                break;
              case GAME_OBJECT_TYPES.FOOD:
                generateFoodDots(isPaused, setFoodDots, obstaclesRef.current);
                break;
              default:
                break;
            }
          }
  
          overlappingObject = null;
        } while (overlappingObject !== null);
      }
    }, [isPaused, gameLevel, setFoodDots, setObstacles]);
  }
  