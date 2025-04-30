document.getElementById('team1-player1-name').addEventListener('change', function () {
    document.getElementById('team1-player1-name-display').textContent = this.options[this.selectedIndex].text;
    document.getElementById('t1p1Option').textContent = this.options[this.selectedIndex].text;
});

document.getElementById('team1-player2-name').addEventListener('change', function () {
    document.getElementById('team1-player2-name-display').textContent = this.options[this.selectedIndex].text;
    document.getElementById('t1p2Option').text = this.options[this.selectedIndex].text;
});

document.getElementById('team2-player1-name').addEventListener('change', function () {
    document.getElementById('team2-player1-name-display').textContent = this.options[this.selectedIndex].text;
    document.getElementById('t2p1Option').textContent = this.options[this.selectedIndex].text;
});

document.getElementById('team2-player2-name').addEventListener('change', function () {
    document.getElementById('team2-player2-name-display').textContent = this.options[this.selectedIndex].text;
    document.getElementById('t2p2Option').textContent = this.options[this.selectedIndex].text;
});