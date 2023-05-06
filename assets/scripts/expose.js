// expose.js
window.addEventListener('DOMContentLoaded', init);

const hornSelection = document.getElementById("horn-select");  
const volumeSelection = document.getElementById("volume");
const jsConfetti = new JSConfetti();

let hornSound = document.querySelector("audio");
let playSound = document.querySelector("button");

// variables for horn and volume img
let diffImg = document.querySelector('img[alt="No image selected"]');
let diffVol = document.querySelector('img[alt="Volume level 2"]');

function init() {
  // changing image based on horn selection
  hornSelection.addEventListener("change", hornImg);
  // changing volume img and setting according to selection
  volumeSelection.addEventListener("change", volumeSettings);
  // playing sound/visual effects when the button is clicked
  playSound.addEventListener("click", effects);
}

/*
 * When selecting a horn from the drop down menu: 
 * The correct image should display
 * The correct audio sound file should be set 
 */
function hornImg() {
  switch (hornSelection.value) {
    case "air-horn":
      diffImg.src = "assets/images/air-horn.svg";
      hornSound.src = "assets/audio/air-horn.mp3";
      break;
    case "car-horn":
      diffImg.src = "assets/images/car-horn.svg";
      hornSound.src = "assets/audio/car-horn.mp3";
      break;
    case "party-horn":
      diffImg.src = "assets/images/party-horn.svg";
      hornSound.src = "assets/audio/party-horn.mp3";
      break;
    default:
      diffImg.src = "assets/images/no-image.png";
      hornSound.src = "";
      break;
  }
}

/*
 * When changing the volume slider:
 * At 0, the mute icon (level 0) should be displayed
 * From 1 < 33 volume the first volume level should be displayed
 * From 33 < 67 volume the second volume level should be displayed
 * From 67 and above the third volume level should be displayed
 * The correct volume icon should be set
 * The corresponding volume should be set for the audio element 
 */
function volumeSettings() {
  let vol = Number(volumeSelection.value);
  hornSound.volume = vol/100;
  if (vol == 0) {
    diffVol.src = "assets/icons/volume-level-0.svg"; 
  }
  else if (vol < 33) {
    diffVol.src = "assets/icons/volume-level-1.svg";
  }
  else if (vol < 67){
    diffVol.src = "assets/icons/volume-level-2.svg";
  }
  else{
    diffVol.src = "assets/icons/volume-level-3.svg";
  }
}

/*
 * When you click "Play Sound" button:
 * The corresponding sound for the horn selected should play out loud at the specified volume
 * If party horn is selected: confetti should shoot out (use given library) 
 */
function effects() {
  hornSound.play();
  if(hornSelection.value == "party-horn") {
    jsConfetti.addConfetti();
  }
  else{
    jsConfetti.clearCanvas();
  }
}