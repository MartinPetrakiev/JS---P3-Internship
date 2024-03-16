import React from "react";
import { render, screen } from "@testing-library/react";
import { GameControlsProvider } from "./ContextProviders";
import App from "./App";

const mockContextValue = {
    alive: false,
    startButtonName: "Play",
    score: 0,
    isPaused: true,
    gameLevel: 1,
    playerName: "",
    gameHistory: [],
};

test("renders start screen when game is not alive", () => {
    render(
        <GameControlsProvider initialValue={mockContextValue}>
            <App />
        </GameControlsProvider>
    );

    expect(screen.getByText("Snake Game")).toBeInTheDocument();
    expect(screen.getByText("Play")).toBeInTheDocument();
});

test("should render GameBoard component if gameControls.alive is true", () => {
    mockContextValue.alive = true;

    render(
        <GameControlsProvider initialValue={mockContextValue}>
            <App />
        </GameControlsProvider>
    );

    expect(screen.getByTestId("score")).toBeInTheDocument();
});

it("should render GameStartScreen component if gameControls.alive is false", () => {
    mockContextValue.alive = false

    render(
        <GameControlsProvider initialValue={mockContextValue}>
            <App />
        </GameControlsProvider>
    );
    expect(screen.getByPlaceholderText("Player name")).toBeInTheDocument();
});

it("should have empty gameHistory in GameStartScreen component", () => {
    mockContextValue.alive = false
    mockContextValue.gameHistory = []

    render(
        <GameControlsProvider initialValue={mockContextValue}>
            <App />
        </GameControlsProvider>
    );
    expect(screen.queryByTestId("score-board")).not.toBeInTheDocument();
});

it("should have empty playerName in GameStartScreen component", () => {
    mockContextValue.alive = false

    render(
        <GameControlsProvider initialValue={mockContextValue}>
            <App />
        </GameControlsProvider>
    );
    expect(screen.getByPlaceholderText("Player name")).toHaveValue("");
});

it("should have gameControls.alive as false and playerName as empty string in App component", () => {
    mockContextValue.alive = false

    render(
        <GameControlsProvider initialValue={mockContextValue}>
            <App />
        </GameControlsProvider>
    );
    expect(screen.getByPlaceholderText("Player name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Player name")).toHaveValue("");
});
