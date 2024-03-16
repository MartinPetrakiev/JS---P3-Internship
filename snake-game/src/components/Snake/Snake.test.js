import { screen, fireEvent, render } from "@testing-library/react";
import Snake from "./Snake";
import {
    FoodProvider,
    GameControlsProvider,
    ObstacleProvider,
} from "../../ContextProviders";
import SnakeTail from "./SnakeTail";
import React, { useState as useStateMock } from "react";
import { INITIAL_SNAKE_DOTS } from "../../utils/constants";

const mockGameControls = {
    alive: false,
    startButtonName: "Play",
    score: 0,
    isPaused: true,
    gameLevel: 1,
    playerName: "",
    gameHistory: [],
};

jest.mock("react", () => ({
    ...jest.requireActual("react"),
    useState: jest.fn(),
}));

describe("Snake", () => {
    beforeEach(() => {
        useStateMock.mockImplementation(jest.requireActual("react").useState);
    });

    it("should render the snake with initial snake dots", () => {
        mockGameControls.alive = true;
        mockGameControls.isPaused = false;

        render(
            <GameControlsProvider initialValue={mockGameControls}>
                <svg>
                    <ObstacleProvider>
                        <FoodProvider>
                            <Snake />
                        </FoodProvider>
                    </ObstacleProvider>
                </svg>
            </GameControlsProvider>
        );

        const snakeHead = screen.getByTestId("snake-head");
        const snakeTail = screen.getByTestId("snake-tail");

        const snakeDots = screen.getAllByRole("snake-dot");

        expect(snakeHead).toBeInTheDocument();
        expect(snakeTail).toBeInTheDocument();
        expect(snakeDots.length).toBe(INITIAL_SNAKE_DOTS.length);
    });

    it('should set moveDirection to "DOWN" on Down arrow key press', () => {
        render(
            <GameControlsProvider initialValue={mockGameControls}>
                <svg>
                    <ObstacleProvider>
                        <FoodProvider>
                            <Snake />
                        </FoodProvider>
                    </ObstacleProvider>
                </svg>
            </GameControlsProvider>
        );

        const snakeHeadElement = screen.getByTestId("snake-head");

        fireEvent.keyDown(document, {
            key: "ArrowDown",
            code: "ArrowDown",
            keyCode: 40,
        });

        expect(snakeHeadElement.getAttribute("data-move-direction")).toBe(
            "DOWN"
        );
    });

    it('should NOT set moveDirection if oposite direction key press', () => {
        render(
            <GameControlsProvider initialValue={mockGameControls}>
                <svg>
                    <ObstacleProvider>
                        <FoodProvider>
                            <Snake />
                        </FoodProvider>
                    </ObstacleProvider>
                </svg>
            </GameControlsProvider>
        );

        const snakeHeadElement = screen.getByTestId("snake-head");

        fireEvent.keyDown(document, {
            key: "ArrowLeft",
            code: "ArrowLeft",
            keyCode: 37,
        });

        expect(snakeHeadElement.getAttribute("data-move-direction")).toBe(
            "RIGHT"
        );
    });

    it('should render a polygon element with class "snake-item snake-tail"', () => {
        render(
            <svg>
                <SnakeTail snakeDot={[]} snakeDotAdjacent={[]} />
            </svg>
        );
        const polygonElement = screen.getByTestId("snake-tail");
        expect(polygonElement).toBeInTheDocument();
        expect(polygonElement).toHaveClass("snake-item snake-tail");
    });
});
