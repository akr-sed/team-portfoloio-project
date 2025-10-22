// Memory Card Game Variables
let memoryCards = [];
let flippedCards = [];
let matchedPairs = 0;
let memoryTimer = null;
let memoryTimeLeft = 60;
let canFlip = true;

const cardSymbols = ['1', 'J', 'Q', 'K'];

function initMemoryGame() {
    const board = document.getElementById('memoryBoard');
    board.innerHTML = '';
    memoryCards = [];
    flippedCards = [];
    matchedPairs = 0;
    memoryTimeLeft = 60;
    canFlip = true;

    // Create pairs (8 cards total, 4 pairs)
    const cardPairs = [...cardSymbols, ...cardSymbols];

    // Shuffle cards
    const shuffled = cardPairs.sort(() => Math.random() - 0.5);

    // Create cards
    shuffled.forEach((symbol, index) => {
        const card = document.createElement('div');
        card.className = 'memory-card';
        card.dataset.symbol = symbol;
        card.dataset.index = index;
        card.innerHTML = `
            <div class="card-face card-back"></div>
            <div class="card-face card-front">
                <div class="card-corner top-left">${symbol}</div>
                <div class="card-symbol">${symbol}</div>
                <div class="card-corner bottom-right">${symbol}</div>
            </div>
        `;
        card.addEventListener('click', () => flipCard(card));
        board.appendChild(card);
        memoryCards.push(card);
    });

    // Start timer
    updateMemoryTimer();
    memoryTimer = setInterval(() => {
        memoryTimeLeft--;
        updateMemoryTimer();

        if (memoryTimeLeft <= 10) {
            document.getElementById('memoryTimer').classList.add('warning');
        }

        if (memoryTimeLeft <= 0) {
            endMemoryGame(false);
        }
    }, 1000);
}

function updateMemoryTimer() {
    document.getElementById('memoryTimer').textContent = `Time: ${memoryTimeLeft}s`;
}

function flipCard(card) {
    if (!canFlip || card.classList.contains('flipped') || card.classList.contains('matched')) {
        return;
    }

    card.classList.add('flipped');
    flippedCards.push(card);

    if (flippedCards.length === 2) {
        canFlip = false;
        checkMatch();
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    const match = card1.dataset.symbol === card2.dataset.symbol;

    setTimeout(() => {
        if (match) {
            card1.classList.add('matched');
            card2.classList.add('matched');
            matchedPairs++;

            if (matchedPairs === 4) {
                endMemoryGame(true);
            }
        } else {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
        }

        flippedCards = [];
        canFlip = true;
    }, 1000);
}

function endMemoryGame(victory) {
    clearInterval(memoryTimer);
    canFlip = false;
    document.getElementById('memoryTimer').classList.remove('warning');

    if (victory) {
        document.getElementById('memoryVictory').style.display = 'block';
        const earnedXP = 150;
        addXP(earnedXP);

        setTimeout(() => {
            document.getElementById('memoryVictory').style.display = 'none';
            trapActive = false;
            document.getElementById('memory').style.display = 'none';
            document.querySelector('.nav-buttons').style.display = 'flex';
            document.querySelector('.section-indicator').style.display = 'block';
            currentSection = 0; // Back to stats
            showSection(currentSection);
        }, 3000);
    } else {
        document.getElementById('memoryDefeat').style.display = 'block';

        setTimeout(() => {
            document.getElementById('memoryDefeat').style.display = 'none';
            document.getElementById('memory').style.display = 'none';
            activateTrap();
        }, 2000);
    }
}
// Modify checkTrap function to potentially trigger memory game
const originalCheckTrap = checkTrap;
checkTrap = function() {
    if (!trapActive && Math.random() < 0.20) {
        // 50% chance for regular trap, 50% for memory game
        if (Math.random() < 0.5) {
            activateMemoryTrap();
            return true;
        } else {
            activateTrap();
            return true;
        }
    }
    return false;
};

function activateMemoryTrap() {
    trapActive = true;
    document.querySelectorAll('.section').forEach(s => s.style.display = 'none');
    document.getElementById('memory').style.display = 'flex';
    document.querySelector('.nav-buttons').style.display = 'none';
    document.querySelector('.section-indicator').style.display = 'none';

    initMemoryGame();
}