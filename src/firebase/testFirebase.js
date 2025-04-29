import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import {firebaseConfig} from './firebaseConfig.js';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Get a list of cities from your database
async function getPlayers(db) {
  const playersCollection = collection(db, 'Players');
  const playerSnapshot = await getDocs(playersCollection);
  const playerList = playerSnapshot.docs.map(doc => doc.data());
  return playerList;
}