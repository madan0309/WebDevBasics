let suits = ["Hearts", "Clubs", "Diamonds", "Spades"];
/* King, Queen, Jack = 10
    Ace = 1 or 11, which ever is better for the hand
*/
let values = [
    "Ace", "King", "Queen", "Jack",
    "Ten", "Nine", "Eight", "Seven", "Six",
    "Five", "Four", "Three", "Two"    
];

let valueOfCards = {
    "Ace" : 11,
    "King" : 10,
    "Queen" : 10,
    "Jack" : 10,
    "Ten" : 10,
    "Nine" : 9,
    "Eight" : 8,
    "Seven" : 7,
    "Six" : 6,
    "Five" : 5,
    "Four" : 4,
    "Three" : 3,
    "Two" : 2
}

let gameStarted = false,
    deck = createDeck(),
    playerCards = [],
    dealerCards = [],
    playerScore = 0,
    dealerScore = 0;
    hasPlayerStayed = false;

shuffleDeck();

playerCards = [getNextCard(), getNextCard()];

dealerCards = [getNextCard(), getNextCard()];


function createDeck() {
    let deck = [];
    for(let suitIdx=0; suitIdx<suits.length; suitIdx++) {
        for(let value=0; value<values.length; value++) {
            // deck.push(values[value] + " Of " + suits[suitIdx]);
            let cardObj = {
                value : values[value],
                suit: suits[suitIdx]
            }
            deck.push(cardObj);
        }
    }
    return deck;
}

function shuffleDeck() {
    for(let cardIdx=0; cardIdx<deck.length; cardIdx++) {
        let randomCard = Number.parseInt(Math.random()*52);
        let temp = deck[cardIdx];
        deck[cardIdx] = deck[randomCard];
        deck[randomCard] = temp;
    }
}

function getNextCard() {
    return deck.shift();
}

function getCardString(card) {
    return card.value + ' Of ' + card.suit;
}

function getScore(cards) {
    let hasAce = false;
    let score = 0;
    for(let idx = 0; idx<cards.length; idx++) {
        score += valueOfCards[cards[idx].value];        
        if(cards[idx].value === 'Ace') {
            hasAce = true;
        }
    }
    if(hasAce) {
        score = (score>21) ? score-10 : score;
    }
    return score;
}

function updateScores() {
    dealerScore = getScore(dealerCards);
    playerScore = getScore(playerCards);
}

function showStatus() {
    if(!gameStarted) {
        textArea.innerHTML = "Welcome to Blackjack!";
        return
    }
    // for(let cardId=0; cardId<deck.length; cardId++) {
    //     textArea.innerHTML += '\n' + getCardString(deck[cardId]);
    // }
    let dealerCardString = "Dealer has:\n";
    for(let cardId=0; cardId<dealerCards.length; cardId++) {
        dealerCardString += getCardString(dealerCards[cardId]) + '\n';
    }

    let playerCardString = "Player has:\n";
    for(let cardId=0; cardId<playerCards.length; cardId++) {
        playerCardString +=  getCardString(playerCards[cardId]) + '\n';
    }

    updateScores();
    dealerCardString += `(score: ${dealerScore})\n\n`;
    playerCardString += `(score: ${playerScore})\n`;

    textArea.innerHTML = dealerCardString + playerCardString
}

function checkEndOfGame() {
    if(hasPlayerStayed) {
        while(dealerScore<=21 && dealerScore<playerScore) {
            dealerCards.push(getNextCard());
            showStatus();
        }
    }
    if(dealerScore>21 && playerScore<=21) {
        alert("Player Wins!");
    } else if(playerScore>21 && dealerScore<=21) {
        alert("Dealer Wins!");
    } else if(playerScore == 21 && dealerScore==21) {
        alert("Draw!");
    }
}

// HTML DOM elements
let textArea = document.getElementById("text-area");
let newGameButton = document.getElementById("new-game-button");
let hitButton = document.getElementById("hit-button");
let stayButton = document.getElementById("stay-button");

hitButton.style.display = 'none';
stayButton.style.display = 'none';

// Button Down Event to new-game-button
newGameButton.addEventListener('click', function() {
    // newGameButton.style.display = 'none';
    deck = createDeck();
    shuffleDeck();

    playerCards = [getNextCard(), getNextCard()];

    dealerCards = [getNextCard(), getNextCard()];
    gameStarted = true;
    hitButton.style.display = 'inline';
    stayButton.style.display = 'inline';
    showStatus();
    hasPlayerStayed = false;
});

hitButton.addEventListener('click', function() {
    playerCards.push(getNextCard());
    updateScores();
    showStatus();
    checkEndOfGame();
});

stayButton.addEventListener('click', function() {
    updateScores();
    hasPlayerStayed = true;
    checkEndOfGame();
});