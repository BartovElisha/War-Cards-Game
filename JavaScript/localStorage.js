function clearLocalStorage() {
    localStorage.clear();
}

function getNumOfPlayers() {
    // Check Cities Counter in LocalStorage and update City Index Value
    if(localStorage.getItem('playersCounter') == null) {
        return 0;       
    }
    else {
        return JSON.parse(localStorage.getItem('playersCounter'));
    }
}

function savePlayersCounter(playersCounter) {
    localStorage.setItem('playersCounter',JSON.stringify(playersCounter));
}

function savePlayerData(key,player) {
    localStorage.setItem(key,JSON.stringify(player));
}

function getPlayerData(key) {
    return JSON.parse(localStorage.getItem(key));
}