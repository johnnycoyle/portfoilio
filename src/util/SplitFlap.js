
import { dictionary, alphabet } from './Dictionary';

const frameObj = {};
const clickSound = new Audio('./assets/click.mp3');
let letterSpanTop, leterSpanBottom, letterSpanTopUnder, letterSpanTop_back;

function getAlphabetLetters(start, end){
  let index = dictionary[start];
  let arr = [start];

  while(alphabet[index + 1] !== end) {
    arr.push(alphabet[index+1]);
    index++;
  }
  
  arr.push(end);
  return arr;
}

export function createFlipBoardFrame(start, end, counter=0) {
  $('<div class="flipBoard-container"/>').appendTo('.main-container');

  let thisFrame = [];
  let letters = getAlphabetLetters(start,end);

  let frameObj = {};

  thisFrame.push($(`<div class="flipBoard-frame top-frame-under" id=${"topFrameUnder"+counter}/>`));
  thisFrame.push($(`<div class="flipBoard-frame top-frame" id=${"topFrame"+counter}/>`));
  thisFrame.push($(`<div class="flipBoard-frame bottom-frame" id=${"bottomFrame"+counter}/>`));
  thisFrame.push($(`<div class=".flipBoard-frame top-back-frame" id=${"topBackFrame"+counter}/>`));

  thisFrame.forEach(frame => {
    frame.appendTo('.flipBoard-container');
  });

  letters.reverse();
  let letter = letters.pop();
  let newLetter = letters[letters.length - 1];

  letterSpanTopUnder = $(`<span class="flipBoard-letter-top" id=${"letterSpanTopUnder"+counter}>`).text(newLetter);
  letterSpanTopUnder.appendTo(`#${"topFrameUnder"+counter}`);

  letterSpanTop = $(`<span class="flipBoard-letter-top" id=${"letterSpanTop"+counter}>`).text(letter)
  letterSpanTop.appendTo(`#${"topFrame"+counter}`);

  letterSpanBottom = $(`<span class="flipBoard-letter-bottom" id=${"letterSpanBottom"+counter}>`).text(letter)
  letterSpanBottom.appendTo(`#${"bottomFrame"+counter}`);

  letterSpanTop_back = $(`<span class="flipBoard-letter-top-back" id=${"letterSpanTop_back"+counter}>`).text(newLetter)
  letterSpanTop_back.appendTo(`#${"topBackFrame"+counter}`);

  frameObj['topFrame'] = thisFrame[1];
  frameObj['topBackFrame'] = thisFrame[3];
  frameObj['letterSpanTopUnder'] = letterSpanTopUnder;
  frameObj['letterSpanTop'] = letterSpanTop;
  frameObj['letterSpanBottom'] = letterSpanBottom;
  frameObj['letterSpanTop_back'] = letterSpanTop_back;
  frameObj['letters'] = letters;
}

let animation = false;
let letter;
let newLetter;

function animateFlipFrame(counter) {
  let frameObj
  if(!animation) {
    letter = frameObj.letterSpanTop.text();
    newLetter = frameObj.letters.pop();
    frameObj.letterSpanTop.text(letter);
    frameObj.letterSpanBottom.text(letter);
    frameObj.letterSpanTop_back.text(newLetter);
    frameObj.letterSpanTopUnder.text(newLetter);
    setTimeout( () => {
      $('.top-frame').addClass('top-animate');
      $('.top-back-frame').addClass('top-back-animate');
      animation = true;
      $('.top-back-animate').on('animationend', () => {
        if (animation) {
          clickSound.play();
          clickSound.currentTime = 0;
          frameObj.letterSpanTop.text(newLetter);
          frameObj.letterSpanBottom.text(newLetter);
          animation = false;
          frameObj.topFrame.removeClass('top-animate');
          frameObj.topBackFrame.removeClass('top-back-animate');
          if (frameObj.letters.length) animateFlipFrame(counter+1);
        }
      });
    }, 1);
  }
}