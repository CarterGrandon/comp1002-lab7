//each item can be null for empty, 0 for player 1, or 1 for player 2
const boardState = [
    null, null, null,
    null, null, null,
    null, null, null
];

//win condition array
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

//the active player
let activePlayer = 0;

//cells
const cells = document.querySelectorAll("td");

//add event listeners to cell
cells.forEach(function (cell, index) {
    cell.dataset.index = index; //adds index as an attribute on the cell

    cell.onmouseover = function () {
        cell.style.backgroundColor = "yellow";
    }

    cell.onmouseout = function () {
        cell.style.backgroundColor = "#fff";
    }

    cell.addEventListener("click", clicked);
});

//clicked function definition
function clicked (event) {
    const index = Number(event.target.dataset.index);

    const letter = activePlayer ? "o" : "x"; //using ? here makes true set to first option and false set to second option

    const cell = event.target;
    event.target.textContent = letter;

    boardState[index] = activePlayer;

    cell.removeEventListener("click", clicked);
    cell.onmouseover = null;

    if (hasWon()) {
        window.location = "./winner.html";
    }

    if (hasDrawn()) {
        window.location = "./draw.html";
    }

    activePlayer = activePlayer ? 0 : 1;
}

//the win detector
function hasWon () {
    for (const condition of winConditions) {
        const boardValues = condition.map(function (item) {
            return boardState[item];
        });
        
        const playerPieces = boardValues.filter(function (item) {
            return item === activePlayer;
        });

        if (playerPieces.length === 3) return true;
    }

    return false;
}

//the draw detector
function hasDrawn () {
    const boardCapacity = boardState.filter(function (item) {
        return item !== null;
    });

    return boardCapacity.length === boardState.length;
}

//play again
const again = document.querySelector("#again");
if (again) {
    again.onclick = (event) => {
        event.preventDefault();
        window.location = "./index.html";
    }
}