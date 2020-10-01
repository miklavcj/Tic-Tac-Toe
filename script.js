let numberOfClicks = 0;

/*=== Board ===*/
let gameBoard = (() => {
  let board = ["", "", "", "", "", "", "", "", ""];

  return { board };
})();

/*=== Players ===*/

const playerFactory = (name) => {
  return { name };
};

let player1 = "";
let player2 = "";

/*=== Display ===*/

let displayController = (() => {
  let landingPage = document.querySelector("#landing-page");
  let gamePage = document.querySelector("#game-page");
  let commentLine = document.querySelector("#comment-line");
  let startButton = document.querySelector("#start-game");
  let newGame = document.querySelector("#new-game");
  let changePlayers = document.querySelector("#change-players");

  let startGame = function () {
    if (
      document.querySelector("#player1").value === "" ||
      document.querySelector("#player2").value === ""
    ) {
      alert("Please input Player names");
    } else {
      player1 = document.querySelector("#player1").value;
      player2 = document.querySelector("#player2").value;
      landingPage.style.display = "none";
      gamePage.style.display = "flex";
      generateGrid();
      gameLogic.determineSymbol();
      cellClick();
      return { player1, player2 };
    }
  };

  let gameReset = () => {
    numberOfClicks = 0;
    let gridContainer = document.querySelector("#gridContainer");
    gridContainer.remove();
    gameBoard.board = ["", "", "", "", "", "", "", "", ""];
    generateGrid();
    gameLogic.determineSymbol();
    cellClick();
  };

  let playerReset = () => {
    document.querySelector("#players").reset();
    landingPage.style.display = "flex";
    gamePage.style.display = "none";
    let gridContainer = document.querySelector("#gridContainer");
    gridContainer.remove();
    gameBoard.board = ["", "", "", "", "", "", "", "", ""];
  };

  startButton.addEventListener("click", startGame);
  newGame.addEventListener("click", gameReset);
  changePlayers.addEventListener("click", playerReset);

  let generateGrid = function () {
    let canvas = document.querySelector("#canvas");

    let gridContainer = document.createElement("DIV");
    gridContainer.setAttribute("id", "gridContainer");
    canvas.appendChild(gridContainer);

    let i = 0;
    gameBoard.board.forEach((cell) => {
      let boardCell = document.createElement("DIV");
      boardCell.setAttribute("id", `${i}`);
      boardCell.classList.add("cell");
      boardCell.textContent = gameBoard.board[i];
      gridContainer.appendChild(boardCell);
      i++;
    });
  };

  let cellClick = () => {
    let cells = document.querySelectorAll(".cell");
    cells.forEach((cell) =>
      cell.addEventListener("click", () => {
        if (cell.innerHTML === "") {
          numberOfClicks++;
          cell.innerHTML = gameLogic.determineSymbol();
          let num = cell.getAttribute("id");
          let symbol = cell.innerHTML;
          gameBoard.board[num] = symbol;
        }
        gameLogic.checkForWinner();
      })
    );
  };

  return { commentLine, generateGrid };
})();

/*=== Game Logic ===*/

let gameLogic = (() => {
  let determineSymbol = () => {
    let nextSymbol = "";
    if (numberOfClicks === 0 || numberOfClicks % 2 === 0) {
      nextSymbol = "O";
      displayController.commentLine.innerHTML = `It's ${player1}'s turn.`;
    } else {
      nextSymbol = "X";
      displayController.commentLine.innerHTML = `It's ${player2}'s turn.`;
    }
    return nextSymbol;
  };

  let checkForWinner = () => {
    let gridContainer = document.querySelector("#gridContainer");
    // check for draw
    let checkForDraw = () => {
      if (
        gameBoard.board[0] !== "" &&
        gameBoard.board[1] !== "" &&
        gameBoard.board[2] !== "" &&
        gameBoard.board[3] !== "" &&
        gameBoard.board[4] !== "" &&
        gameBoard.board[5] !== "" &&
        gameBoard.board[6] !== "" &&
        gameBoard.board[7] !== "" &&
        gameBoard.board[8] !== ""
      ) {
        displayController.commentLine.innerHTML = "It's a draw";
      }
    };

    // Check for three in a row
    for (let i = 0; i < 7; i += 3) {
      if (
        gameBoard.board[i] === gameBoard.board[i + 1] &&
        gameBoard.board[i] === gameBoard.board[i + 2]
      ) {
        if (gameBoard.board[i] === "X") {
          displayController.commentLine.innerHTML = `${player1} has won.`;
          gridContainer.setAttribute("style", "pointer-events:none");
        } else if (gameBoard.board[i] === "O") {
          displayController.commentLine.innerHTML = `${player2} has won.`;
          gridContainer.setAttribute("style", "pointer-events:none");
        }
      } else {
        checkForDraw();
      }
    }

    // Check for three in a column
    for (let i = 0; i < 3; i += 1) {
      if (
        gameBoard.board[i] === gameBoard.board[i + 3] &&
        gameBoard.board[i] === gameBoard.board[i + 6]
      ) {
        if (gameBoard.board[i] === "X") {
          displayController.commentLine.innerHTML = `${player1} has won.`;
          gridContainer.setAttribute("style", "pointer-events:none");
        } else if (gameBoard.board[i] === "O") {
          displayController.commentLine.innerHTML = `${player2} has won.`;
          gridContainer.setAttribute("style", "pointer-events:none");
        }
      } else {
        checkForDraw();
      }
    }

    // Check for three in a diagonal
    if (
      gameBoard.board[0] === gameBoard.board[4] &&
      gameBoard.board[0] === gameBoard.board[8]
    ) {
      if (gameBoard.board[0] === "X") {
        displayController.commentLine.innerHTML = `${player1} has won.`;
        gridContainer.setAttribute("style", "pointer-events:none");
      } else if (gameBoard.board[0] === "O") {
        displayController.commentLine.innerHTML = `${player2} has won.`;
        gridContainer.setAttribute("style", "pointer-events:none");
      }
    } else if (
      gameBoard.board[2] === gameBoard.board[4] &&
      gameBoard.board[2] === gameBoard.board[6]
    ) {
      if (gameBoard.board[2] === "X") {
        displayController.commentLine.innerHTML = `${player1} has won.`;
        gridContainer.setAttribute("style", "pointer-events:none");
      } else if (gameBoard.board[2] === "O") {
        displayController.commentLine.innerHTML = `${player2} has won.`;
        gridContainer.setAttribute("style", "pointer-events:none");
      }
    } else {
      checkForDraw();
    }
  };

  return { determineSymbol, checkForWinner };
})();
