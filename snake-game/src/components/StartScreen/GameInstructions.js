import React from "react";

function GameInstructions() {
    return (
        <div className="instructions">
            Start the game by pressing the "Play" button. To move the snake use
            the arrow keys on your keayboard
            <span className="key-symbol">↑</span>{" "}
            <span className="key-symbol">↓</span>{" "}
            <span className="key-symbol">→</span>{" "}
            <span className="key-symbol">←</span>. You can pause the game at any
            time by pressing <span className="key-symbol">space</span> key.
            <br /><br />
            If using a mobile device - Move the snake by swiping in direction
            desired to move. Pause the game by double tapping the screen.
        </div>
    );
}

export default GameInstructions;
