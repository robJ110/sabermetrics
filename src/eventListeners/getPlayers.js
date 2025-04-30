import { getPlayers,populateDefaultData } from '../firebase/firebaseFunctions.js';

const button = document.getElementById('players');

button.addEventListener('click', function() {
  getPlayers();
});

// Used this to jumpstart the database with default data
// No longer needed but keeping here for reference
// const button2 = document.getElementById('extra');
// button2.addEventListener('click', function() {
//   populateDefaultData();
// });