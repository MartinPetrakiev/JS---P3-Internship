import { render, screen } from "@testing-library/react";
import ObstacleDots from "./ObstacleDots";
import {
    FoodProvider,
    GameControlsProvider,
    ObstacleProvider,
} from "../../ContextProviders";
import React from "react";

const mockGameControls = {
    alive: false,
    startButtonName: "Play",
    score: 0,
    isPaused: false,
    gameLevel: 3,
    playerName: "",
    gameHistory: [],
};

const foodDots = [
    { key: "1", x: 1, y: 2, disco: false, alcohol: false },
    { key: "2", x: 3, y: 4, disco: true, alcohol: false },
];

describe("ObstacleDots", () => {
    it("should render correct number of obstacles based on game level", () => {
        mockGameControls.gameLevel = 2

        render(
            <GameControlsProvider initialValue={mockGameControls}>
                <ObstacleProvider initialObstacles={[]}>
                    <FoodProvider initialFoodDots={foodDots}>
                        <ObstacleDots />
                    </FoodProvider>
                </ObstacleProvider>
            </GameControlsProvider>
        );

        const obstacleRegex = /obstacle-\d+-\d+/i;
        const obstacleElement = screen.queryAllByTestId(obstacleRegex)

        expect(obstacleElement.length).toBe(4);
    });

    it("should handle game level 1 correctly", () => {
        mockGameControls.gameLevel = 1

        render(
            <GameControlsProvider initialValue={mockGameControls}>
                <ObstacleProvider initialObstacles={[]}>
                    <FoodProvider initialFoodDots={foodDots}>
                        <ObstacleDots />
                    </FoodProvider>
                </ObstacleProvider>
            </GameControlsProvider>
        );

        const obstacleRegex = /obstacle-\d+-\d+/i;
        const obstacleElement = screen.queryAllByTestId(obstacleRegex)

        expect(obstacleElement.length).toBe(0);
    });

    it("should render 9 + game lavel number of obstacles when game level > 2", () => {
        mockGameControls.gameLevel = 5

        render(
            <GameControlsProvider initialValue={mockGameControls}>
                <ObstacleProvider initialObstacles={[]}>
                    <FoodProvider initialFoodDots={foodDots}>
                        <ObstacleDots />
                    </FoodProvider>
                </ObstacleProvider>
            </GameControlsProvider>
        );

        const obstacleRegex = /obstacle-\d+-\d+/i;
        const obstacleElement = screen.queryAllByTestId(obstacleRegex)

        expect(obstacleElement.length).toBe(13);
    });

    it("should update obstacles when game level changes", () => {
        const foodDots = [
            { key: "1", x: 1, y: 2, disco: false, alcohol: false },
            { key: "2", x: 3, y: 4, disco: true, alcohol: false },
        ];
        const obstacles = [
            [1, 2],
            [3, 4],
        ];
        const setObstacles = jest.fn();
        const gameControls = { gameLevel: 2 };
        const useFoodContextMock = jest.fn().mockReturnValue({ foodDots });
        const useObstacleContextMock = jest
            .fn()
            .mockReturnValue({ obstacles, setObstacles });
        const useGameControlsMock = jest.fn().mockReturnValue({ gameControls });
        jest.spyOn(React, "useContext")
            .mockImplementationOnce(useFoodContextMock)
            .mockImplementationOnce(useObstacleContextMock)
            .mockImplementationOnce(useGameControlsMock);

        render(
            <GameControlsProvider initialValue={mockGameControls}>
                <ObstacleProvider>
                    <FoodProvider>
                        <ObstacleDots />
                    </FoodProvider>
                </ObstacleProvider>
            </GameControlsProvider>
        );

        expect(useFoodContextMock).toHaveBeenCalled();
        expect(useObstacleContextMock).toHaveBeenCalled();
        expect(useGameControlsMock).toHaveBeenCalled();
        expect(setObstacles).toHaveBeenCalledWith(expect.any(Array));
    });
});
