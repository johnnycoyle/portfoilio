const dictionary = createDictionary();

function getAlphabetLetters(start, end) {
  let arr;
  let index = dictionary[start];
  arr = [start];

  if (start == end) return [];

  let count = Math.floor(Math.random() * 3) + 2;
  for (let i = 0; i < count; i++) {
    arr.push(alphabet[Math.floor(Math.random()*alphabet.length)]);
  }
  arr.push(end);
  return arr;
}

function SplitFlap(inputMessages, counter) {

  $(`<div class="flipBoard-container" id="split-flap-${counter}"/>`).appendTo('.main-container');

  this.id = counter;
  this.animation = false;
  this.messages = inputMessages.reverse();
  this.clickSound = new Audio('./assets/click5.wav');
  this.letters = getAlphabetLetters(this.messages.pop(), this.messages[this.messages.length - 1]);
  this.letters.reverse();
  this.currentLetter = this.letters.pop();
  this.newLetter = this.letters[this.letters.length - 1];
    if (this.letters.length > 3) {
      this.letters.pop();
      this.letters.pop();
    }

  /////////  create divs and append to parent container  //////////

  let thisFrame = [];

  thisFrame.push($(`<div class="flipBoard-frame top-frame-under" id=${"topFrameUnder"+this.id}/>`));
  thisFrame.push($(`<div class="flipBoard-frame top-frame" id=${"topFrame"+this.id}/>`));
  thisFrame.push($(`<div class="flipBoard-frame bottom-frame" id=${"bottomFrame"+this.id}/>`));
  thisFrame.push($(`<div class=".flipBoard-frame top-back-frame" id=${"topBackFrame"+this.id}/>`));

  this.topFrame = thisFrame[1];
  this.topBackFrame = thisFrame[3];

  thisFrame.forEach(frame => {
    frame.appendTo(`#split-flap-${counter}`);
  });

  /////////  create spans and append to divs  //////////

  this.letterSpanTopUnder = $(`<span class="flipBoard-letter-top" id=${"letterSpanTopUnder"+this.id}>`).text(this.newLetter);
  this.letterSpanTopUnder.appendTo(`#${"topFrameUnder"+this.id}`);

  this.letterSpanTop = $(`<span class="flipBoard-letter-top" id=${"letterSpanTop"+this.id}>`).text(this.currentLetter)
  this.letterSpanTop.appendTo(`#${"topFrame"+this.id}`);

  this.letterSpanBottom = $(`<span class="flipBoard-letter-bottom" id=${"letterSpanBottom"+this.id}>`).text(this.currentLetter)
  this.letterSpanBottom.appendTo(`#${"bottomFrame"+this.id}`);

  this.letterSpanTop_back = $(`<span class="flipBoard-letter-top-back" id=${"letterSpanTop_back"+this.id}>`).text(this.newLetter)
  this.letterSpanTop_back.appendTo(`#${"topBackFrame"+this.id}`);

  this.setLetters = (first, last) => {
    this.letters = getAlphabetLetters(first, last);
    this.letters.reverse();
    this.currentLetter = this.letters.pop();
    this.newLetter = this.letters[this.letters.length - 1];
  }

  this.animateToNextLetter = () => {
    
      if(!this.animation) {

        this.currentLetter = this.letterSpanTop.text();
        this.newLetter = this.letters.pop();
        this.letterSpanTop.text(this.currentLetter);
        this.letterSpanBottom.text(this.currentLetter);
        this.letterSpanTop_back.text(this.newLetter);
        this.letterSpanTopUnder.text(this.newLetter);

        if(Math.random() > .5 && this.letters.length !== 0){
          if (Math.random() > .5) {
            this.letterSpanTop.css('color','red');
            this.letterSpanBottom.css('color','red');
            this.topFrame.css('background', '#A42694');
          } else {
            this.letterSpanTop.css('color','yellow');
            this.letterSpanBottom.css('color','yellow');
            this.topFrame.css('background', '#878A3B');
          }
        } else {
          this.letterSpanTop.css('color','white');
          this.letterSpanBottom.css('color','white');
        }

          setTimeout( () => {

            $("#topFrame"+this.id).addClass('top-animate');
            $("#topBackFrame"+this.id).addClass('top-back-animate');

            this.animation = true;

            $("#topBackFrame"+this.id).on('animationend', () => {

              if (this.animation) {
                this.clickSound.currentTime = 0;
                this.clickSound.play();
                this.letterSpanTop.text(this.newLetter);
                this.letterSpanBottom.text(this.newLetter);
                this.animation = false;
                $("#topFrame"+this.id).removeClass('top-animate');
                $("#topBackFrame"+this.id).removeClass('top-back-animate');
                this.topFrame.css('background', 'transparent');
                if (this.letters.length) {
                  this.animateToNextLetter();
                } else{
                  if (this.messages.length) this.setLetters(this.messages.pop(), this.messages[this.messages.length-1]);
                }
              }
            });
          }, 1);

      }
  }
}