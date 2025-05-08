import { listPlayers, getPlayerPercentage } from "../firebase/firebaseFunctions.js";
import { updateT1P1PlayerId, updateT2P1PlayerId,updateT2P2PlayerId,updateT1P2PlayerId } from "../classes/gameClass.js";

document.getElementById('team1-player1-name').addEventListener('change', function () {
    document.getElementById('team1-player1-name-display').textContent = this.options[this.selectedIndex].text;
    document.getElementById('t1p1Option').textContent = this.options[this.selectedIndex].text;

    // Update the player in the game database
    const gameJSON = localStorage.getItem("gameObj")
    const gameObj = JSON.parse(gameJSON);
    
    gameObj._t1p1PlayerId = this.options[this.selectedIndex].value;
    updateT1P1PlayerId(gameObj._gameId, gameObj._t1p1PlayerId);

    // Update the percentage in the UI
    getPlayerPercentage(gameObj._t1p1PlayerId).then((percentage) => {
        document.getElementById('team1-player1-percentage').textContent = percentage;
    });

});

document.getElementById('team1-player2-name').addEventListener('change', function () {
    document.getElementById('team1-player2-name-display').textContent = this.options[this.selectedIndex].text;
    document.getElementById('t1p2Option').text = this.options[this.selectedIndex].text;

    const gameJSON = localStorage.getItem("gameObj")
    const gameObj = JSON.parse(gameJSON);
    
    gameObj._t1p2PlayerId = this.options[this.selectedIndex].value;
    updateT1P2PlayerId(gameObj._gameId, gameObj._t1p2PlayerId);

    // Update the percentage in the UI
    getPlayerPercentage(gameObj._t1p2PlayerId).then((percentage) => {
        document.getElementById('team1-player2-percentage').textContent = percentage;
    });
});

document.getElementById('team2-player1-name').addEventListener('change', function () {
    document.getElementById('team2-player1-name-display').textContent = this.options[this.selectedIndex].text;
    document.getElementById('t2p1Option').textContent = this.options[this.selectedIndex].text;

    const gameJSON = localStorage.getItem("gameObj")
    const gameObj = JSON.parse(gameJSON);
    
    gameObj._t2p1PlayerId = this.options[this.selectedIndex].value;
    updateT2P1PlayerId(gameObj._gameId, gameObj._t2p1PlayerId);

    // Update the percentage in the UI
    getPlayerPercentage(gameObj._t2p1PlayerId).then((percentage) => {
        document.getElementById('team2-player1-percentage').textContent = percentage;
    });
});

document.getElementById('team2-player2-name').addEventListener('change', function () {
    document.getElementById('team2-player2-name-display').textContent = this.options[this.selectedIndex].text;
    document.getElementById('t2p2Option').textContent = this.options[this.selectedIndex].text;

    const gameJSON = localStorage.getItem("gameObj")
    const gameObj = JSON.parse(gameJSON);
    
    gameObj._t2p2PlayerId = this.options[this.selectedIndex].value;
    updateT2P2PlayerId(gameObj._gameId, gameObj._t2p2PlayerId);

    // Update the percentage in the UI
    getPlayerPercentage(gameObj._t2p2PlayerId).then((percentage) => {
        document.getElementById('team2-player2-percentage').textContent = percentage;
    });
});



document.addEventListener("DOMContentLoaded", function() {
    listPlayers();  
});