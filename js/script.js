// Il computer deve generare 16 numeri casuali tra 1 e 100.
// I numeri non possono essere duplicati.
// In seguito deve chiedere all’utente (100 - 16) volte di inserire un numero alla volta, sempre compreso tra 1 e 100.
// L’utente non può inserire più volte lo stesso numero.
// Se il numero è presente nella lista dei numeri generati, la partita termina, altrimenti si continua chiedendo all’utente un altro numero.
// La partita termina quando il giocatore inserisce un numero “vietato” o raggiunge il numero massimo possibile di numeri consentiti.
// Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha inserito un numero consentito.

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

var bombs = document.getElementById("bombs");
var userNumbers = document.getElementById("user_numbers");

var arrayBombs = [];
var arrayUser = [];

// genero 16 numeri casuali da 1 a 16 tutti diversi
for (var i = 0; i < 16; i++) {
  var pcNumber = randomNUmber(1, 16);
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
  if ((isNaN(userNumber)) || ((userNumber < 1) || (userNumber > 100) || (isThereAlreadyThisNumber(arrayUser, userNumber)))) {
    alert("Errore!");
    userNumber = parseInt(prompt("inserisci il " + (i+1) + "°" + " numero da 1 a 100"));
  }
  // controllo che il numero valido inserito non sia presente tra le bombe
  var isAbomb = isThereAlreadyThisNumber(arrayBombs, userNumber);
  if (isAbomb) {
    // se è presente tra le bombe, HAI PERSO! e finisce il programma
    alert("Hai perso! il numero: " + userNumber + " è una BOMBA!");
    i = 84;
  } else {
    // se il numero valido inserito non è neanche una bomba lo inserisco nell' Array dei numeri inseriti dall'utente
    arrayUser.push(userNumber);
    score++;
  }
}
// se l'utente è stato così fortunato da non beccare mai un numero bomba, HAI VINTO!
if (isAbomb == false) {
  alert("COMPLIMENTI HAI VINTO!");
}
