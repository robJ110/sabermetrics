import {getDocs, collection,db,doc,updateDoc} from './firestoreConnection.js';

// Get a list of players from your database
async function getPlayers() {
  const playersCollection = collection(db, 'Players');
  const playerSnapshot = await getDocs(playersCollection);

  const playerList = [];
  playerSnapshot.forEach(doc => {
    playerList.push(doc.id);;
  });
  console.log(playerList);
  return playerList;
}

async function getPlayerTable() {
  const tableBody = document.getElementById('player-stats-table');
  const playersCollection = collection(db, 'Players');
  const playerSnapshot = await getDocs(playersCollection);

  playerSnapshot.forEach(player => {
      const data = player.data();
      let name = player.id;
      name = name.replace(/([a-z])([A-Z])/g, '$1 $2');
      const row = document.createElement('tr');

      row.innerHTML = `
          <td>${name}</td>
          <td>${data.team}</td>
          <td>${data.capsHit}</td>
          <td>${data.capsThrown}</td>
          <td>${data.rebuttalHit}</td>
          <td>${data.rebuttalThrown}</td>
          <td>${data.record}</td>
          <td>${data.alKiss}</td>
      `;

      tableBody.appendChild(row);
  });

}

// This function populates the default data for all players in the database
// Only needed to be ran once to set up the database
async function populateDefaultData() {
  const defaultData = 
    {
      team: 'Team A',
      capsHit: 0,
      capsThrown: 0,
      rebuttalHit: 0,
      rebuttalThrown: 0,
      record: '0-0',
      alKiss: 0
    };

  const playersCollection = collection(db, 'Players');
  const playerSnapshot = await getDocs(playersCollection);
  console.log(playerSnapshot);

  playerSnapshot.forEach(player => {
    const playerId = player.id;
  
    const playerRef = doc(db, 'Players', playerId);
    updateDoc(playerRef, defaultData)
      .then(() => {
        console.log(`Updated ${playerId} with default data`);
      })
      .catch((error) => {
        console.error("Error updating document: ", error);
      });
});
}

export { getPlayers, getPlayerTable, populateDefaultData};