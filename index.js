let min = 1;
let max = 10;
let winningNumber = getWinningNumber(min, max);
let chancesLeft = 3;

const minNumber = document.querySelector("span#min-num");
const maxNumber = document.querySelector("span#max-num");
const guessInput = document.querySelector("input#guess-input");
const guessSubmit = document.querySelector("#guess-submit-btn");
const message = document.querySelector("p.message");

//SET MIN AND MAX TEXT

minNumber.textContent = min;
maxNumber.textContent = max;

//GET RANDOM WINNING NUMBER
function getWinningNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

guessSubmit.addEventListener("click", function (e) {
  const guess = Number(guessInput.value);

  if (e.target.value === "submit") {
    // VALIDATE GUESSED NUMBER
    if (guess < min || guess > max || isNaN(guess)) {
      setMessage(`Please enter a number between ${min} & ${max}`, "red");
    }

    // WON CASE
    else if (guess === winningNumber) {
      gameOver(true, `${winningNumber} is correct.YOU WON!`, "green");
    }

    //LOSE CASE
    else if (guess !== winningNumber) {
      chancesLeft -= 1;

      //RETRY CASE
      if (chancesLeft > 0) {
        guessInput.value = "";
        setMessage(
          `${guess}  is not correct. you still have ${chancesLeft} attempts left.`,
          "red"
        );
      }

      // DISPLAY WINNING NUMBER ON RAN OUT OF ATTEMPTS
      else if (chancesLeft === 0) {
        gameOver(
          false,
          `GAME OVER.YOU LOST.${winningNumber} is the correct number.`
        );
      }
    }
  }

  // PLAY AGAIN CASE
  else {
    playAgain();
  }
});

function gameOver(won, msg) {
  const color = won ? "green" : "red";
  guessInput.disabled = true;
  guessInput.style.borderColor = color;
  guessSubmit.value = won ? "Play Again" : "Try Again";
  setMessage(msg, color);
}

function playAgain() {
  location.reload();
  guessSubmit.value = "submit";
  guessInput.disabled = false;
  message.textContent = "";
  guessInput.value = "";
  chancesLeft = 3;
}

function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}
