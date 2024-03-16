import { cleanup, render, screen } from "@testing-library/react";

import {
    FoodProvider,
    GameControlsProvider,
    ObstacleProvider,
} from "../../ContextProviders";
import React, { useState as useStateMock } from "react";
import FoodDots from "./FoodDots";

jest.mock("react", () => ({
    ...jest.requireActual("react"),
    useState: jest.fn(),
}));

describe("FoodDots", () => {
    const mockSetFoodDots = jest.fn();

    beforeEach(() => {
        jest.resetModules();
        jest.useFakeTimers();
        useStateMock.mockImplementation((init) => [init, mockSetFoodDots]);
    });

    afterEach(() => {
        jest.runOnlyPendingTimers();
        jest.useRealTimers();
        cleanup();
    });

    it("should not render any food items when foodDots state is empty", () => {
        const foodDots = [];
        const obstacles = [];
        const gameControls = { isPaused: false, gameLevel: 1 };
        const useEffect = jest.spyOn(React, "useEffect");

        render(
            <GameControlsProvider initialValue={gameControls}>
                <svg>
                    <ObstacleProvider initialObstacles={obstacles}>
                        <FoodProvider initialFoodDots={foodDots}>
                            <FoodDots />
                        </FoodProvider>
                    </ObstacleProvider>
                </svg>
            </GameControlsProvider>
        );

        expect(useEffect).toHaveBeenCalledTimes(2);
        expect(useEffect).toHaveBeenCalledWith(expect.any(Function), [
            false,
            1,
            mockSetFoodDots,
            0,
            [],
        ]);
        expect(useEffect).toHaveBeenCalledWith(expect.any(Function), [
            false,
            0,
            mockSetFoodDots,
        ]);

        const foodComponents = screen.queryAllByTestId(/food-\d+-\d+/);

        expect(foodComponents).toHaveLength(0);
    });

    it("should generate new food dots based on game level and obstacles", () => {
        const foodDots = [
            { key: "1", x: 1, y: 2, disco: false, alcohol: false },
            { key: "2", x: 3, y: 4, disco: true, alcohol: false },
        ];
        const obstacles = [];
        const gameControls = { isPaused: false, gameLevel: 1 };
        const useEffect = jest.spyOn(React, "useEffect");

        render(
            <GameControlsProvider initialValue={gameControls}>
                <svg>
                    <ObstacleProvider initialObstacles={obstacles}>
                        <FoodProvider initialFoodDots={foodDots}>
                            <FoodDots />
                        </FoodProvider>
                    </ObstacleProvider>
                </svg>
            </GameControlsProvider>
        );

        expect(useEffect).toHaveBeenCalledTimes(2);
        expect(useEffect).toHaveBeenCalledWith(expect.any(Function), [
            false,
            1,
            mockSetFoodDots,
            2,
            [],
        ]);
        expect(useEffect).toHaveBeenCalledWith(expect.any(Function), [
            false,
            2,
            mockSetFoodDots,
        ]);

        const foodComponents = screen.queryAllByTestId(/food-\d+-\d+/);

        expect(foodComponents).toHaveLength(2);
    });

    it("should not generate new food dots when game is paused", () => {
        const obstacles = [];
        const gameControls = { isPaused: true, gameLevel: 1 };
        const useEffect = jest.spyOn(React, "useEffect");
        const clearTimeout = jest.spyOn(global, "clearTimeout");

        render(
            <GameControlsProvider initialValue={gameControls}>
                <svg>
                    <ObstacleProvider initialObstacles={obstacles}>
                        <FoodProvider initialFoodDots={[]}>
                            <FoodDots />
                        </FoodProvider>
                    </ObstacleProvider>
                </svg>
            </GameControlsProvider>
        );

        expect(useEffect).toHaveBeenCalledTimes(2);
        expect(useEffect).toHaveBeenCalledWith(expect.any(Function), [
            true,
            1,
            mockSetFoodDots,
            0,
            [],
        ]);
        expect(useEffect).toHaveBeenCalledWith(expect.any(Function), [
            true,
            0,
            mockSetFoodDots,
        ]);
        expect(clearTimeout).not.toHaveBeenCalled();
    });

    it("should render food items when foodDots state is not empty", () => {
        jest.mock("./Food", () => ({
            __esModule: true,
            default: jest.requireActual("./Food").default,
        }));

        const foodDots = [
            { key: "1", x: 1, y: 2, disco: false, alcohol: false },
            { key: "2", x: 3, y: 4, disco: true, alcohol: false },
        ];
        const obstacles = [];
        const gameControls = { isPaused: false, gameLevel: 1 };

        render(
            <GameControlsProvider initialValue={gameControls}>
                <svg>
                    <ObstacleProvider initialObstacles={obstacles}>
                        <FoodProvider initialFoodDots={foodDots}>
                            <FoodDots />
                        </FoodProvider>
                    </ObstacleProvider>
                </svg>
            </GameControlsProvider>
        );

        expect(screen.getByTestId("food-1-2")).toBeInTheDocument();
        expect(screen.getByTestId("food-1-2")).toHaveAttribute("data-x", "1");
        expect(screen.getByTestId("food-1-2")).toHaveAttribute("data-y", "2");
        expect(screen.getByTestId("food-1-2")).toHaveAttribute(
            "data-disco",
            "false"
        );
        expect(screen.getByTestId("food-1-2")).toHaveAttribute(
            "data-alcohol",
            "false"
        );

        expect(screen.getByTestId("food-3-4")).toBeInTheDocument();
        expect(screen.getByTestId("food-3-4")).toHaveAttribute("data-x", "3");
        expect(screen.getByTestId("food-3-4")).toHaveAttribute("data-y", "4");
        expect(screen.getByTestId("food-3-4")).toHaveAttribute(
            "data-disco",
            "true"
        );
        expect(screen.getByTestId("food-3-4")).toHaveAttribute(
            "data-alcohol",
            "false"
        );
    });
});
