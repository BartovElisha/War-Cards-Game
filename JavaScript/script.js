function getNewPlayers() {
    let numberOfPlayers = +prompt("Enter Number of Players","2-6");

    if(numberOfPlayers >= 2 && numberOfPlayers <= 6) {
        for(let i = 1;i <= numberOfPlayers;i++) {
            let player = new Player();
            player.name = prompt(`Enter Player ${i} Name`,`Player ${i}`);
            player.playerId = `player-${i}`;
            player.score = 0;
            player.totalScore = 0;
            savePlayerData(`player-${i}`,player);
        }
        savePlayersCounter(numberOfPlayers);
        return true;
    }
    return false;
}

function startNewGame() {
    let numberOfPlayers = getNumOfPlayers();

    if(numberOfPlayers != 0) {
        // Remove All Elements from Page
        removeAllPlayersElements(numberOfPlayers);
        removeAllDeckElements();

        // Crear LocalStorage
        clearLocalStorage();
    }

    if(getNewPlayers() == false) {
        alert("Invalid Number of Players !!!");    
        return false;    
    }
    createNewDack();
    newGameStep();
}

function newGameStep() {
    let numberOfPlayers = getNumOfPlayers();

    // Remove All Elements from Page
    removeAllPlayersElements(numberOfPlayers);
    removeAllDeckElements();

    for(let i = 1;i <= numberOfPlayers;i++) {
        generatePlayerCard(i);
    }

    for(let i = 1;i <= numberOfPlayers;i++) {
        enableGetCardButton(i);
    }

    showGameCards(gameDeck.length);

    numOfMoves = 0;
}

let numOfMoves;

function runGameStep(playerIndex) {
    let player = new Player();

    removeAllDeckElements();
    player = getPlayerData(`player-${playerIndex}`);

    let randomCardLocation = getRandomCardLocation(gameDeck);

    player.score = gameDeck[randomCardLocation].Score;
    player.totalScore += gameDeck[randomCardLocation].Score;
    savePlayerData(`player-${playerIndex}`,player);

    numOfMoves++;

    updatePlayersScore(playerIndex,player);
    showPlayerCard(playerIndex,randomCardLocation);
    gameDeck.splice(randomCardLocation,1);

    // Show updated gameDeck
    showGameCards(gameDeck.length);
    
    if(numOfMoves >= getNumOfPlayers()) {
        if(gameDeck.length == 0) {        
            checkFinalWinner();
            return;    
        }
        checkWinner();
        setTimeout(function() {
            newGameStep();
        }, 5000);
    }
}

function getCard(playerIndex) {    
    disableGetCardButton(playerIndex);
    runGameStep(playerIndex);
}

function checkWinner() {
    let winner = new Player();
    let player = new Player();
    let numberOfPlayers = getNumOfPlayers();

    winner = getPlayerData(`player-1`);

    for(let i = 2;i <= numberOfPlayers;i++) {
        player = getPlayerData(`player-${i}`);

        if(player.score > winner.score) {
            winner = getPlayerData(`player-${i}`);    
        }
    }

    showWinner(winner);
}

function stopGame() {
    let numberOfPlayers = getNumOfPlayers();    

    // Find ramain score
    let ramainScore = 0;
    for(let i = 0;i < gameDeck.length;i++) {
        ramainScore += gameDeck[i].Score;
    }

    ramainScore = Math.round(ramainScore/numberOfPlayers);
    
    // Move remain scores to all players
    for(let i = 1;i <= numberOfPlayers;i++) {
        let player = new Player();
        player = getPlayerData(`player-${i}`);
        player.totalScore += ramainScore;
        savePlayerData(`player-${i}`,player);
        updatePlayersScore(i,player);
    }

    checkFinalWinner();
}

function checkFinalWinner() {
    let finalWinner = new Player();
    let player = new Player();
    let numberOfPlayers = getNumOfPlayers();

    finalWinner = getPlayerData(`player-1`);

    for(let i = 2;i <= numberOfPlayers;i++) {
        player = getPlayerData(`player-${i}`);

        if(player.totalScore > finalWinner.totalScore) {
            finalWinner = getPlayerData(`player-${i}`);    
        }
    }

    showFinalWinner(finalWinner);
}