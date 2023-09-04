const cards = ['A&M', 'A&M', 'Rev', 'Rev', 'Ring', 'Ring', 'Horns Down', 'Horns Down'];
let cardElements = [];
let flippedCards = [];
let matchedPairs = 0;

// Shuffle 
function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

// Initialize the board
function initializeBoard() {
  shuffle(cards);
  const board = document.getElementById('game-board');

  for (let i = 0; i < cards.length; i++) {
    const cardElement = document.createElement('div');
    cardElement.className = 'card';
    cardElement.dataset.value = cards[i];
    cardElement.addEventListener('click', flipCard);
    board.appendChild(cardElement);
    cardElements.push(cardElement);
  }
}

function flipCard(event) {
  const target = event.target;
  if (flippedCards.length < 2 && !target.classList.contains('flipped')) {
    target.textContent = target.dataset.value;
    target.classList.add('flipped');
    flippedCards.push(target);

    if (flippedCards.length === 2) {
      checkMatch();
    }
  }
}

function checkMatch() {
  if (flippedCards[0].dataset.value === flippedCards[1].dataset.value) {
    matchedPairs++;
    flippedCards = [];
    if (matchedPairs === cards.length / 2) {
      alert('You win!');
    }
  } else {
    setTimeout(() => {
      flippedCards.forEach(card => {
        card.textContent = '';
        card.classList.remove('flipped');
      });
      flippedCards = [];
    }, 1000);
  }
}

initializeBoard();
