function getAlphabetLetters(start, end, cycleCount) {
  this.letters = [];
  let arr = [end];
  let index = dictionary[start];

  if (start == end){
    return [];
  }

  console.log('cycleCount:',cycleCount);

  let count = Math.floor(Math.random()*cycleCount)

  for (let i = count; i > 0; i--) {
    arr.push(lowerCase[Math.floor(Math.random() * lowerCase.length)]);
  }
  arr.push(start);
  return arr;
}

function SplitFlap(inputMessages, counter, color='white') {

  this.setLetters = (first, last) => {
    this.letters = getAlphabetLetters(first, last, this.cycleCount);
    this.currentLetter = this.letters.pop();
    this.newLetter = this.letters[this.letters.length - 1];
  }

  this.constructor = () => {

    this.id = counter;
    this.cycleCount = 5;
    this.animation = false;
    this.messages = inputMessages.reverse();
    this.clickSound = new Audio('./assets/click.mp3');
    this.clickSound.volume = .05;
    this.setLetters(this.messages.pop() || ' ', this.messages[this.messages.length-1] || ' ', 5);

    if(counter < 22)
      $(`<div class="flipBoard-container" id="split-flap-${counter}"/>`)
        .appendTo('.menu-panel-container');
    else {
      $(`<div class="flipBoard-container" id="split-flap-${counter}"/>`)
        .appendTo('.main-container');
    }
      
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

    this.letterSpanTop = 
      $(`<span class="flipBoard-letter-top" id=${"letterSpanTop"+this.id}>`)
      .text(this.currentLetter)
      .appendTo(`#${"topFrame"+this.id}`)
      // .css('color', 'papayawhip');

    this.currentLetter = this.letterSpanTop.text();

    this.letterSpanBottom = 
      $(`<span class="flipBoard-letter-bottom" id=${"letterSpanBottom"+this.id}>`)
      .text(this.currentLetter)
      .appendTo(`#${"bottomFrame"+this.id}`)
      // .css('color', color);

    this.letterSpanTop_back = 
      $(`<span class="flipBoard-letter-top-back" id=${"letterSpanTop_back"+this.id}>`)
      .text(this.newLetter)
      .appendTo(`#${"topBackFrame"+this.id}`)
      // .css('color', color);
    
    $('<div class="turn-decorator"/>').appendTo(`#split-flap-${counter}`);

  }

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

  this.addMessage = (newMessage, cycleCount=undefined) => {
    if(cycleCount > -1) {
      this.cycleCount = cycleCount;
      console.log('CYCLE COUNT SET TO:',this.cycleCount)
    }
    if(this.currentLetter !== newMessage) {
      this.setLetters(this.currentLetter || ' ', newMessage || ' ');
    }
  }

  this.animateToNextLetter = () => {
    if(!this.animation && this.letters.length) {
      this.updateFrameLetters();
        setTimeout( () => {
          this.toggleAnimation();
          if(onlyAlphabet.includes(this.newLetter) && this.newLetter == this.newLetter.toUpperCase()) {
            let otherColor = '#eceb75';
            this.newetter = this.newLetter.toLowerCase();
            this.letterSpanTopUnder.css('color', '#ffff72');
            this.letterSpanTop_back.css('color','#dddc4a');
          }
          $("#topBackFrame"+this.id).on('animationend', () => {
            if (this.animation) {
              this.resetAndPlaySound();
              this.letterSpanTop.text(this.newLetter);
              this.letterSpanBottom.text(this.newLetter);
              this.toggleAnimation();
              this.animateToNextLetter();
            }
          });
        }, 1);
      }else {
        if(onlyAlphabet.includes(this.newLetter) && this.newLetter == this.newLetter.toUpperCase()) {
          let otherColor = '#eceb75';
          this.newLetter = this.newLetter.toLowerCase();
          this.changeColor('#dddc4a','#ffff72');
        }else {
          this.changeColor('#a9a9ab', '#d9d9da');
        }
        this.currentLetter = this.letterSpanTop.text();
      }
  }

  this.changeColor = (topColor, bottomColor) => {
    this.letterSpanTop.css({'color': topColor});
    this.letterSpanBottom.css('color', bottomColor);
  }

  this.canAnimate = () => {
    return this.letters.length > 0;
  }

  this.constructor();
}