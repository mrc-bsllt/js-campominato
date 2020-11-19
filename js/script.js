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

var difficult = document.getElementById("bombs");
var button = document.getElementById("button");
var bombs = document.getElementById("bombs");
var userNumbers = document.getElementById("user_numbers");

button.addEventListener("click",
  function() {

    var arrayBombs = [];
    var arrayUser = [];

    // IMPOSTO IL BONUS
    // switch (difficult) {
    //   case "Easy";
    //     pcNumber = randomNUmber(1, 100);
    //     break;
    //   case "Normal";
    //     pcNumber = randomNUmber(1, 80);
    //     break;
    //   case "Hard";
    //     pcNumber = randomNUmber(1, 50);
    //     break;
    // }

    // genero 16 numeri casuali da 1 a 100 tutti diversi
    for (var i = 0; i < 16; i++) {
      var pcNumber = randomNUmber(1, 100);
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
    for (var i = 0; i < 84; i++) {
      // chiedo all'utente di inserire un numero
      var userNumber = parseInt(prompt("inserisci il " + (i+1) + "°" + " numero da 1 a 100"));
      // se il numero inserito non è un numero, non è compreso da 1 a 10 e non è già stato inserito, errore!
      while ((isNaN(userNumber)) || ((userNumber < 1) || (userNumber > 100) || (isThereAlreadyThisNumber(arrayUser, userNumber)))) {
        alert("Errore!");
        userNumber = parseInt(prompt("inserisci il " + (i+1) + "°" + " numero da 1 a 100"));
      }
      // controllo che il numero valido inserito non sia presente tra le bombe
      var isAbomb = isThereAlreadyThisNumber(arrayBombs, userNumber);
      if (isAbomb) {
        // se è presente tra le bombe, HAI PERSO! e finisce il programma
        alert("Hai perso! il numero: " + userNumber + " è una BOMBA!");
        userNumbers.innerHTML += "<li class='red'>" + userNumber + "</li>";
        bombs.className = "red";
        bombs.innerHTML = userNumber;
        i = 84;
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
  }
);
