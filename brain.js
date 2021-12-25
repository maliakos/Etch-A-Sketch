const drawingBoard = document.querySelector(".drawing-container");
const resetButton = document.querySelector(".clear");
const submitButton = document.getElementById("submit");
let boardNodes;
let squaresNumber = 16;
let rainbowCounter = 0;

function drawBoard(squaresNumber = 16) {
  if (squaresNumber > 0) {
    drawingBoard.setAttribute(
      "style",
      `grid-template-columns:repeat(${squaresNumber},1fr);`
    );
    for (i = 0; i < squaresNumber ** 2; i++) {
      newDiv = document.createElement("div");
      drawingBoard.appendChild(newDiv);
    }
    boardNodes = document.querySelectorAll(".drawing-container div");
  } else drawBoard(16);
}

//Function to make the drawing board change colours on hover//
function blackWhiteBoard() {
  boardNodes.forEach((boardNode) =>
    boardNode.addEventListener("mouseover", (e) => {
      e.target.classList.add("paint-it");
    })
  );
}

function rainbowBoard() {
  boardNodes.forEach((boardNode) => {
    boardNode.setAttribute(
      "style",
      `background:hsl(0, 0%, 100%);grid-template-columns:repeat(${squaresNumber},1fr);`
    );
    boardNode.addEventListener("mouseover", (e) => {
      rainbowCounter = rainbowCounter == 5 ? 360 : rainbowCounter;
      e.target.setAttribute(
        "style",
        `background:hsl(${360 - 80 * rainbowCounter}, 100%, 50%);`
      );
      ++rainbowCounter;
    });
  });
}

function darkenBoard() {
  boardNodes.forEach((boardNode) => {
    boardNode.setAttribute(
      "style",
      `background:hsl(0, 0%, 100%);grid-template-columns:repeat(${squaresNumber},1fr);`
    );
    boardNode.setAttribute("data-color", 99);
    boardNode.addEventListener("mouseover", (e) => {
      let currentBg = e.target.getAttribute("data-color") - 9;
      if (currentBg > 0) {
        e.target.setAttribute("style", `background:hsl(0, 0%, ${currentBg}%);`);
        e.target.setAttribute("data-color", currentBg);
      }
    });
  });
}

function wipeBoard() {
  boardNodes.forEach((boardNode) => {
    boardNode.classList.remove("paint-it");
    if (
      document.getElementById("darken_mode").checked ||
      document.getElementById("rainbow_mode").checked
    ) {
      boardNodes.forEach((boardNode) => {
        boardNode.setAttribute(
          "style",
          `background:hsl(0, 0%, 100%);grid-template-columns:repeat(${squaresNumber},1fr);`
        );
      });
    }
  });
}
function resetBoard() {
  while (drawingBoard.firstChild) {
    drawingBoard.removeChild(drawingBoard.firstChild);
  }
}

//Initial 16 squares drawing board
drawBoard(squaresNumber);
blackWhiteBoard();
/////////////////////////////////////////

resetButton.addEventListener("click", wipeBoard);

submitButton.addEventListener("click", (e) => {
  let squaresInput = document.getElementById("squares_number").value;
  if (squaresInput && squaresInput > 0 && squaresInput !== squaresNumber) {
    squaresNumber = squaresInput;
    resetBoard();
    drawBoard(squaresNumber);
  }
  if (document.getElementById("darken_mode").checked) {
    resetBoard();
    squaresNumber = squaresInput;
    drawBoard(squaresNumber);
    darkenBoard();
    return;
  }
  if (document.getElementById("rainbow_mode").checked) {
    resetBoard();
    squaresNumber = document.getElementById("squares_number").value;
    drawBoard(squaresNumber);
    rainbowBoard();
    return;
  }
  blackWhiteBoard();
});
