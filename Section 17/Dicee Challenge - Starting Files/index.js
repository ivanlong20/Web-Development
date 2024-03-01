function refreshMe() {
  var diceP1, diceP2;
  diceP1 = Math.ceil(6 * Math.random());
  diceP2 = Math.ceil(6 * Math.random());
  console.log(diceP1);
  console.log(diceP2);
  document
    .querySelector(".img1")
    .setAttribute("src", "./images/dice" + diceP1 + ".png");
  document
    .querySelector(".img2")
    .setAttribute("src", "./images/dice" + diceP2 + ".png");
  if (diceP1 > diceP2) {
    document.querySelector("h1").textContent = "🚩Player 1 Wins!";
  } else if (diceP2 > diceP1) {
    document.querySelector("h1").textContent = "Player 2 Wins! 🚩";
  } else if (diceP1 === diceP2) {
    document.querySelector("h1").textContent = "Draw!";
  }
}

refreshMe();
