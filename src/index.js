import {createFlipBoardFrame} from './util/SplitFlap';


$(document).ready(function(){
  // createFlipBoardFrame('A','Z');

  $('.main-container').fadeIn(200);

  $('<button class="button">animate</button>').appendTo('.main-container');

  $('.button').on('click', () => {
    animateFlipFrame(0);
  });
});
