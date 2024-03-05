var board = [];
var solution = [];

var tileSelected = null;
var numSelected = null;
var errors = 0;
var board = [
    "--74916-5",
    "2---6-3-9",
    "-----7-1-",
    "-586----4",
    "--3----9-",
    "--62--187",
    "9-4-7---2",
    "67-83----",
    "81--45---"
]

var solution = [
    "387491625",
    "241568379",
    "569327418",
    "758619234",
    "123784596",
    "496253187",
    "934176852",
    "675832941",
    "812945763"
]

window.onload = function() {
    setGame();
}

function setGame() {
    // Digits 1 - 9
    for (let i = 1; i <= 9; i++) {
        let number = document.createElement("div");
        number.id = i;
        number.innerText = i;
        number.addEventListener("click", selectNumber);
        number.classList.add("number");
        document.getElementById("digits").appendChild(number);
    }

    // Board
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            if (board[r][c] != "-") {
                tile.innerText = board[r][c];
                tile.classList.add("tile-start");
            }
            if (r == 2 || r == 5) {
                tile.classList.add("horizontal-line");
            }
            if (c == 2 || c == 5) {
                tile.classList.add("vertical-line");
            }

            tile.addEventListener("click", selectTile);
            tile.classList.add("tile");
            document.getElementById("board").append(tile);
        }
    }
}

function selectNumber () {
    if (numSelected != null) {
        numSelected.classList.remove("number-selected");
    }
    numSelected = this;
    numSelected.classList.add("number-selected");
}

function selectTile () {
    if (numSelected) {
        if (this.innerText != "") {
            return;
        }
        this.innerText = numSelected.id;
        let coords = this.id.split("-");
        let r = parseInt(coords[0]);
        let c = parseInt(coords[1]);

        if (solution[r][c] == numSelected.id) {
            this.innerText = numSelected.id;
        }
        else {
            errors += 1;
            document.getElementById("errors").innerText = errors;
        }
    }
}

function generateBoard () {
    grid = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],        
    ]

}

function getRandomNumber() {
    return Math.floor(Math.random() * 9) + 1;
}

function fillBox (row, col) {
    let num = 0;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; i < 3; j++) {
            while (true){
                num = getRandomNumber();
                if (notUsedInBox(row, col, num)) {
                    break;
                }
            }
        }
    }
}

function fillDiagonal () {
    for (let i = 0; i < 3; i++) {
        fillBox(i, i)
    }
}

function notUsedInBox (row, col, num) {
    for (let i = 0; i < 3; i++){
        for (let j = 0; i < 3; j++) {
            if(grid[row + i][col + j] === num)
            return false;
        }
    }
    return true;
}

function notUsedInColumn (j, num) {
    for (let i = 0; i < 9; i++){
        if (grid[i][j] === num) {
            return false;
        }
    }
    return true;
}

function notUsedInRow (i, num) {
    for (let j = 0; j < 9; i++){
        if (grid[i][j] === num) {
            return false;
        }
    }
    return true;
}

function checkNum (i, j, num) {
    return (notUsedInBox(i - (i%3), j - (j % 3), num) && notUsedInColumn(j, num) && notUsedInRow(i, num))
}

function fillRemaining (i, j) {
    if (i === 8 && j === 9) {
        return true;
    }

    if (j === 9){
        i += 1;
        j = 0;
    }

    if (grid[i][j] !== 0) {
        return fillRemaining(i, j+1);
    }
    if (gird[i][j] )
}