let cards = []
let dcards = []
let message = "";
let donePlaying = false;
let hasBlackjack = false;
let isAlive = false;
let isPlaying = false; 
let stayLogic = true;
let sumEl = document.querySelector("#sum-el")
let messageEl = document.getElementById("message-el")
let cardsEl = document.querySelector("#cards-el")
let dealerMessageEL = document.getElementById("dmessage-el")
let dSumEL = document.getElementById("dsum-el")
let dCardsEL = document.getElementById("dcards-el")
let sum = 0;
let dsum = 0;
let winningEL = document.querySelector("#winning")
let balance = document.getElementById("balance")
let chips = 2000;
balance.textContent = chips

dealerCards = document.getElementById("dcards-el")

function getRandomCard  () {
    let randomNumber =  Math.floor ( Math.random() *13 ) +1
        if (randomNumber > 10) {
            return 10
        } else if (randomNumber === 1) {
            return 11
        } else {
            return randomNumber
        }
}

function startGame() {
    balance.textContent = chips
    if (isPlaying === false) {
        let firstCard = getRandomCard();
        let secondCard = getRandomCard();
        cards = [firstCard, secondCard]
        sum = firstCard + secondCard
        isAlive = true
        isPlaying = true
        renderGame()
    }
}

cardsEl.textContent = "Cards: "

function renderGame () { 
    sumEl.textContent = "Sum: " + sum
    for (let i=0; i< cards.length; i++) {
        cardsEl.textContent += + cards[i] + " "
    }
    if (sum <= 20) {
    message = "Do you want to draw a card?"
    stayLogic = false
    }
    else if (sum === 21) {
    message = "You've got BlackJack!!!"
    hasBlackjack = true
    stayLogic = true
    isAlive = false
        if (dsum === sum) {
            message = "PUSH! no one wins"
        } else {
            chips += 3000
            winningEL.textContent += "₹" + 5000
            balance.textContent = chips
        }}
    else {
    message = "You lost. Thanks for playing!"
    isAlive = false
    stayLogic = true
    chips -= 2000
    winningEL.textContent += "₹" + 0
    balance.textContent = chips
    }
    messageEl.textContent = message
   
}

function newCard () {
    if (isAlive === true) {
        
        let thirdCard = getRandomCard();
        cards.push(thirdCard)
        sum += thirdCard
        renderGame()
        cardsEl.textContent = "Cards: "
        for (let i=0; i< cards.length; i++) {
        cardsEl.textContent += cards[i] + " "
        }
    }
    
}

function replay() {
        if (isAlive === false && chips >= 2000) {
            winningEL.textContent = ""
            isPlaying = false
            isAlive = true
            cards = []
            cardsEl.textContent = "Cards: "
            dCardsEL.textContent = "Cards: "
            dSumEL.textContent = "Sum: "
            dcards = []
            startGame()
        } else {
        document.getElementById("broke").textContent = "Ni**a you BROKE AS HELL"
        }
    }

function stay() {
    if (sum === 0 || stayLogic === true) {
        dealerMessageEL.textContent = "Start OR replay the game first??"
    } else {
        let dealerFristCard = getRandomCard ()
        let dealerSecondCard = getRandomCard()
        dcards = [dealerFristCard, dealerSecondCard]
        dsum = dealerFristCard + dealerSecondCard
        dealerLogic()
        dCardsEL.textContent = "Cards: "
        for (let j=0; j < dcards.length; j++) {
            dCardsEL.textContent += dcards[j] + " "
        }
        dSumEL.textContent = "Sum: " + dsum
        stayLogic = true
        isAlive = false
    }
}

function dealerLogic() {
    if (dsum === sum) {
        dealerMessageEL.textContent = "PUSH! no one wins"
        winningEL.textContent += "₹" + 2000
        balance.textContent = chips
    } else if (dsum > sum && dsum <= 21) {
        dealerMessageEL.textContent = "I won you lost."
        chips -= 2000
        balance.textContent = chips
        winningEL.textContent += "₹" + 0
    } else if(dsum < sum) {
        let dealerNewCard = getRandomCard()
        dcards.push(dealerNewCard)
        dsum += dealerNewCard
        dealerLogic()
    } else {
        dealerMessageEL.textContent = "I lost you WON"
        chips += 2000
        balance.textContent = chips
        winningEL.textContent += "₹" + 4000
    }
}