// VARIABLES List of words for player's to guess & play the game!
// ==========================================================================
var wordList = [
  "regular jump",
  "glide",
  "front roll",
  "back roll",
  "frontside spin",
  "backside spin",
  "raley",
  "9111",
  "krypt",
  "krypt to sp",
  "vulcan",
  "vulcan to sp",
  "sbend",
  "blind 313",
  "blind judge",
  "blind 315",
  "blind 317",
  "blind 319",
  "frontside 313",
  "down loop",
  "loop",
  "loop mobe",
  "downloop mobe",
  "sbend",
  "double sbend",
  "hintenberger mobe",
  "double hintenberger mobe",
  "back mobe",
  "front mobe",
  "tantrum",
  "moby dick",
  "whirlybird",
  "slim",
  "s-mobe",
  "kgb",
  "toeside r2b",
  "90210",
  "g-spot",
  "blind pete",
  "scare crow",
  "crow mobe",
  "tootsie roll",
  "dum dum",
  "fruit loop",
  "flavor flip",
  "pete rose"
];

// When computer selects a word at random, it will be the chosen word that the player will have to guess
var chosenWord = "";
// Will break the computer's selected word into letters
var letterInChosenWord = [];
// numBlanks is going to call up the number of blanks in a word
var numBlanks = 0;
// This is an array that will hold whether the user guessed right or wrong.
var blanksAndSuccesses = [];
// An array that stores a player's wrong guesses!
var wrongGuesses = [];

var winCounter = 0;
var lossCounter = 1;
// numGuesses is the counter that tablet's the number of guesses a user makes
var numGuesses = 9;


// FUNCTIONS
// ==============================================================================

function startGame() {
/*
1. select a word at random. X
2. break up random word into letters and replace them with underscores. X
3. Add underscores to the html.
4. numGuesses always equals 9, and blankandsuccess is an empty array, and wrongguesses is an empty array.
*/

wrongGuesses = [];
// console.log("this is wrong guesses in startGame" wrongGuesses);
numGuesses = 9;
blanksAndSuccesses = [];


chosenWord = wordList[Math.floor(Math.random() * wordList.length)];
letterInChosenWord = chosenWord.split("");
numBlanks = letterInChosenWord.length;
console.log(chosenWord);
console.log(numBlanks);

for(var i = 0; i < numBlanks; i++) {
  blanksAndSuccesses.push("_");
}
console.log(blanksAndSuccesses);
document.getElementById('guesses-remain').innerHTML = numGuesses;
document.getElementById('word-blank').innerHTML = blanksAndSuccesses.join(" ");

}

function checkLetters(letter) {

  /*
  1. Compare the letter the player picks with any of the letters in the word.
  2. Setup a conditional statement to determine if the letter the player picked is in the word. If so, do something, if not, do something else.
  3. If the user is wrong, decrease the numGuesses variables by one  
  */

  var letterInWord = false;

  for (var i = 0; i < numBlanks; i++) {
    if (chosenWord[i] === letter) {
      letterInWord = true;

    }          
  }

  if (letterInWord) {
    for (i = 0; i < numBlanks; i++) {
      if(chosenWord[i] === letter) {
        blanksAndSuccesses[i] = letter;
      }
      // console.log("inside checkletter function" blanksAndSuccesses);
    }
  }else {
    numGuesses --;
    wrongGuesses.push(letter);
  }
  /*
  Check if letter is already in the wrong guesses array. Setup an if/else conditional that will run a for loop to iterate
  over all the letters then use the if/else to check if it already exists.
  */
  // console.log("our wrong guess in checkletter function" wrongGuesses);

}

function roundComplete() {

  /*
  1. It's going to update the HTML with letter that are in the word.
  2. Update HTML with guesses player has remaining.
  3. Determine whether the player won the game or not.
  */

  document.getElementById('word-blank').innerHTML = blanksAndSuccesses.join(" ");
  document.getElementById('guesses-remain').innerHTML = numGuesses;
  document.getElementById('wrong-guess').innerHTML = wrongGuesses.join(" ");

  // indexOf is great for searching through data to find specific requested information
  // if(blanksAndSuccesses.indexOf(letter >= 0)){
  //   console.log(letter)
  // }

  console.log(letterInChosenWord);
  console.log(blanksAndSuccesses);
  if(letterInChosenWord.join(" ") === blanksAndSuccesses.join(" ")) {
    winCounter++;
    alert("You win!");
    document.getElementById('win-counter').innerHTML = winCounter;
    startGame();
  }else if(numGuesses === 0){
    document.getElementById('loss-counter').innerHTML = lossCounter ++;
    document.getElementById('wrong-guess').innerHTML = "";
    alert("Out of guesses kook! "+ chosenWord +" was the word!");
    // document.getElementById('wrong-word').innerHTML = chosenWord;
    wrongGuesses = [];
    startGame();
  }



}
startGame();

// MAIN PROCESS
// ==============================================================================

// Captures keyboard input. Depending on the letter pressed it will "call" (execute) different functions.

document.onkeyup = function(event) {
  /*
  1. Take in the letter that player types
  2. Pass letter through the checkLetter function
  */  
  var letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();
  console.log("Typed letter is ", letterGuessed);
  checkLetters(letterGuessed)
  roundComplete();


}

  
