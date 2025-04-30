
function testFirebase() {
    console.log("Testing Firebase connection...")
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const playerList = getPlayers(db);
    console.log(playerList);
    return
}


function helloWorld(){
    console.log("Hello, World!")
}