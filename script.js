const cards = document.querySelectorAll('.card');
let hasFlippedCard = false;
let firstCard, secondCard;
let blockBoard = false;

function flipCard() {
    if(blockBoard) return;
    if(this === firstCard) return;

    this.classList.add('flip');
    if(!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    hasFlippedCard = false;
    checkForMath();
}

function checkForMath(){
    if(firstCard.dataset.card === secondCard.dataset.card) {
        disableCards();
        return;
    }

    unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

function unflipCards() {
    blockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1500);
}

function resetBoard() {
    [hasFlippedCard, blockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuffle() {
    cards.forEach((card) => {
        let randomPosition = Math.floor(Math.random() * 12);
        card.style.order = randomPosition;
    })
})();


function cards16(){
    cards.forEach((card) => {
        card.removeAttribute('hidden');
    })

    changeStyle();
}

function changeStyle(){
    const body = document.body;
    body.classList.remove('memory-game');
    body.classList.add('memory-game16')

    cards.forEach((card) => {
        card.style.height = "calc(22% - 10px)";
        card.style.width = "width: calc(16% - 10px)";
    })
}

cards.forEach((card) => {
    card.addEventListener('click', flipCard);
})

