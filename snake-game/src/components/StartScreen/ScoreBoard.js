import React, { useState } from "react";
import { clearGameHistory } from "../../utils/gameLogic";

function ScoreBoard({ gameHistory, score, setGameControls}) {
    const [sortBy, setSortBy] = useState(null);
    const [sortOrder, setSortOrder] = useState("asc");

    const handleSort = (key) => {
        if (sortBy === key) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortBy(key);
            setSortOrder("asc");
        }
    };

    const sortedGameHistory = gameHistory.slice().sort((a, b) => {
        if (sortBy === "score") {
            return sortOrder === "asc" ? a.score - b.score : b.score - a.score;
        } else if (sortBy === "timestamp") {
            return sortOrder === "asc"
                ? Date.parse(a.timestamp) - Date.parse(b.timestamp)
                : Date.parse(b.timestamp) - Date.parse(a.timestamp);
        } else if (sortBy === "player") {
            return sortOrder === "asc"
                ? a.playerName.localeCompare(b.playerName)
                : b.playerName.localeCompare(a.playerName);
        }
        return 0;
    });

    return (
        <>
            <span className="content">Your points: {score}</span>
            <div className="game-history">
                {gameHistory.length > 0 && (
                    <table>
                        <thead>
                            <tr>
                                <th onClick={() => handleSort("player")}>
                                    Player
                                </th>
                                <th onClick={() => handleSort("score")}>
                                    Score
                                </th>
                                <th onClick={() => handleSort("timestamp")}>
                                    Timestamp
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedGameHistory.map((eachGame, index) => (
                                <tr key={index}>
                                    <td>{eachGame.playerName}</td>
                                    <td>{eachGame.score}</td>
                                    <td>
                                        {new Date(
                                            eachGame.timestamp
                                        ).toLocaleString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
            <button className="button" onClick={() => clearGameHistory(setGameControls)}>
                Clear Scoreboard
            </button>
        </>
    );
}

export default ScoreBoard;
