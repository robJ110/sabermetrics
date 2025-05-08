import { db,collection, addDoc } from "../firebase/firestoreConnection.js"; // Adjust the path if necessary
import { Game } from "../classes/gameClass.js"; // Adjust the path if necessary
import { generateNextGameNumber } from "../firebase/firebaseFunctions.js";

// Function to create a new game
async function createNewGame() {
        const gameId = await generateNextGameNumber();
        const newGame = new Game(gameId); // Assuming Game class initializes a new game object
        try {
            await newGame.init();
        }
        catch (error) {
            console.error("Error creating new game: ", error);
        }

    return newGame;
}

document.addEventListener("DOMContentLoaded", function() {
    createNewGame();  
});