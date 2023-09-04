const wordText = document.querySelector(".word"),
hintText = document.querySelector(".hint span"),
timeText = document.querySelector(".time b"),
inputField = document.querySelector("input"),
refreshBtn = document.querySelector(".refresh-word"),
checkBtn = document.querySelector(".check-word");

let correctWord, timer;

const initTimer = maxTime => {
    clearInterval(timer);
    timer = setInterval(() => {
        if(maxTime > 0) {
            maxTime--;
            return timeText.innerText = maxTime;
        }
        alert(`Time off! ${correctWord.toUpperCase()} was the correct word`);
        initGame();
    }, 1000);
}

const initGame = () => {
    initTimer(30);
    let randomObj = words[Math.floor(Math.random() * words.length)]; //calls random word from words.js
    let wordArray = randomObj.word.split("");   // splits word into array
    for (let i = wordArray.length - 1; i > 0; i--) {  // randomizes letter order
        let j = Math.floor(Math.random() * (i + 1));
        [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
    }
    wordText.innerText = wordArray.join(""); //combines word
    hintText.innerText = randomObj.hint;  // pulls hint from chosen word
    correctWord = randomObj.word.toLowerCase();;  
    inputField.value = "";
    inputField.setAttribute("maxlength", correctWord.length);
}
initGame();

const checkWord = () => {   //check if correct word
    let userWord = inputField.value.toLowerCase();
    if(!userWord) return alert("Please enter the word to check!");  // no word response
    if(userWord !== correctWord) return alert(`Oops! ${userWord} is not a correct word`); // incorrect word response
    alert(`Congrats! ${correctWord.toUpperCase()} is the correct word`);  // correct word response
    initGame();
}

refreshBtn.addEventListener("click", initGame);
checkBtn.addEventListener("click", checkWord);