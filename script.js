const btn = document.getElementById("btn");
const generatedNumber = document.getElementById("generated-number");
const calledList = document.getElementById("called-list");
const filledInModeBtn = document.getElementById("filled-in-mode");
const hiddenModeBtn = document.getElementById("hidden-mode");
const confettiEffect = document.getElementById('my-canvas');

//a soon-to-be array of numbers
let numbers = [];
//an array of used numbers
let usedNumbers = []
//the generated number - we'll talk about this later
let result = 0;
let listItem = 0;
let toggle = false;


btn.addEventListener('click', filledInModeSetup);

for (i = 1; i <= 66; i++) {
  numbers.push(i)
  listItem = document.createElement('li');
  calledList.appendChild(listItem);
  listItem.classList.add("list-item");
  listItem.innerHTML = i;
  listItem.id = 'li'+i;
}




console.log(`Hi! Toggle is currently set to ${toggle}`);

//filled mode stuff
function filledInModeSetup() { 

  if(toggle == false) {

    if(!confettiEffect.classList.contains('hide')) { 
      confettiEffect.classList.toggle('hide')
    }
    
    toggle = true;
    numbers = [];
    usedNumbers = [];
    calledList.innerHTML = '';
    document.getElementById('btn-text').innerHTML =("generate number");
    btn.removeEventListener('click',filledInModeSetup);
    btn.addEventListener("click", fillNumber);
    

    for (i = 1; i <= 66; i++) {
      numbers.push(i)
      listItem = document.createElement('li');
      calledList.appendChild(listItem);
      listItem.classList.add("list-item");
      listItem.innerHTML = i;
      listItem.id = 'li'+i;
    }
  }

  else {
   
 numbers = [];
 usedNumbers =[];
 calledList.innerHTML = '';
 btn.addEventListener('click',fillNumber);
 btn.removeEventListener('click',filledInModeSetup);

  for (i = 1; i <= 67; i++) {
    numbers.push(i)
    listItem = document.createElement('li');
    calledList.appendChild(listItem);
    listItem.classList.add("list-item");
    listItem.innerHTML = i;
    listItem.id = 'li'+i;
  }
}
  
    return;
}


function fillNumber() { 
  newNumber() 
 //if result isn't in the usedNumber array
  if ( usedNumbers.indexOf(result)=== -1) {
    //change main number text
    generatedNumber.innerHTML = result;
    document.getElementById('li'+result).classList.add("list-item-filled");
    usedNumbers.push(result);
    btn.blur();
  }
  // if result exists in the usedNumers array
  else if(usedNumbers.indexOf(result) > -1  && usedNumbers.length <= 65){
    console.log(`${result} was already called`)
    fillNumber();
  }

  else {
    generatedNumber.innerHTML = ("Game Over!");
    document.getElementById('btn-text').innerHTML =("restart")
    btn.addEventListener('click', filledInModeSetup);
    btn.removeEventListener('click', fillNumber);
    toggle = false;
    confettiEffect.classList.toggle('hide');
  }
 return;
 }

 //create a random number
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); 
}

function newNumber() {
  result = getRandomInt(1, 67);
};

 
 document.body.onkeyup = function(e) {
  if(e.keyCode == 32 && toggle == true) { 
    fillNumber();
    btn.classList.add('triggered'); 
    setTimeout(() => {
      btn.classList.remove('triggered')
    }, 300);
  }
  else { 
    console.log(`Toggle is set to ${toggle}, so spacebar won't work`);
  }
}


var confettiSettings = { target: 'my-canvas' };
var confetti = new ConfettiGenerator(confettiSettings);
confetti.render();




// btn.addEventListener("click", generate);














//hidden mode stuff
function hiddenModeSetup() { 
  for (i = 1; i < 68; i++) {
    numbers.push(i)
  }
  calledList.innerHTML = '';
  filledInModeBtn.addEventListener('click', filledInModeSetup);
  console.log('hidden mode clicked')
};

// //generate a list of numbers from 1-67 and populate the 'numbers' array
// for (i = 1; i < 68; i++) {
//   numbers.push(i)
// }




function generate() {
  newNumber();
  //if the number exists in the 'numbers' array, AND doesn't exist in the 'usedNumbers' array
  if ( usedNumbers.indexOf(result)=== -1) {
    //change main number text
    generatedNumber.innerHTML = result;
    let listItem = document.createElement('li');
    listItem.classList.add("list-item");
    listItem.innerHTML = (result);
    calledList.appendChild(listItem);
    usedNumbers.push(result);
  
    if (result < 11) { 
      listItem.classList.add('light-color')
    }
    if  ( result > 10 && result< 20) { 
      listItem.classList.add('light-color-2');
    }
  }
  // if result exists in the usedNumers array
  else if(usedNumbers.indexOf(result) > -1  && usedNumbers.length < 66 ){
    console.log(`${result} was already called`)
    generate();
  }

  else {
    generatedNumber.innerHTML = ("Game Over!");
  }
 return;
};





