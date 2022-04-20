function togleDisplayDarkLightMode() {
    let bodyElement = document.body;
    let headerElement = document.getElementById('header-dark-mode');
    let DarkSvgiconElement = document.getElementById('icon-dark-mode');
    let inputSectionElement = document.getElementById('input-section-dark-mode');  
    let deckSectionElement = document.getElementById('deck-section-dark-mode');  
    
    // Body Element update Dark/Light mode
    bodyElement.classList.toggle("bg-dark");

    // Header Element update Dark/Light mode
    headerElement.classList.toggle("bg-dark");
    headerElement.classList.toggle("text-white");
    
    // Display mode icon Element update Dark/Light mode
    DarkSvgiconElement.classList.toggle("icon-dark");

    // Input Section Element update Dark/Light mode
    inputSectionElement.classList.toggle("text-white");

    // Deck Section Element update Dark/Light mode
    deckSectionElement.classList.toggle("text-white");
}

function generatePlayerCard(playerIndex) {
    let playersContainerElement = document.getElementById("players-container");

    let player = new Player();
    
    player = getPlayerData(`player-${playerIndex}`);

    let template =
                `<div id="player-${playerIndex}" class="col my-2">`+
                    `<div class="card shadow-lg" style="width: 13rem;">`+
                        `<div id="player-${playerIndex}-header" class="toast-header">`+
                            `<strong class="me-auto">Player ${playerIndex}</strong>`+
                            `<img src="./Images/pexels-pixabay-39018.jpg" class="card-img-top image-box" alt="...">`+
                        `</div>`+

                        `<div class="card-body">`+
                            `<div class="row">`+
                                `<div class="col">`+
                                    `<h6 class="card-title">Name:</h6>`+
                                `</div>`+
                                `<div class="col">`+
                                    `<span>${player.name}</span>`+
                                `</div>`+
                            `</div>`+

                            `<div class="row">`+
                                `<div class="col">`+
                                    `<h6 class="card-title">Score:</h6>`+
                                `</div>`+
                                `<div id="player-score-${playerIndex}" class="col">`+
                                    `<span>${player.score}</span>`+
                                `</div>`+
                            `</div>`+

                            `<div class="row">`+
                                `<div class="col">`+
                                    `<h6 class="card-title">Total:</h6>`+
                                `</div>`+
                                `<div id="player-total-score-${playerIndex}" class="col">`+
                                    `<strong>${player.totalScore}</strong>`+
                                `</div>`+
                            `</div>`+

                            `<div class="container">`+
                                //`<div class="container">`+
                                    `<button id="player-${playerIndex}-button" type="button" class="btn btn-success disabled" onclick="getCard(${playerIndex})">Get Card</button>`+
                                //`</div>`+
                            `</div>`+

                            `<div id="card-${playerIndex}" class="container">`+
                                `<br>`+
                                // Current getted game card
                            `</div>`+
                        `</div>`+
                    `</div>`+
                `</div>`;

    playersContainerElement.innerHTML += template;
}

function disableGetCardButton(playerIndex) {
    if(document.getElementById(`player-${playerIndex}-button`)) {
        let playerCardElement = document.getElementById(`player-${playerIndex}-button`);
        playerCardElement.classList.add("disabled");
    }
}

function enableGetCardButton(playerIndex) {
    if(document.getElementById(`player-${playerIndex}-button`)) {
        let playerCardElement = document.getElementById(`player-${playerIndex}-button`);
        playerCardElement.classList.remove("disabled");
    }
}

function updatePlayersScore(playerIndex,player) {
    let template1 = `<span>${player.score}</span>`;
    let template2 = `<strong>${player.totalScore}</strong>`;

    if(document.getElementById(`player-score-${playerIndex}`)) {
        let playerScoreElement = document.getElementById(`player-score-${playerIndex}`);

        playerScoreElement.removeChild(playerScoreElement.firstElementChild);

        playerScoreElement.innerHTML += template1;        
    }

    if(document.getElementById(`player-total-score-${playerIndex}`)) {
        let playerScoreElement = document.getElementById(`player-total-score-${playerIndex}`);

        playerScoreElement.removeChild(playerScoreElement.firstElementChild);

        playerScoreElement.innerHTML += template2;        
    }
}

function showPlayerCard(playerIndex,randomCardLocation) {
    let playerCardElement = document.getElementById(`card-${playerIndex}`);    

    renderCard(gameDeck,randomCardLocation,playerCardElement)
}

function showWinner(winner) {
    setTimeout(function() {
        if(document.getElementById(`${winner.playerId}`)) {
            let playerCardElement = document.getElementById(`${winner.playerId}`);
            playerCardElement.firstChild.classList.add("winner");
        }
    }, 2000);
}

function showFinalWinner(finalWinner) {
    debugger
    setTimeout(function() {
        if(document.getElementById(`${finalWinner.playerId}`)) {
            let playerCardElement = document.getElementById(`${finalWinner.playerId}`);
            let playerHeaderElement = document.getElementById(`${finalWinner.playerId}-header`);
            let childPlayerHeaderElement = playerHeaderElement.childNodes[0];
            
            childPlayerHeaderElement.innerHTML = "Winner !!! &#128515";
            playerCardElement.firstChild.classList.add("final-winner");
        }
    }, 2000);
}

function removeAllPlayersElements(numberOfPlayers) {    
    for(let i = 1;i <= numberOfPlayers;i++) {
        if(document.getElementById(`player-${i}`)) {
            let playerCardElement = document.getElementById(`player-${i}`);
            playerCardElement.remove();    
        }
    }
}

function removeAllDeckElements() {
    let cardsDeckElement = document.getElementById("cards-deck");

    while(cardsDeckElement.firstChild) {
        cardsDeckElement.removeChild(cardsDeckElement.lastChild);
    }
}