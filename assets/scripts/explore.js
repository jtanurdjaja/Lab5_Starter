// explore.js
window.addEventListener('DOMContentLoaded', init);

const button = document.querySelector("button");

const select = document.querySelector("select"); 

const text = document.querySelector("textarea");

const smileyFace = document.querySelector("img");

let voices = [];

function init() {
  speechSynthesis.addEventListener("voiceschanged", loadVoices);
  button.addEventListener("click", talk);
}

/*
 * On page load, all of the available voices for SpeechSynthesizer 
 * should be loaded and populate the “Select Voice” dropdown.
 */
function loadVoices() {
  voices = speechSynthesis.getVoices();
  for(let i of voices){
    const voice = document.createElement('option');
    voice.setAttribute("value", i.name);
    voice.text = i.name;
    select.appendChild(voice);
  }
}
/*
 * When “Press to Talk” button is clicked:
 * The text typed into the “Text to speak here” textarea 
 * should be spoken out loud using the selected voice
 */
function talk() {
  const voiceName = select.value;
  const voicing = new SpeechSynthesisUtterance(text.value);
  for (let i = 0; i < voices.length; i++) {
    if (voices[i].name === voiceName) {
      voicing.voice = voices[i];
    }
  }
  
  speechSynthesis.speak(voicing);
  smileyFace.src = "assets/images/smiling-open.png";
  voicing.addEventListener("end", imgTalk);
}

/*
 * Close mouth when finished speaking 
 */
function imgTalk() {
  smileyFace.src = "assets/images/smiling.png";
}