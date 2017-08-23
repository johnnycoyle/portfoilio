let board;

function runAnimation(el) {

  let delay = Math.floor(Math.random()*1000)+100;

  setTimeout( () => {
    el.animateToNextLetter();
  }, delay);
}

function buildBoard(messages) {

  let board = [];
  let messageLetterArray;

  let max = 0;

  messages.forEach((message, j) => {
    if (message.length > max) max = message.length;
  })

  for (let i = 0; i < max; i++) {
    messageLetterArray = [];
    for (let j = 0; j < messages.length; j++ ){
      messageLetterArray.push(messages[j][i] || ' ');
    }
    board.push( new SplitFlap(messageLetterArray, i) ); 
  }
  
  return board;
}

const dictionary = createDictionary();

$(document).ready(function(){

  $('.main-container').fadeIn(200);

  board = buildBoard(boardText);

  $('<button class="button">animate</button>').appendTo('.main-container');

  $('.button').on('click', () => {

    board.forEach(frame => {
      runAnimation(frame);
    })

  });
});


