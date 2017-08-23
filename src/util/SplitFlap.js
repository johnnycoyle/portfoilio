
function getAlphabetLetters(start, end) {
  let arr = [end];
  let index = dictionary[start];

  if (start == end) return [];

  let count = Math.floor(Math.random() * 3) + 2;

  for (let i = count; i > 0; i--) {
    arr.push(alphabet[index+46-i]);
  }
  arr.push(start);
  return arr;
}

function SplitFlap(inputMessages, counter) {

  this.setLetters = (first, last) => {
    this.letters = getAlphabetLetters(first, last);
    this.currentLetter = this.letters.pop();
    this.newLetter = this.letters[this.letters.length - 1];
  }

  this.id = counter;
  this.animation = false;
  this.messages = inputMessages.reverse();
  this.clickSound = new Audio('./assets/click5.wav');
  this.setLetters(this.messages.pop(), this.messages[this.messages.length-1]);


  $(`<div class="flipBoard-container" id="split-flap-${counter}"/>`)
    .appendTo('.main-container');
    
  $(`<div class="flipBoard-frame top-frame-under" id=${"topFrameUnder"+this.id}/>`)
    .appendTo(`#split-flap-${counter}`);

  $(`<div class="flipBoard-frame bottom-frame" id=${"bottomFrame"+this.id}/>`)
    .appendTo(`#split-flap-${counter}`);

  this.topFrame = $(`<div class="flipBoard-frame top-frame" id=${"topFrame"+this.id}/>`)
    .appendTo(`#split-flap-${counter}`)
  
  this.topBackFrame = $(`<div class=".flipBoard-frame top-back-frame" id=${"topBackFrame"+this.id}/>`)
    .appendTo(`#split-flap-${counter}`)

  this.letterSpanTopUnder = 
    $(`<span class="flipBoard-letter-top" id=${"letterSpanTopUnder"+this.id}>`)
    .text(this.newLetter)
    .appendTo(`#${"topFrameUnder"+this.id}`)
    .css('color', 'transparent');

  this.letterSpanTop = 
    $(`<span class="flipBoard-letter-top" id=${"letterSpanTop"+this.id}>`)
    .text(this.currentLetter)
    .appendTo(`#${"topFrame"+this.id}`);

  this.letterSpanBottom = 
    $(`<span class="flipBoard-letter-bottom" id=${"letterSpanBottom"+this.id}>`)
    .text(this.currentLetter)
    .appendTo(`#${"bottomFrame"+this.id}`);

  this.letterSpanTop_back = 
    $(`<span class="flipBoard-letter-top-back" id=${"letterSpanTop_back"+this.id}>`)
    .text(this.newLetter)
    .appendTo(`#${"topBackFrame"+this.id}`);

  this.updateFrameLetters = () => {
    this.currentLetter = this.letterSpanTop.text();
    this.newLetter = this.letters.pop();
    this.letterSpanTop.text(this.currentLetter);
    this.letterSpanBottom.text(this.currentLetter);
    this.letterSpanTop_back.text(this.newLetter);
    this.letterSpanTopUnder.text(this.newLetter);
  }

  this.resetAndPlaySound = () => {
    this.clickSound.currentTime = 0;
    this.clickSound.play();
  }

  this.toggleAnimation = () => {
    if (!this.animation) { 
      $("#topFrame"+this.id).addClass('top-animate');
      $("#topBackFrame"+this.id).addClass('top-back-animate');
      this.animation = true;
    } else {
      $("#topFrame"+this.id).removeClass('top-animate');
      $("#topBackFrame"+this.id).removeClass('top-back-animate');
      this.animation = false;
    }
  }

  this.animateToNextLetter = () => {
      if(!this.animation && this.letters.length) {
        this.updateFrameLetters();
          setTimeout( () => {
            this.toggleAnimation();
            $("#topBackFrame"+this.id).on('animationend', () => {
              if (this.animation) {
                this.resetAndPlaySound();
                this.letterSpanTop.text(this.newLetter);
                this.letterSpanBottom.text(this.newLetter);
                this.toggleAnimation();
                this.topFrame.css('background', 'transparent');
                this.animateToNextLetter();
              }
            });
          }, 1);
      } else this.setLetters(this.messages.pop(), this.messages[this.messages.length-1]);
  }
}