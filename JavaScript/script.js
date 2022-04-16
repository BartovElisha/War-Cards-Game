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
        removeAllElements(numberOfPlayers);
        // Crear LocalStorage
        clearLocalStorage();
    }

    if(getNewPlayers() == false) {
        alert("Invalid Number of Players !!!");    
        return false;    
    }
    newGameStep();
}

function newGameStep() {
    numberOfPlayers = getNumOfPlayers();

    // Remove All Elements from Page
    removeAllElements(numberOfPlayers);

    for(let i = 1;i <= numberOfPlayers;i++) {
        generatePlayerCard(i);
    }

    for(let i = 1;i <= numberOfPlayers;i++) {
        enableGetCardButton(i);
    }

    createNewDack();
    showGameCards(gameDeck.length);

    numOfMoves = 0;
}

let numOfMoves;

function runGameStep(playerIndex) {
    let player = new Player();

    player = getPlayerData(`player-${playerIndex}`);

    let randomCard = getRandomCard(gameDeck);

    player.score = randomCard.Score;
    player.totalScore += randomCard.Score;
    savePlayerData(`player-${playerIndex}`,player);

    numOfMoves++;

    updatePlayersScore(playerIndex,player);
    
    if(numOfMoves >= getNumOfPlayers()) {
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