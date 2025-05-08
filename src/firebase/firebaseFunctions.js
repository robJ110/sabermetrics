import {getDoc, getDocs, collection,db,doc,updateDoc,increment, runTransaction} from './firestoreConnection.js';

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

async function listPlayers() {
  const tableBody = document.getElementById('player-select');
  const playersCollection = collection(db, 'Players');
  const playerSnapshot = await getDocs(playersCollection);

  const t1p1Option = document.getElementById('team1-player1-name');
  const t1p2Option = document.getElementById('team1-player2-name');
  const t2p1Option = document.getElementById('team2-player1-name');
  const t2p2Option = document.getElementById('team2-player2-name');
  playerSnapshot.forEach(player => {
      let name = player.id;
      name = name.replace(/([a-z])([A-Z])/g, '$1 $2');

      const option = document.createElement('option');
      option.value = player.id; // Assuming each player has a unique 'id' field
      option.textContent = name; // Assuming each player has a 'name' field

      t1p1Option.appendChild(option.cloneNode(true));
      t1p2Option.appendChild(option.cloneNode(true));
      t2p1Option.appendChild(option.cloneNode(true));
      t2p2Option.appendChild(option.cloneNode(true));
  });
      // playerSnapshot.forEach(player => {
      //   const playerData = doc.data();
      //   const option = document.createElement('option');
      //   option.value = playerData.id; // Assuming each player has a unique 'id' field
      //   option.textContent = playerData.name; // Assuming each player has a 'name' field
      //   playerSelect.appendChild(option);
    //});
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
        console.log(`Reset ${playerId} with default data`);
      })
      .catch((error) => {
        console.error("Error updating document: ", error);
      });
});
}

async function updatePlayerShot(playerName, previousShotMade, isMade) {
  
  const player = playerName;
  console.log(playerName);
  //const playerRef = db.collection('players').doc(player);
  const playerRef = doc(db,'Players',playerName);
  
  // Rebuttal cap made
  if (previousShotMade && isMade) {
    await updateDoc(playerRef, {  
      madeShots: increment(1),
      capsThrown: increment(1),
      rebuttalThrown:increment(1),
      rebuttalHit:increment(1)
  })

    
  }
  // Normal Cap made
  else if (!previousShotMade && isMade){
    await updateDoc(playerRef, {
      capsHit: increment(1),
      capsThrown: increment(1)
  })
  }
  // Rebuttal Shot missed
  else if(previousShotMade && !isMade) {
    await updateDoc(playerRef, {
      capsThrown: increment(1),
      rebuttalThrown:increment(1)
  })
  .catch((error) => {
      console.error('Error updating made rebuttal: ', error);
  });
  }
  // Normal Cap missed
  else if (!previousShotMade && !isMade) {
    await updateDoc(playerRef, {
      capsThrown: increment(1)
  })
  .catch((error) => {
      console.error('Error updating made rebuttal: ', error);
  });
  }
}


async function generateNextGameNumber() {
  const counterRef = doc(db, "collectionCounter", "counter");
  const counterSnapshot = await getDoc(counterRef);
  
  let lastGameNum = counterSnapshot.data().lastId;
  lastGameNum++;  
  await updateDoc(counterRef, {  
    lastId: increment(1),
  });

    return lastGameNum;
}

export { getPlayers, getPlayerTable, populateDefaultData, listPlayers, updatePlayerShot, generateNextGameNumber };