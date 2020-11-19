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


// creo un Array che dovà contenere dei numeri, ovvero le bombe
var arrayBombs = [];
var arrayUser = [];

// devo generare 16 numeri random DIVERSI dal computer, ovvero le bombe
// inserisco i 16 numeri random generati all'interno dell'Array

for (var i = 0; i < 16; i++) {
  var pcNumber = randomNUmber(1, 100);
  var checkPcNumber = isThereAlreadyThisNumber(arrayBombs, pcNumber);
  if (checkPcNumber == true) {
    i--;
  } else {
    arrayBombs.push(pcNumber);
  }
}
console.log(arrayBombs);
// devo chiedere all'utente di inserire per 84 volte un numero tra 1 e 100
var score = 0;
for (var i = 0; i < 5; i++) {
  var userNumber = parseInt(prompt("inserisci il " + (i+1) + "°" + " numero da 1 a 100"));
  if ((isNaN(userNumber)) || ((userNumber < 1) || (userNumber > 100) || (isThereAlreadyThisNumber(arrayUser, userNumber)))) {
    alert("Errore!");
    userNumber = parseInt(prompt("inserisci il " + (i+1) + "°" + " numero da 1 a 100"));
  }
  var isAbomb = isThereAlreadyThisNumber(arrayBombs, userNumber);
  if (isAbomb) {
    alert("Hai perso! il numero: " + userNumber + " è una BOMBA!");
    i = 5;
  } else {
    arrayUser.push(userNumber);
    score++;
  }
}
console.log(score);
// devo assicurarmi che il numero inserita sia intero e non può inserire un numero doppio

// se inserisce un numero già presente nell'Array ha perso e la partita termina

// se si finisco le possibilità di scelta la partita termina e vince

// calcolare il punteggio dell'utente, ogni numero azzeccato equivale ad un punto
