const { db } = require('../firebase/firestoreConnection.js'); // Adjust the path as necessary


async function getMostRecentGameNumber() {
    try {
        const gamesCollection = db.collection('games'); // Replace with your Firestore collection name

        const mostRecentGameSnapshot = await gamesCollection
            .orderBy('gameNumber', 'desc') // Assuming gameNumber is the field to sort by
            .limit(1)
            .get();

        if (!mostRecentGameSnapshot.empty) {
            const mostRecentGame = mostRecentGameSnapshot.docs[0].data();
            const gameNumber = mostRecentGame.gameNumber;

            // Display the game number in the HTML element with ID 'scoreboard'
            const scoreboardElement = document.getElementById('scoreboard');
            if (scoreboardElement) {
                scoreboardElement.textContent = `Game #${gameNumber}`;
            } else {
                console.error('Element with ID "scoreboard" not found in the DOM.');
            }
        } else {
            console.log('No games found in the collection.');
        }
    } catch (error) {
        console.error('Error fetching the most recent game:', error);
    }
}

export {getMostRecentGameNumber};