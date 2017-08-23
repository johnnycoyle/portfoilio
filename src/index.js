let board;

function runAnimation(el) {

  let delay = Math.floor(Math.random()*1000)+100;

  // el.animateToNextLetter();

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
    // if (i === 6) console.log('messageLetterArray:',messageLetterArray);
    board.push( new SplitFlap(messageLetterArray, i) ); 
  }
  
  // board.push( new SplitFlap(firstWord[i] || ' ', secondWord[i] || ' ', i) );
  return board;
}

$(document).ready(function(){

  $('.main-container').fadeIn(200);

  let text = 
  "JOHNNY COYLE      "+
  "SOFTWARE ENGINEER "+
  "             WORK "+
  "            ABOUT "+
  "          CONTACT ";


  let orig = 
  "    [ SKILLS ]    "+
  "    REACT REDUX   "+
  "    NODE.JS       "+
  "    UI DESIGN     "+
  "    CRUSHING IT   ";

  let next = 
  "   [ CONTACT  ]   "+
  " JOHNNYCOYLE@GMAIL"+
  "    OFFERS OVER   "+
  "    $1 BILLION    "+
  "       ONLY       ";

  board = buildBoard([' ', text, orig, next, ' ']);

  $('<button class="button">animate</button>').appendTo('.main-container');

  $('.button').on('click', () => {

    board.forEach(frame => {
      runAnimation(frame);
    })

  });
});


