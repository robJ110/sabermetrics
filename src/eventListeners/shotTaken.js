const makeShotBtn = document.getElementById('makeShot');
const missedShotBtn = document.getElementById('missShot');
const currPlayer = document.getElementById('player-select');
let previousShotMade = false;

// ---- MAKE SHOT ---- //
makeShotBtn.addEventListener('click', function() {
    const playerSelect = document.getElementById('player-select');
    const options = Array.from(playerSelect.options);
    const currentIndex = options.findIndex(option => option.value === currPlayer.value);
    const nextIndex = (currentIndex + 1) % options.length;
    playerSelect.selectedIndex = nextIndex;
    
    // Update the shot decteor for potential point
    previousShotMade = true;

    // ------------- TODO: Update the database with the made shot --------------------
    // const player = currPlayer.value;
    // const playerRef = db.collection('players').doc(player);
    // playerRef.update({
    //     madeShots: firebase.firestore.FieldValue.increment(1)
    // })
    // .then(() => {
    //     console.log('Made shot updated successfully!');
    // })
    // .catch((error) => {
    //     console.error('Error updating made shot: ', error);
    // });

});


// ---- MISSED SHOT ---- //
missedShotBtn.addEventListener('click', function() {
    const playerSelect = document.getElementById('player-select');
    const options = Array.from(playerSelect.options);
    const currentIndex = options.findIndex(option => option.value === currPlayer.value);
    const nextPlayerIndex = (currentIndex + 1) % options.length;
    const lastPlayerIndex = (currentIndex + 3) % options.length;


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


    // Go to next player
    playerSelect.selectedIndex = nextPlayerIndex;
    // Update the shot decteor for potential point
    previousShotMade = false;

});

