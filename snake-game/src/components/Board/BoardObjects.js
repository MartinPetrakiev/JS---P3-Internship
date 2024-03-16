import React from "react";
import Snake from "../Snake/Snake";
import FoodDots from "../Food/FoodDots";
import ObstacleDots from "../Obstacles/ObstacleDots";
import { useGameControls } from "../../ContextProviders";

function BoardObjects() {
    const { gameControls } = useGameControls();

    return (
        <g>
            <FoodDots />
            <Snake />
            {gameControls.gameLevel > 1 && <ObstacleDots />}
        </g>
    );
}

export default React.memo(BoardObjects);
