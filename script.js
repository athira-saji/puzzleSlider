
var rows = 3;
var columns = 3;
var currTile;
var otherTile; //blank tile
var turns = 0;
// var imgOrder = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
var imgOrder = ["4", "1", "5", "8", "2", "7", "6", "9", "3"];

window.onload = function() {
    for (let r=0; r < rows; r++) {
        for (let c=0; c < columns; c++) {

            //<img id="0-0" src="1.png">
            let tile = document.createElement("img");
            tile.id = r.toString() + "-" + c.toString();
            tile.src = imgOrder.shift() + ".png";

            //DRAG FUNCTIONALITY
            tile.addEventListener("dragstart", dragStart);  //click an image to drag
            tile.addEventListener("dragover", dragOver);    //moving image around while clicked
            tile.addEventListener("dragenter", dragEnter);  //dragging image onto another one
            tile.addEventListener("dragleave", dragLeave);  //dragged image leaving anohter image
            tile.addEventListener("drop", dragDrop);        //drag an image over another image, drop the image
            tile.addEventListener("dragend", dragEnd);      //after drag drop, swap the two tiles

            document.getElementById("board").append(tile);

        }
    }
}

function dragStart() {
    currTile = this; //this refers to the img tile being dragged
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}

function dragLeave() {

}

function dragDrop() {
    otherTile = this; //this refers to the img tile being dropped on
}

function dragEnd() {
    if (!otherTile.src.includes("1.png")) {
        return;
    }

    let currCoords = currTile.id.split("-"); 
    let r = parseInt(currCoords[0]);
    let c = parseInt(currCoords[1]);

    let otherCoords = otherTile.id.split("-");
    let r2 = parseInt(otherCoords[0]);
    let c2 = parseInt(otherCoords[1]);

    let moveLeft = r == r2 && c2 == c-1;
    let moveRight = r == r2 && c2 == c+1;

    let moveUp = c == c2 && r2 == r-1;
    let moveDown = c == c2 && r2 == r+1;

    let isAdjacent = moveLeft || moveRight || moveUp || moveDown;

    if (isAdjacent) {
        let currImg = currTile.src;
        let otherImg = otherTile.src;

        currTile.src = otherImg;
        otherTile.src = currImg;

        turns += 1;
        document.getElementById("turns").innerText = turns;
    }
    checkWin();
}

const peekBtn = document.getElementById('peekBtn');
const answerImage = document.getElementById('answerImage');

peekBtn.addEventListener('click', () => {
  if (answerImage.style.display === 'none' || answerImage.style.display === '') {
    answerImage.style.display = 'block';
    peekBtn.textContent = 'Hide Answer';
  } else {
    answerImage.style.display = 'none';
    peekBtn.textContent = 'Show Answer';
  }
});

function checkWin() {
    let tiles = document.querySelectorAll("#board img");
    let isSolved = true;

    for (let i = 0; i < tiles.length; i++) {
        let src = tiles[i].src;
        let expected = (i + 1) + ".png";
        if (!src.includes(expected)) {
            isSolved = false;
            break;
        }
    }

    if (isSolved) {
        let msg = document.getElementById("congratsMessage");
        msg.textContent = "You solved the puzzle!!!";
        msg.style.display = "block";
    }
}

