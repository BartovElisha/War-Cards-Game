let suits = ["spades", "diamonds", "clubs", "hearts"];
let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
let score = [1,2,3,4,5,6,7,8,9,10,11,12,13];

function getDeck()
{
	let deck = new Array();

	for(let i = 0; i < suits.length; i++)
	{
		for(let x = 0; x < values.length; x++)
		{
			let card = {Value: values[x], Suit: suits[i], Score: score[x]};
			deck.push(card);
		}
	}

	return deck;
}

function shuffle(deck)
{
	// for 100 turns
	// switch the values of two random cards
	for (let i = 0; i < 100; i++)
	{
		let location1 = Math.floor((Math.random() * deck.length));
		let location2 = Math.floor((Math.random() * deck.length));
		let tmp = deck[location1];

		deck[location1] = deck[location2];
		deck[location2] = tmp;
	}
}

function renderCard(deck,index,element) {
	let card = document.createElement("div");
	let value = document.createElement("div");
	let suit = document.createElement("div");

	card.className = "card";
	value.className = "value";
	suit.className = "suit " + deck[index].Suit;

	value.innerHTML = deck[index].Value;
	card.appendChild(value);
	card.appendChild(suit);

	element.appendChild(card);
}

function renderDeck(deck,numOfCards)
{
    document.getElementById("cards-deck").innerHTML = "";

	//for(let i = 0; i < deck.length; i++)
	let cardsDeckElement = document.getElementById("cards-deck");

	for(let i = 0; i < numOfCards; i++)
	{
		renderCard(deck,i,cardsDeckElement);
	}
}
// function renderDeck(deck,numOfCards)
// {
//     document.getElementById("cards-deck").innerHTML = "";

// 	//for(let i = 0; i < deck.length; i++)
// 	for(let i = 0; i < numOfCards; i++)
// 	{
// 		let card = document.createElement("div");
// 		let value = document.createElement("div");
// 		let suit = document.createElement("div");


// 		card.className = "card";
// 		value.className = "value";
// 		suit.className = "suit " + deck[i].Suit;

// 		value.innerHTML = deck[i].Value;
// 		card.appendChild(value);
// 		card.appendChild(suit);

// 		document.getElementById("cards-deck").appendChild(card);
// 	}
// }

// Global deck of Cards
let gameDeck;

function createNewDack() {
	gameDeck = getDeck();
}

function showGameCards() {
    shuffle(gameDeck);
    renderDeck(gameDeck,gameDeck.length);
}

function getRandomCardLocation(deck) {
	let location = Math.floor((Math.random() * deck.length));

	return location; 
}