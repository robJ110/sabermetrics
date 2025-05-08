import { updatePlayerShot,undoPlayerShot } from "../firebase/firebaseFunctions.js";

const makeShotBtn = document.getElementById('makeShot');
const missedShotBtn = document.getElementById('missShot');
const undoShotBtn = document.getElementById('undoShot');
const currPlayer = document.getElementById('player-select');
let previousShotMade = false;
let shotgunCount = 0;

// ---- MAKE SHOT ---- //
makeShotBtn.addEventListener('click', function() {
    const playerSelect = document.getElementById('player-select');
    const options = Array.from(playerSelect.options);
    const currentIndex = options.findIndex(option => option.value === currPlayer.value);

    // Update the database with the made shot
    let selectedPlayerName = options[currentIndex].text
    selectedPlayerName = selectedPlayerName.replace(/\s+/g, "");
    updatePlayerShot(selectedPlayerName,previousShotMade,true).then((percentage) => {
        const elemId = options[currentIndex].value + '-percentage';
        document.getElementById(elemId).textContent = percentage;
    });

    // Update the stack
    stack.push(`${selectedPlayerName},1,${previousShotMade}`);

    // Update the shot decteor for potential point
    previousShotMade = true;

    let isShotgun = false;
    // Reset scoring
    shotgunCount++;
    if (shotgunCount == 4) {
        previousShotMade = false;
        shotgunCount = 0;
        isShotgun = true;
    }

    // Go to the next player
    const nextIndex = (currentIndex + 1) % options.length;
    playerSelect.selectedIndex = nextIndex;

// Select random number
const number = Math.floor(Math.random() * 13) + 1
console.log("Random number: " + number);
// Display gif
showGif(number);

  
});


// ---- MISSED SHOT ---- //
missedShotBtn.addEventListener('click', function() {
    const playerSelect = document.getElementById('player-select');
    const options = Array.from(playerSelect.options);
    const currentIndex = options.findIndex(option => option.value === currPlayer.value);
    const nextPlayerIndex = (currentIndex + 1) % options.length;
    const lastPlayerIndex = (currentIndex + 3) % options.length;

    // Give the player a point if they made the shot
    if (previousShotMade) {
        const playerScore = document.getElementById(options[lastPlayerIndex].value + '-score');
        playerScore.textContent = parseInt(playerScore.textContent) + 1;
    }

    // The other team gets a point
    if (previousShotMade) {
        let winningTeam; 

        console.log(lastPlayerIndex + ' ' + options[lastPlayerIndex].value);
        if (options[lastPlayerIndex].value.includes('team1')) {
            winningTeam = '1';
        } else {
            winningTeam = '2';
        }

        if(winningTeam === '1') {
            // Update Team 1 points
            const team1Points = document.getElementById('team1-total-score');
            team1Points.textContent = parseInt(team1Points.textContent) + 1;
        }
        else {
            // Update Team 2 points
            const team2Points = document.getElementById('team2-total-score');
            team2Points.textContent = parseInt(team2Points.textContent) + 1;
        }
    }



    // Update player data
    let selectedPlayerName = options[currentIndex].text
    selectedPlayerName = selectedPlayerName.replace(/\s+/g, "");
    updatePlayerShot(selectedPlayerName,previousShotMade,false).then((percentage) => {
        console.log("Player percentage: ", percentage);
        const elemId = options[currentIndex].value + '-percentage';
        document.getElementById(elemId).textContent = percentage;
    });

// Update the stack
stack.push(`${selectedPlayerName},0,${previousShotMade}`);

// Go to next player
playerSelect.selectedIndex = nextPlayerIndex;
// Update the shot decteor for potential point
previousShotMade = false;

});


// ---- UNDO SHOT ---- //
undoShotBtn.addEventListener('click', function() {
    const playerSelect = document.getElementById('player-select');
    const options = Array.from(playerSelect.options);
    const currentIndex = options.findIndex(option => option.value === currPlayer.value);
    const lastPlayerIndex = (currentIndex + 3) % options.length;
    const lastlastPlayerIndex = (currentIndex + 2) % options.length;


    if (stack.length === 0) {
        console.log("No actions to undo.");
        return;
    }

    const lastAction = stack.pop();
    const [playerName, shotMade,isRebuttal] = lastAction.split(',');

    console.log(`Undoing action for player: ${playerName}, Shot made: ${shotMade}, Is rebuttal: ${isRebuttal}`);
    
    // Reverse the last action in Firestore
    undoPlayerShot(playerName, shotMade, isRebuttal).then((percentage) => {
        const playerElemId = `${options[lastPlayerIndex].value}-percentage`;
        document.getElementById(playerElemId).textContent = percentage;


        // Check if the scores need to be updated
        if (isRebuttal === 'true') {
            if (shotMade === '0') {
                const playerScore = document.getElementById(options[lastlastPlayerIndex].value + '-score');
                playerScore.textContent = parseInt(playerScore.textContent) - 1;

                let team = options[lastlastPlayerIndex].value.split('-')[0];
                team = `${team}-total-score`;
                console.log(`undoing this team's score: ${team}`);
                const teamScore = document.getElementById(team);
                teamScore.textContent = parseInt(teamScore.textContent) - 1;    
            }


        }


    });

    // Go to last player
    playerSelect.selectedIndex = lastPlayerIndex;
});


async function showGif(number) {
    const gif = document.getElementById('gif'+number);
    gif.id = 'gifActive';


    console.log("Showing gif: " + number);
    return new Promise((resolve) => {
        setTimeout(() => {
            gif.id = 'gif'+number;
            resolve();
        }, 5000); // 5 seconds
    });

}