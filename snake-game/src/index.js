import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { GameControlsProvider } from "./ContextProviders";
import { GAME_HISOTRY, PLAY_BUTTON_TEXT } from "./utils/constants";

const initialHistory = JSON.parse(localStorage.getItem(GAME_HISOTRY)) || [];
const initialGameControlValues = {
    alive: false,
    startButtonName: PLAY_BUTTON_TEXT,
    score: 0,
    isPaused: true,
    gameLevel: 1,
    playerName: "",
    gameHistory: initialHistory,
    discoMode: false,
    discoSpinOn: false
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <GameControlsProvider
            initialValue={initialGameControlValues}
        >
            <App />
        </GameControlsProvider>
    </React.StrictMode>
);
