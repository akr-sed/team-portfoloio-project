const Row = 20;
const Col = 11;

// Initialize particles
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (10 + Math.random() * 10) + 's';
        particlesContainer.appendChild(particle);
    }
}

// XP System
function addXP(amount) {
    playerXP += amount;
    while (playerXP >= xpToNextLevel) {
        playerXP -= xpToNextLevel;
        playerLevel++;
        skillPoints += 3;
        xpToNextLevel = Math.floor(xpToNextLevel * 1.5);
        showLevelUp();
    }
    updateXPDisplay();
    updateSkillPoints();
}

function updateXPDisplay() {
    const xpPercent = (playerXP / xpToNextLevel) * 100;
    document.getElementById('xpBar').style.width = xpPercent + '%';
    document.getElementById('playerLevel').textContent = playerLevel;
    document.getElementById('xpDisplay').textContent = `${playerXP} / ${xpToNextLevel} XP`;
}

function showLevelUp() {
    // Visual feedback for level up
    const indicator = document.getElementById('sectionIndicator');
    const originalText = indicator.textContent;
    indicator.textContent = `⚔️ LEVEL UP! Level ${playerLevel} ⚔️`;
    indicator.style.color = '#f4e4b0';
    indicator.style.fontSize = '1.5rem';
    setTimeout(() => {
        indicator.textContent = originalText;
        indicator.style.color = '#d4af37';
        indicator.style.fontSize = '1.2rem';
    }, 3000);
}

// ColorTris Game Setup
for (let i = 1; i < Col * Row + 1; ++i) {
    let p = document.createElement('div');
    p.id = 'div' + i;
    p.className = 'cell';
    p.style.background = 'rgba(16, 8, 136, 0.3)';
    p.style.border = '1px solid rgba(139, 115, 85, 0.2)';
    main.appendChild(p);
}

// Tetris Shapes
const block = [6, 7, 6 + Col, 7 + Col];
const Arrow = [0, 6, 0, 0, 0, 6 + Col, 0, 0, 0, 6 + Col * 2, 0, 0, 0, 6 + Col * 3, 0, 0];
const Z = [0, 7, 0, 6 + Col, 7 + Col, 0, 6 + Col * 2, 0, 0];
const S = [6, 0, 0, 6 + Col, 7 + Col, 0, 0, 7 + Col * 2, 0];
const L = [0, 6, 0, 0, 6 + Col, 0, 0, 6 + Col * 2, 7 + Col * 2];
const RL = [0, 6, 0, 0, 6 + Col, 0, 5 + Col * 2, 6 + Col * 2, 0];
const Tr = [0, 6, 0, 5 + Col, 6 + Col, 7 + Col, 0, 0, 0];

let id = [...Tr];
const Shapes = [Tr, block, Arrow, Z, S, L, RL];

function RColor(Id) {
    let a = document.getElementById('div' + Id);
    if (a) {
        a.style.background = '#93781d';
        a.style.boxShadow = '0 0 10px rgba(212, 175, 55, 0.6)';

    }
}

function BColor(Id) {
    let a = document.getElementById('div' + Id);
    if (a) {
        a.style.background = 'rgba(16, 8, 136, 0.3)';
        a.style.boxShadow = 'none';
    }
}

function ToDown() {
    for (let Id = id.length - 1; Id >= 0; --Id) {
        if (id[Id] == 0) continue;
        if (!(id[Id] <= Row * (Col - 1) + 9 && (document.getElementById('div' + (id[Id] + Col)).style.background == 'rgba(16, 8, 136, 0.3)' || id.includes(id[Id] + Col)))) {
            return false;
        }
    }
    for (let Id = id.length - 1; Id >= 0; --Id) {
        if (id[Id] == 0) continue;
        BColor(id[Id]);
        id[Id] += Col;
        RColor(id[Id]);
    }
    return true;
}

function ToRight() {
    for (let Id in id) {
        if (id[Id] == 0) continue;
        if (id[Id] % Col == 0 || !(document.getElementById('div' + (id[Id] + 1)).style.background == 'rgba(16, 8, 136, 0.3)' || id.includes(id[Id] + 1))) {
            return false;
        }
    }
    let A = [];
    for (let Id in id) {
        if (id[Id] == 0) continue;
        if (!A.includes(id[Id])) {
            BColor(id[Id]);
        }
        id[Id] += 1;
        A.push(id[Id]);
        RColor(id[Id]);
    }
    return true;
}

function ToLeft() {
    for (let Id in id) {
        if (id[Id] == 0) continue;
        if (id[Id] % Col == 1 || !(document.getElementById('div' + (id[Id] - 1)).style.background == 'rgba(16, 8, 136, 0.3)' || id.includes(id[Id] - 1))) {
            return false;
        }
    }
    let A = [];
    for (let Id in id) {
        if (id[Id] == 0) continue;
        if (!A.includes(id[Id])) {
            BColor(id[Id]);
        }
        id[Id] -= 1;
        A.push(id[Id]);
        RColor(id[Id]);
    }
    return true;
}

function rotate() {
    if (!id.includes(0)) return;

    let RowSize = Math.sqrt(id.length);
    let MR = false;
    let ML = false;

    for (let Id in id) {
        if (id[Id] != 0) {
            if (!(id[Id] <= Row * (Col - 1) + 9 && (document.getElementById('div' + (id[Id] + Col)).style.background == 'rgba(16, 8, 136, 0.3)' || id.includes(id[Id] + Col)))) {
                return;
            }
            if ((id[Id] % Col == 0) || !(document.getElementById('div' + (id[Id] + 1)).style.background == 'rgba(16, 8, 136, 0.3)' || id.includes(id[Id] + 1))) {
                ML = true;
                if (RowSize == 4) ToLeft();
                ToLeft();
            }
            if ((id[Id] % Col == 1) || !(document.getElementById('div' + (id[Id] - 1)).style.background == 'rgba(16, 8, 136, 0.3)' || id.includes(id[Id] - 1))) {
                MR = true;
                ToRight();
            }
        }
    }

    if (ML && MR) return;
    else if (ML) {
        if (RowSize == 4) ToLeft();
        ToLeft();
    } else if (MR) {
        ToRight();
    }

    for (let Id in id) {
        BColor(id[Id]);
    }

    let Start;
    for (let i in id) {
        if (id[i] != 0) {
            if (i >= RowSize) {
                Start = id[i] - i % RowSize - Col;
            } else {
                Start = id[i] - i;
            }
            break;
        }
    }

    let l = 0;
    let r = RowSize;

    while (r - 1 > l) {
        for (let i = 0; i < r - 1 - l; ++i) {
            let top = l;
            let bottom = r - 1;
            let TopLeft = id[top * RowSize + l + i];
            id[top * RowSize + l + i] = id[(bottom - i) * RowSize + l];
            id[(bottom - i) * RowSize + l] = id[bottom * RowSize + r - 1 - i];
            id[bottom * RowSize + r - 1 - i] = id[(top + i) * RowSize + r - 1];
            id[(top + i) * RowSize + r - 1] = TopLeft;
        }
        --r;
        ++l;
    }

    for (let i = 0; i < RowSize * RowSize; ++i) {
        if (id[i] != 0) {
            id[i] = Start;
            RColor(id[i]);
        }
        if ((i + 1) % RowSize == 0) {
            Start += Col - RowSize + 1;
        } else {
            ++Start;
        }
    }
}

StartButton.onclick = function() {
    score = 0;
    scoreT.innerHTML = '0';
    for (let i = 1; i < Col * Row + 1; ++i) {
        document.getElementById('div' + i).style.background = 'rgba(16, 8, 136, 0.3)';
        document.getElementById('div' + i).style.boxShadow = 'none';
    }
    let a = Math.floor(Math.random() * 10) % Shapes.length;
    id = [...Shapes[a]];

    LS.style.display = 'none';
    WS.style.display = 'none';
    StartButton.style.display = 'none';
    StopButton.style.display = 'block';

    Down = setInterval(function() {
        if (!ToDown()) {
            score += 10;

            for (let i = 1; i <= Col * 3; ++i) {
                if (document.getElementById('div' + i).style.background != 'rgba(16, 8, 136, 0.3)') {
                    lose();
                    break;
                }
            }

            for (let i = 3; i <= Row; ++i) {
                let clear = true;
                for (let j = 1; j <= Col; ++j) {
                    if (document.getElementById('div' + (Col * (i - 1) + j)).style.background == 'rgba(16, 8, 136, 0.3)') {
                        clear = false;
                        break;
                    }
                }
                if (clear) {
                    score += 100;
                    for (let j = 1; j <= Col; ++j) {
                        BColor(Col * (i - 1) + j);
                    }
                    for (let k = i; k > 0; --k) {
                        for (let j = 1; j <= Col; ++j) {
                            if (document.getElementById('div' + (Col * (k - 1) + j)).style.background != 'rgba(16, 8, 136, 0.3)') {
                                BColor(Col * (k - 1) + j);
                                RColor(Col * k + j);
                            }
                        }
                    }
                }
            }
            let a = Math.floor(Math.random() * 10) % (Shapes.length);
            id = [...Shapes[a]];
            scoreT.innerHTML = score;
        }
    }, 1000);

    Up.onclick = rotate;
    Bottom.onclick = ToDown;
    Left.onclick = ToLeft;
    Right.onclick = ToRight;
    document.onkeydown = function(key) {
        if (key.key == "ArrowRight" || key.key.toLowerCase() == "d") {
            ToRight();
        } else if (key.key == "ArrowLeft" || key.key.toLowerCase() == "a") {
            ToLeft();
        } else if (key.key == "ArrowDown" || key.key.toLowerCase() == "s") {
            ToDown();
        } else if (key.key == "ArrowUp" || key.key.toLowerCase() == "w") {
            rotate();
        }
    }
}

function lose() {
    StartButton.style.display = 'block';
    StopButton.style.display = 'none';
    clearInterval(Down);

    // Award XP based on score
    const earnedXP = Math.floor(score);
    const earnedSP = Math.floor(score / 500);
    addXP(earnedXP);

    if (score > bestScore) {
        bestScore = score;
        BscoreT.innerHTML = bestScore;
        WS.style.display = 'block';
        setTimeout(() => WS.style.display = 'none', 3000);
    } else {
        LS.style.display = 'block';
        setTimeout(() => LS.style.display = 'none', 3000);
    }

    document.getElementById('gameSkillPoints').textContent = skillPoints;

    Up.onclick = function() {}
    Bottom.onclick = function() {}
    Left.onclick = function() {}
    Right.onclick = function() {}
    document.onkeydown = function() {}
}

StopButton.onclick = lose;