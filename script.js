const resultDisplay = document.querySelector('.result');

let strategy = ["", "", "", "", "", "", "", "", ""];
let gameStatus = true;
let player = "X";

const wonMessage = () => `Congratulatins ! ${player} has won !`;
const drawMessage = () => `Game ended in draw !!!`;
const currentTurn = () => `Now ${player}'s turn`;
const winningPossibility = [[0, 1, 2],[3, 4, 5],[6, 7, 8],[0, 3, 6],[1, 4, 7],[2, 5, 8],[0, 4, 8],[2, 4, 6]];

resultDisplay.innerHTML = currentTurn();

function changePlayer() {
    player = player === "X" ? "O" : "X";
    resultDisplay.innerHTML = currentTurn();
}

function playedCell(clickedCell, clickedCellIndex) {
    strategy[clickedCellIndex] = player;
    clickedCell.innerHTML = player;
}

function validateResult() {
    let gameWon = false;
    for (let i = 0; i <= 7; i++) {
        const win = winningPossibility[i];
        let a = strategy[win[0]];
        let b = strategy[win[1]];
        let c = strategy[win[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            gameWon = true;
            break
        }
    }

    if (gameWon) {
        resultDisplay.innerHTML = wonMessage();
        gameStatus = false;
        return;
    }

    let gameDraw = !strategy.includes("");
    if (gameDraw) {
        gameStatus = false;
        resultDisplay.innerHTML = drawMessage();
        return;
    }

    changePlayer();
}

function clickCell(manageClickedCell) {
    const clickedCell = manageClickedCell.target;
    const clickedIndex = parseInt(clickedCell.getAttribute('cell-index'));

    if (strategy[clickedIndex] !== "" || !gameStatus) {
        return;
    }

    playedCell(clickedCell, clickedIndex);
    validateResult();
}

function restartGame() {
    gameStatus = true;
    player = "X";
    strategy = ["", "", "", "", "", "", "", "", ""];
    resultDisplay.innerHTML = currentTurn();
    document.querySelectorAll('.box').forEach(box => box.innerHTML = "");
}


document.querySelectorAll('.box').forEach(cell => cell.addEventListener('click', clickCell));
document.querySelector('.restart').addEventListener('click', restartGame);