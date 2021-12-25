const drawingBoard = document.querySelector(".drawing-container");
const resetButton = document.querySelector(".clear");
const submitButton = document.getElementById("submit");
let boardNodes;
let squaresNumber = 16;

function drawBoard(squaresNumber) {
  drawingBoard.setAttribute(
    "style",
    `grid-template-columns:repeat(${squaresNumber},1fr);`
  );
  for (i = 0; i < squaresNumber ** 2; i++) {
    newDiv = document.createElement("div");
    drawingBoard.appendChild(newDiv);
  }
  boardNodes = document.querySelectorAll(".drawing-container div");
}

//Function to make the drawing board change colours on hover//
function interactiveBoard() {
  boardNodes.forEach((boardNode) =>
    boardNode.addEventListener("mouseover", (e) => {
      e.target.classList.add("paint-it");
    })
  );
}

function eraseBoard() {
  boardNodes.forEach((boardNode) => {
    boardNode.classList.remove("paint-it");
  });
}
function resetBoard() {
  while (drawingBoard.firstChild) {
    drawingBoard.removeChild(drawingBoard.firstChild);
  }
  drawBoard(squaresNumber);
  interactiveBoard();
}

//Initial 16 squares drawing board
drawBoard(squaresNumber);
interactiveBoard();
/////////////////////////////////////////

resetButton.addEventListener("click", eraseBoard);

submitButton.addEventListener("click", (e) => {
  if (document.getElementById("squares_number").value) {
    eraseBoard();
    squaresNumber = document.getElementById("squares_number").value;
    resetBoard();
  }
  // if (document.getElementById("darken_mode").checked) {
  //   eraseBoard();

  // }
});
