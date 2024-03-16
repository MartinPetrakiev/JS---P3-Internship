import React from "react";

const GameControlsContext = React.createContext();
const FoodContext = React.createContext();
const ObstacleContext = React.createContext();

export const FoodProvider = ({ children, initialFoodDots }) => {
    const [foodDots, setFoodDots] = React.useState(initialFoodDots);

    return (
        <FoodContext.Provider
            value={{ foodDots, setFoodDots }}
        >
            {children}
        </FoodContext.Provider>
    );
};

export const useFoodContext = () => React.useContext(FoodContext);

export const ObstacleProvider = ({children, initialObstacles}) => {
    const [obstacles, setObstacles] = React.useState(initialObstacles);

    return (
        <ObstacleContext.Provider value={{obstacles, setObstacles}}>
            {children}
        </ObstacleContext.Provider>
    )
}

export const useObstacleContext = () => React.useContext(ObstacleContext);

export const GameControlsProvider = ({ children, initialValue }) => {
    const [gameControls, setGameControls] = React.useState(initialValue);

    return (
        <GameControlsContext.Provider value={{ gameControls, setGameControls }}>
            {children}
        </GameControlsContext.Provider>
    );
};

export const useGameControls = () => React.useContext(GameControlsContext);