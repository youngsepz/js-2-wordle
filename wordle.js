function isLetter(letter) {
    return /^[a-zA-Z]$/.test(letter);
  }

  let wordArrayIncrementer = 0;
  let header = 0;
  let wordEntered = ''
  let wordArray = [[],[],[],[],[],[]];
  let wincounter = 0;
  const word_url = "https://words.dev-apis.com/word-of-the-day";
  const wordvalidater = "https://words.dev-apis.com/validate-word"

  async function getWord() {
    const myword = await fetch(word_url);
    const jsonmyword = await myword.json();
    return jsonmyword.word
  }

  async function setWord() {
    finalword = await getWord()
    finalwordarray = []
    for (letter of finalword) {
      finalwordarray.push(letter);      
    }
    return (finalword, finalwordarray)
  }

  async function checkWord(chosenword) {
    const checkmyWord = await fetch(wordvalidater, {
      method: "POST",
      body: JSON.stringify({"word": chosenword})
    })

    checkmyWordResponse = await checkmyWord.json();
    return checkmyWordResponse.validWord;
  }

  setWord();
  
  boxSelector = document.querySelectorAll(".word-square");
  letterSelector = document.querySelectorAll(".letter");
 
  document.addEventListener('keydown', async (event) => {
    const keyPressed = event.key;

    if (event.key === 'Backspace') {
      BoxDeleter()
    }

    if ((wordArray[wordArrayIncrementer]).length < 6 && isLetter(keyPressed)) {
      wordArray[wordArrayIncrementer][header] = event.key
      BoxUpdater();
    }

    if (event.key === 'Enter' && wordArray[wordArrayIncrementer].length === 5){
      const isValid = await checkWord(wordArray[wordArrayIncrementer].join(""));
      if (isValid) {
      wordEntered = wordArray[wordArrayIncrementer].join("")
      for (i=0; i < wordArray[wordArrayIncrementer].length; i++) {
        if (wordEntered[i] === finalword[i]) {  
          boxSelector[i].style.backgroundColor = 'Green'
          if (boxSelector[i].style.backgroundColor = 'Green') {
            wincounter += 1
            if (wincounter === 5) {
              alert("YOU WIN")
            }
          } 
        }

        else if (finalwordarray.includes(wordEntered[i])) {
          boxSelector[i].style.backgroundColor = '#FCD12A'
          wincounter = 0
        }

        else {
          boxSelector[i].style.backgroundColor = 'Grey'
          wincounter = 0
        }
      }

      wordArrayIncrementer +=1
      header = 0;
      switch(wordArrayIncrementer){
        case 1:
          boxSelector = document.querySelectorAll('.secondword')
          break
        case 2:
          boxSelector = document.querySelectorAll('.thirdword')
          break
        case 3:
          boxSelector = document.querySelectorAll('.fourthword')
          break
        case 4:
          boxSelector = document.querySelectorAll('.fifthword')
          break
        case 5:
          boxSelector = document.querySelectorAll('.sixthword')
          break
      }
    }
    else {
      alert("Not a Valid Number")
    }
    }

    function BoxUpdater() {
      for (i=0; i < wordArray[wordArrayIncrementer].length; i++) {
        boxSelector[i].innerHTML = wordArray[wordArrayIncrementer][i]
      }

      if (header < 4) {
        header += 1
      }
    }

    function BoxDeleter() {
      for (i=0; i < wordArray[wordArrayIncrementer].length; i++) {
        boxSelector[i].innerHTML = wordArray[wordArrayIncrementer][i]
      }
      wordArray[wordArrayIncrementer][header] = ""
      boxSelector[header].innerHTML = "" 

      if (header > 0) {
        header -= 1
      }
    }
    


  })