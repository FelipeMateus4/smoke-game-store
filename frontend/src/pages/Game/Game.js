// pages/Game.js
import React, { useEffect, useState } from "react";
import axios from "axios";

const Game = () => {
    const [gameData, setGameData] = useState(null);

    useEffect(() => {
        const fetchGameData = async () => {
            try {
                const response = await axios.get("http://localhost:5000/game", {
                    withCredentials: true,
                });
                setGameData(response.data);
            } catch (error) {
                console.error("Failed to fetch game data:", error);
            }
        };

        fetchGameData();
    }, []);

    return (
        <div>
            <h1>Game Data</h1>
            {gameData ? <pre>{JSON.stringify(gameData, null, 2)}</pre> : <p>Loading...</p>}
        </div>
    );
};

export default Game;
