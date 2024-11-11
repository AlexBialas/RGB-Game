const squares = document.querySelectorAll(".square");
const colorDisplay = document.getElementById("color-display");
const messageDisplay = document.getElementById("message");
const resetButton = document.getElementById("reset");
const modeButtons = document.querySelectorAll(".mode");

let numSquares = 9;
let colors = [];
let pickedColor;

init();

function init() {
  setupModeButtons();
  setupSquares();
  reset();
}

function setupModeButtons() {
  modeButtons.forEach((button) => {
    button.addEventListener("click", function () {
      modeButtons.forEach((btn) => btn.classList.remove("selected"));
      this.classList.add("selected");
      switch (this.textContent) {
        case "Easy":
          numSquares = 3;
          break;

        case "Hard":
          numSquares = 9;
          break;
      }
      reset();
    });
  });
}

function setupSquares() {
  squares.forEach((square) => {
    square.addEventListener("click", function () {
      const clickedColor = this.style.backgroundColor;
      if (clickedColor === pickedColor) {
        messageDisplay.textContent = "CORRECT";
        changeColors(pickedColor);
        resetButton.textContent = "Play Again?";
      } else {
        this.style.backgroundColor = "#232323";
        messageDisplay.textContent = "TRY AGAIN";
      }
    });
  });
}

function reset() {
  colors = generateRandomColors(numSquares);
  pickedColor = pickColor();
  colorDisplay.textContent = pickedColor;
  messageDisplay.textContent = "";
  resetButton.textContent = "New Colors";

  squares.forEach((square, index) => {
    if (index < numSquares) {
      square.style.display = "block";
      square.style.backgroundColor = colors[index];
    } else {
      square.style.display = "none";
    }
  });
}

resetButton.addEventListener("click", reset);

function changeColors(color) {
  squares.forEach((square) => {
    square.style.backgroundColor = color;
  });
}

function pickColor() {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}

function generateRandomColors(num) {
  const arr = [];
  for (let i = 0; i < num; i++) {
    arr.push(randomColor());
  }
  return arr;
}

function randomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}
