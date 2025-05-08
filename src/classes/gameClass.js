import {db, setDoc, doc,updateDoc} from '../firebase/firestoreConnection.js';

class Game {
    constructor(gameId) {
        this.gameId = "game"+gameId; // 'games' is the Firestore collection name
        this.t1Score = 0;
        this.t2Score = 0;

        this.t1BeerPass = true;
        this.t2BeerPass = true;


        this.t1p1PlayerId = "";
        this.t1p2PlayerId = "";
        this.t2p1PlayerId = "";
        this.t2p2PlayerId = "";

        this.t1p1Score = 0;
        this.t1p2Score = 0;
        this.t2p1Score = 0;
        this.t2p2Score = 0;

        this.t1p1GayUsed = false;
        this.t1p2GayUsed = false;
        this.t2p1GayUsed = false;
        this.t2p2GayUsed = false;
    }

    async init () {
        await setDoc(doc(db,'games',this.gameId), {
            t1Score: this.t1Score,
            t2Score: this.t2Score,
            t1BeerPass: this.t1BeerPass,
            t2BeerPass: this.t2BeerPass,
            t1p1PlayerId: this.t1p1PlayerId,
            t1p2PlayerId: this.t1p2PlayerId,
            t2p1PlayerId: this.t2p1PlayerId,
            t2p2PlayerId: this.t2p2PlayerId,
            t1p1Score: this.t1p1Score,
            t1p2Score: this.t1p2Score,
            t2p1Score: this.t2p1Score,
            t2p2Score: this.t2p2Score,
            t1p1GayUsed: this.t1p1GayUsed,
            t1p2GayUsed: this.t1p2GayUsed,
            t2p1GayUsed: this.t2p1GayUsed,
            t2p2GayUsed: this.t2p2GayUsed, 
        })
        .then(() => {
            //console.log("Game document created successfully in Firestore");
        })
        .catch((error) => {
            console.error("Error creating game document: ", error);
        });
    }

    // Method to update the game in Firestore
    async updateGameInFirestore() { 
        const gameRef = doc(db, 'games', this.gameId); 

        const gameData = {
            t1Score: this.t1Score,
            t2Score: this.t2Score,
            t1BeerPass: this.t1BeerPass,
            t2BeerPass: this.t2BeerPass,
            t1p1PlayerId: this.t1p1PlayerId,
            t1p2PlayerId: this.t1p2PlayerId,
            t2p1PlayerId: this.t2p1PlayerId,
            t2p2PlayerId: this.t2p2PlayerId,
            t1p1Score: this.t1p1Score,
            t1p2Score: this.t1p2Score,
            t2p1Score: this.t2p1Score,
            t2p2Score: this.t2p2Score,
            t1p1GayUsed: this.t1p1GayUsed,
            t1p2GayUsed: this.t1p2GayUsed,
            t2p1GayUsed: this.t2p1GayUsed,
            t2p2GayUsed: this.t2p2GayUsed,
        };

        try {
            await updateDoc(gameRef,gameData);
            console.log('Game updated successfully in Firestore');
        } catch (error) {
            console.error('Error updating game in Firestore:', error);
        }
    }


    async grabGameFromDatabase(gameId) {
        const gameRef = db.collection('games').doc(gameId);

        try {
            const doc = await gameRef.get();
            if (doc.exists) {
            const data = doc.data();
            this.gameId = gameIdl;
            this.t1Score = data.t1Score || 0;
            this.t2Score = data.t2Score || 0;
            this.t1BeerPass = data.t1BeerPass || true;
            this.t2BeerPass = data.t2BeerPass || true;
            this.t1p1PlayerId = data.t1p1PlayerId || "";
            this.t1p2PlayerId = data.t1p2PlayerId || "";
            this.t2p1PlayerId = data.t2p1PlayerId || "";
            this.t2p2PlayerId = data.t2p2PlayerId || "";
            this.t1p1Score = data.t1p1Score || 0;
            this.t1p2Score = data.t1p2Score || 0;
            this.t2p1Score = data.t2p1Score || 0;
            this.t2p2Score = data.t2p2Score || 0;
            this.t1p1GayUsed = data.t1p1GayUsed || false;
            this.t1p2GayUsed = data.t1p2GayUsed || false;
            this.t2p1GayUsed = data.t2p1GayUsed || false;
            this.t2p2GayUsed = data.t2p2GayUsed || false;
            console.log('Game data successfully loaded from Firestore');
            } else {
            console.error('No such game found in Firestore');
            }
        } catch (error) {
            console.error('Error fetching game from Firestore:', error);
        }
    }



    // Getters and Setters for each variable
    get gameId() {
        return this._gameId;
    }
    set gameId(value) {
        this._gameId = value;
    }

    get t1Score() {
        return this._t1Score;
    }
    set t1Score(value) {
        this._t1Score = value;
    }

    get t2Score() {
        return this._t2Score;
    }
    set t2Score(value) {
        this._t2Score = value;
    }

    get t1BeerPass() {
        return this._t1BeerPass;
    }
    set t1BeerPass(value) {
        this._t1BeerPass = value;
    }

    get t2BeerPass() {
        return this._t2BeerPass;
    }
    set t2BeerPass(value) {
        this._t2BeerPass = value;
    }

    get t1p1PlayerId() {
        return this._t1p1PlayerId;
    }
    set t1p1PlayerId(value) {
        this._t1p1PlayerId = value;
    }

    get t1p2PlayerId() {
        return this._t1p2PlayerId;
    }
    set t1p2PlayerId(value) {
        this._t1p2PlayerId = value;
    }

    get t2p1PlayerId() {
        return this._t2p1PlayerId;
    }
    set t2p1PlayerId(value) {
        this._t2p1PlayerId = value;
    }

    get t2p2PlayerId() {
        return this._t2p2PlayerId;
    }
    set t2p2PlayerId(value) {
        this._t2p2PlayerId = value;
    }

    get t1p1Score() {
        return this._t1p1Score;
    }
    set t1p1Score(value) {
        this._t1p1Score = value;
    }

    get t1p2Score() {
        return this._t1p2Score;
    }
    set t1p2Score(value) {
        this._t1p2Score = value;
    }

    get t2p1Score() {
        return this._t2p1Score;
    }
    set t2p1Score(value) {
        this._t2p1Score = value;
    }

    get t2p2Score() {
        return this._t2p2Score;
    }
    set t2p2Score(value) {
        this._t2p2Score = value;
    }

    get t1p1GayUsed() {
        return this._t1p1GayUsed;
    }
    set t1p1GayUsed(value) {
        this._t1p1GayUsed = value;
    }

    get t1p2GayUsed() {
        return this._t1p2GayUsed;
    }
    set t1p2GayUsed(value) {
        this._t1p2GayUsed = value;
    }

    get t2p1GayUsed() {
        return this._t2p1GayUsed;
    }
    set t2p1GayUsed(value) {
        this._t2p1GayUsed = value;
    }

    get t2p2GayUsed() {
        return this._t2p2GayUsed;
    }
    set t2p2GayUsed(value) {
        this._t2p2GayUsed = value;
    }

}


// Function to update a specific property in Firestore
async function updateGamePropertyInFirestore(gameId, property, value) {
    //console.log(`Updating property '${property}' to '${value}' for game ID: ${gameId}`);
    
    const gameRef = doc(db, 'games', gameId);
    const updateData = {};
    updateData[property] = value;

    try {
        await updateDoc(gameRef, updateData);
        //console.log(`Property '${property}' updated successfully in Firestore`);
    } catch (error) {
        console.error(`Error updating property '${property}' in Firestore:`, error);
    }
}

// Example functions for each property
async function updateT1Score(gameId, value) {
    await updateGamePropertyInFirestore(gameId, 't1Score', value);
}

async function updateT2Score(gameId, value) {
    await updateGamePropertyInFirestore(gameId, 't2Score', value);
}

async function updateT1BeerPass(gameId, value) {
    await updateGamePropertyInFirestore(gameId, 't1BeerPass', value);
}

async function updateT2BeerPass(gameId, value) {
    await updateGamePropertyInFirestore(gameId, 't2BeerPass', value);
}

async function updateT1P1PlayerId(gameId, value) {
    await updateGamePropertyInFirestore(gameId, 't1p1PlayerId', value);
}

async function updateT1P2PlayerId(gameId, value) {
    await updateGamePropertyInFirestore(gameId, 't1p2PlayerId', value);
}

async function updateT2P1PlayerId(gameId, value) {
    await updateGamePropertyInFirestore(gameId, 't2p1PlayerId', value);
}

async function updateT2P2PlayerId(gameId, value) {
    await updateGamePropertyInFirestore(gameId, 't2p2PlayerId', value);
}

async function updateT1P1Score(gameId, value) {
    await updateGamePropertyInFirestore(gameId, 't1p1Score', value);
}

async function updateT1P2Score(gameId, value) {
    await updateGamePropertyInFirestore(gameId, 't1p2Score', value);
}

async function updateT2P1Score(gameId, value) {
    await updateGamePropertyInFirestore(gameId, 't2p1Score', value);
}

async function updateT2P2Score(gameId, value) {
    await updateGamePropertyInFirestore(gameId, 't2p2Score', value);
}

async function updateT1P1GayUsed(gameId, value) {
    await updateGamePropertyInFirestore(gameId, 't1p1GayUsed', value);
}

async function updateT1P2GayUsed(gameId, value) {
    await updateGamePropertyInFirestore(gameId, 't1p2GayUsed', value);
}

async function updateT2P1GayUsed(gameId, value) {
    await updateGamePropertyInFirestore(gameId, 't2p1GayUsed', value);
}

async function updateT2P2GayUsed(gameId, value) {
    await updateGamePropertyInFirestore(gameId, 't2p2GayUsed', value);
}

export {Game};
export {
    updateT1Score,
    updateT2Score,
    updateT1BeerPass,
    updateT2BeerPass,
    updateT1P1PlayerId,
    updateT1P2PlayerId,
    updateT2P1PlayerId,
    updateT2P2PlayerId,
    updateT1P1Score,
    updateT1P2Score,
    updateT2P1Score,
    updateT2P2Score,
    updateT1P1GayUsed,
    updateT1P2GayUsed,
    updateT2P1GayUsed,
    updateT2P2GayUsed
};