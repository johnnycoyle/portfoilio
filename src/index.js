let board;
let max; 



function runAnimation(el) {

  let delay = Math.floor(Math.random()*300)+10;

  setTimeout( () => {
    el.animateToNextLetter();
  }, delay);
}

function buildBoard(messages) {

  let board = [];
  let messageLetterArray;

  max = 0;

  messages.forEach((message, j) => {
    if (message.length > max) max = message.length;
  })

  for (let i = 0; i < max; i++) {
    messageLetterArray = [];
    for (let j = 0; j < messages.length; j++ ){
      messageLetterArray.push(messages[j][i] || ' ');
    }
    board.push( new SplitFlap(messageLetterArray, i)); 
  }
  
  return board;
}

function updateBoard(message, cycleCount) {
  for (let i = 0; i < board.length; i ++){
    board[i].addMessage(message[i], cycleCount);
  }
  animateBoard();
}

const dictionary = createDictionary();

function animateBoard(cycleCount) {
  board.forEach(frame => {
    frame.canAnimate() && runAnimation(frame);
  })
}

boardState = 'none';
hoverState = 'none';

function updateBoardState(type, change, cycleCount) { 
  if (type === 'hover' ) hoverState = change;
  else { boardState = change; hoverState = change; }
  updateBoard(boardDisplay[hoverState][boardState], cycleCount);
}

let otherColor = '#eceb75';

$(document).ready(function(){

  $('.main-container').fadeIn(200);

  board = buildBoard(boardText);
  
  updateBoard(startText);

  $('#menu-work-button').on('mouseenter', () => {
    updateBoardState('hover', 'work', 0);
    // for (let i = 0; i < 6; i++) {
    //   board[i].changeColor(otherColor,otherColor);
    // }
  });

  $('#menu-work-button').on('mouseleave', () => {
    updateBoardState('hover', 'none');
    // for (let i = 1; i < 5; i++) {
    //   board[i].changeColor('#a9a9ab','#d9d9da');
    // }
  });

  $('#menu-about-button').on('mouseenter', () => {
    updateBoardState('hover', 'about', 0);
    // for (let i = 6; i < 13; i++) {
    //   board[i].changeColor(otherColor,otherColor);
    // }
  });

  $('#menu-about-button').on('mouseleave', () => {
    updateBoardState('hover', 'none');
    // for (let i = 7; i < 12; i++) {
    //   board[i].changeColor('#a9a9ab','#d9d9da');
    // }
  });

  $('#menu-contact-button').on('mouseenter', () => {
    updateBoardState('hover', 'contact', 0);
    // for (let i = 13; i < 22; i++) {
    //   board[i].changeColor(otherColor,otherColor);
    // }
  });

  $('#menu-contact-button').on('mouseleave', () => {
    updateBoardState('hover', 'none');
    // for (let i = 13; i < 22; i++) {
    //   board[i].changeColor('#a9a9ab','#d9d9da');
    // }
  });

  $('#menu-work-button').on('click', () => {
    updateBoardState('board', 'work',6)
  });

  $('#menu-about-button').on('click', () => {
    updateBoardState('board', 'about',6)
  });

  $('#menu-contact-button').on('click', () => {
    updateBoardState('board', 'contact',6)
  });

});


