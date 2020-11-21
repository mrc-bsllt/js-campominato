// BONUS: (da fare solo se funziona tutto il resto)
// all’inizio il software richiede anche una difficoltà all’utente che cambia il range di numeri casuali:
// con difficoltà 0 => tra 1 e 100
// con difficoltà 1 =>  tra 1 e 80
// con difficoltà 2 => tra 1 e 50

// ----------------------------funzioni
function randomNUmber (min, max) {
  return Math.floor(Math.random() * (max - min +1) + min);
}

function isThereAlreadyThisNumber (array, number) {
  var result = false;
  for (var i = 0; i < array.length; i++) {
    if (number == array[i]) {
      return result = true;
    }
  }
  return result;
}

// ----------------------------funzioni

var start = document.getElementById("start");
var selectSection = document.getElementById("select_section");
var difficult = document.getElementById("difficult");
var button = document.getElementById("button");
var bombsBlock = document.getElementById("bombs_block");
var bombs = document.getElementById("bombs");
var userBlock = document.getElementById("user_block");
var userNumbers = document.getElementById("user_numbers");
var footer = document.getElementById("footer");
var scoreNumber = document.getElementById("score_number");
var arrayBombs = [];
var arrayUser = [];

start.addEventListener("click",
  function() {
    start.classList.add("hidden");
    selectSection.classList.remove("hidden");
    selectSection.classList.add("show");
  }
);

button.addEventListener("click",
  function() {

    difficult = difficult.value;
    // IMPOSTO IL BONUS
    var maxNumber = 0;
    switch (difficult) {
      case "Easy":
        maxNumber = 100;
        break;
      case "Normal":
        maxNumber = 80;
        break;
      case "Hard":
        maxNumber = 50;
        break;
    }

    bombsBlock.className = "right_to_center";
    userBlock.className = "left_to_center";
    footer.className = "show_slow";

    // genero 16 numeri casuali da 1 a maxNumber tutti diversi
    for (var i = 0; i < 16; i++) {
      var pcNumber = randomNUmber(1, maxNumber);
      var checkPcNumber = isThereAlreadyThisNumber(arrayBombs, pcNumber);
      if (checkPcNumber == true) {
        // se un numero viene duplicato non lo inserisco e decremento la i
        i--;
      } else {
        // inserisco il numero nell' Array delle bombe
        arrayBombs.push(pcNumber);
      }
    }
    console.log(arrayBombs);

    // devo chiedere all'utente di inserire per 84 volte un numero tra 1 e 100
    var score = 0;
    for (var i = 0; i < (maxNumber - 16); i++) {
      // chiedo all'utente di inserire un numero
      var userNumber = parseInt(prompt("inserisci il " + (i+1) + "°" + " numero da 1 a " + maxNumber));
      // se il numero inserito non è un numero, non è compreso da 1 a 10 e non è già stato inserito, errore!
      while ((isNaN(userNumber)) || ((userNumber < 1) || (userNumber > maxNumber) || (isThereAlreadyThisNumber(arrayUser, userNumber)))) {
        alert("Errore!");
        userNumber = parseInt(prompt("inserisci il " + (i+1) + "°" + " numero da 1 a " + maxNumber));
      }
      // controllo che il numero valido inserito non sia presente tra le bombe
      var isAbomb = isThereAlreadyThisNumber(arrayBombs, userNumber);
      if (isAbomb) {
        // se è presente tra le bombe, HAI PERSO! e finisce il programma
        alert("Hai perso! il numero: " + userNumber + " è una BOMBA!");
        userNumbers.innerHTML += "<li class='match'>" + userNumber + "</li>";
        for (var i = 0; i < arrayBombs.length; i++){
          if (arrayBombs[i] == userNumber) {
            bombs.innerHTML += "<li class='match'>" + arrayBombs[i] + "</li>";
          } else {
            bombs.innerHTML += "<li>" + arrayBombs[i] + "</li>";
          }
        }
        i = maxNumber - 16;
      } else {
        // se il numero valido inserito non è neanche una bomba lo inserisco nell' Array dei numeri inseriti dall'utente
        arrayUser.push(userNumber);
        userNumbers.innerHTML += "<li>" + userNumber + "</li>";
        score++;
      }
    }
    // se l'utente è stato così fortunato da non beccare mai un numero bomba, HAI VINTO!
    if (isAbomb == false) {
      alert("COMPLIMENTI HAI VINTO!");
    }
    scoreNumber.innerHTML = score;
  }
);
