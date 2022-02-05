const btn = document.getElementById('btn');
const generatedNumber = document.getElementById('generated-number');
const calledList = document.getElementById('called-list');
const filledInModeBtn = document.getElementById('filled-in-mode');
const hiddenModeBtn = document.getElementById('hidden-mode');
const confettiEffect = document.getElementById('my-canvas');
const volumeWrapper = document.getElementById('volume-wrapper');
const volumeIcon = document.getElementById('volume-icon');
const rangeIcon = document.getElementById('range-icon');

const gameSelector = document.getElementById('game-selector');
const shortGameBtn = document.getElementById('short-game-btn');
const mediumGameBtn = document.getElementById('medium-game-btn');
const longGameBtn = document.getElementById('long-game-btn');

//a soon-to-be array of numbers
let numbers = [];
//an array of used numbers
let usedNumbers = [];
//the generated number - we'll talk about this later
let result = 0;
let listItem = 0;
let toggle = false;
let audioToggle = true;

let gameSize = 0;

shortGameBtn.addEventListener('click', shortGame);
mediumGameBtn.addEventListener('click', mediumGame);
longGameBtn.addEventListener('click', longGame);

document.getElementById('close').addEventListener('click', startGame);

function startGame() {
  if (gameSize == 25) {
    shortGame();
    filledInModeSetup();
  } else if (gameSize == 50) {
    mediumGame();
    filledInModeSetup();
  } else if (gameSize == 75) {
    longGame();
    filledInModeSetup();
  } else {
    document.getElementById('game-size-warning').classList.toggle('hide');
  }
}

function shortGame() {
  gameSize = 25;
  shortGameBtn.classList.add('game-size-item-selected');
  mediumGameBtn.classList.remove('game-size-item-selected');
  longGameBtn.classList.remove('game-size-item-selected');
}

function mediumGame() {
  gameSize = 50;
  shortGameBtn.classList.remove('game-size-item-selected');
  mediumGameBtn.classList.add('game-size-item-selected');
  longGameBtn.classList.remove('game-size-item-selected');
}
function longGame() {
  gameSize = 75;
  shortGameBtn.classList.remove('game-size-item-selected');
  mediumGameBtn.classList.remove('game-size-item-selected');
  longGameBtn.classList.add('game-size-item-selected');
}

//volume button stuff
function volumeSwap() {
  if (audioToggle == true) {
    volumeIcon.src = 'images/sound_off.svg';
    audioToggle = false;
    console.log('sound is off');
  } else if (audioToggle == false) {
    volumeIcon.src = 'images/sound_on.svg';
    audioToggle = true;
    console.log('sound is on');
  }
}

volumeWrapper.addEventListener('click', volumeSwap);
btn.addEventListener('click', filledInModeSetup);

//filled mode stuff
function filledInModeSetup() {
  for (i = 1; i <= gameSize; i++) {
    numbers.push(i);
    listItem = document.createElement('li');
    calledList.appendChild(listItem);
    listItem.classList.add('list-item');
    listItem.innerHTML = i;
    listItem.id = 'li' + i;
  }
  gameSelector.classList.toggle('hide');
  if (toggle == false) {
    if (!confettiEffect.classList.contains('hide')) {
      confettiEffect.classList.toggle('hide');
    }
    toggle = true;
    numbers = [];
    usedNumbers = [];
    calledList.innerHTML = '';
    document.getElementById('btn-text').innerHTML = 'generate number';
    btn.removeEventListener('click', filledInModeSetup);
    btn.addEventListener('click', fillNumber);

    if (audioToggle == true) {
      playAudio(start);
    }

    for (i = 1; i <= gameSize; i++) {
      numbers.push(i);
      listItem = document.createElement('li');
      calledList.appendChild(listItem);
      listItem.classList.add('list-item');
      listItem.innerHTML = i;
      listItem.id = 'li' + i;
    }
  } else {
    numbers = [];
    usedNumbers = [];
    calledList.innerHTML = '';
    btn.addEventListener('click', fillNumber);
    btn.removeEventListener('click', filledInModeSetup);

    for (i = 1; i <= gameSize; i++) {
      numbers.push(i);
      listItem = document.createElement('li');
      calledList.appendChild(listItem);
      listItem.classList.add('list-item');
      listItem.innerHTML = i;
      listItem.id = 'li' + i;
    }
  }
  return;
}

let mostRecent = 0;

function fillNumber() {
  let result = getRandomInt(1, gameSize);
  //if result isn't in the usedNumber array
  if (usedNumbers.indexOf(result) === -1) {
    usedNumbers.push(result);
    //change main number text
    generatedNumber.innerHTML = result;
    mostRecent = usedNumbers.slice(-1);
    document.getElementById('li' + String(mostRecent)).classList.add('recent-color');
    let previousNumber = document.getElementById('li' + String(usedNumbers[usedNumbers.length - 2]));
    let twoAgo = document.getElementById('li' + String(usedNumbers[usedNumbers.length - 3]));

    if (usedNumbers.length >= 2) {
      previousNumber.classList.replace('recent-color', 'one-ago');
    }

    document.getElementById('li' + String(mostRecent)).classList.add('triggered');

    btn.blur();
    if (audioToggle == true) {
      playAudio(bing);
    }
  }
  // if result exists in the usedNumers array
  else if (usedNumbers.indexOf(result) > -1 && usedNumbers.length <= gameSize - 2) {
    console.log(`${result} was already called`);
    fillNumber();
  } else {
    console.log('game over!');
    generatedNumber.innerHTML = 'Game Over!';
    document.getElementById('btn-text').innerHTML = 'restart';
    btn.addEventListener('click', filledInModeSetup);
    btn.removeEventListener('click', fillNumber);
    toggle = false;
    confettiEffect.classList.toggle('hide');
    gameSize = 0;
  }
  return;
}

//create a random number
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

//Audio Function
function playAudio(sfx) {
  sfx.currentTime = 0;
  sfx.play();
}

//spacebar press functionality
document.body.onkeyup = function (e) {
  if (e.keyCode == 32 && toggle == true) {
    fillNumber();

    if (audioToggle == true) {
      playAudio(bing);
    }

    btn.classList.add('triggered');
    setTimeout(() => {
      btn.classList.remove('triggered');
    }, 300);
  } else {
    console.log(`Toggle is set to ${toggle}, so spacebar won't work`);
  }
};

var confettiSettings = { target: 'my-canvas' };
var confetti = new ConfettiGenerator(confettiSettings);
confetti.render();
