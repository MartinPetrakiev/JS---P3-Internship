import React from "react";
import BoardObjects from "./BoardObjects";
import {
    FoodProvider,
    ObstacleProvider,
    useGameControls,
} from "../../ContextProviders";
import { v4 as uuidv4 } from "uuid";

function GameBoard() {
    const { gameControls } = useGameControls();
    const initialFoodDots = [{ key: uuidv4(), x: 10, y: 10, disco: false }];

    return (
        <div>
            <div className="box">
                <span
                    className={
                        gameControls.discoMode
                            ? "content white-text"
                            : "content"
                    }
                    data-testid="game-level"
                >
                    Level {gameControls.gameLevel}
                </span>
                <span
                    className={
                        gameControls.discoMode
                            ? "content white-text"
                            : "content"
                    }
                    data-testid="score"
                >
                    Score: {gameControls.score}
                </span>
            </div>
            <div
                className={
                    gameControls.discoSpinOn
                        ? "game-board-container disco-spin"
                        : "game-board-container"
                }
            >
                <svg className="game-board" viewBox="0 0 640 640">
                    <ObstacleProvider initialObstacles={[]}>
                        <FoodProvider initialFoodDots={initialFoodDots}>
                            <BoardObjects />
                        </FoodProvider>
                    </ObstacleProvider>
                </svg>
            </div>
        </div>
    );
}

export default GameBoard;
