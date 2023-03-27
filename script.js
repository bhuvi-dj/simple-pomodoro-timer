const sessionTime = 25; // Session time in minutes
const breakTime = 5; // Break time in minutes

let countdown; // The countdown timer
let timerDisplay = document.getElementById("time-left");
let timerLabel = document.getElementById("timer-label");
let startStopBtn = document.getElementById("start_stop");
let resetBtn = document.getElementById("reset");
let session = true; // true for session, false for break
let timeLeft = sessionTime * 60; // Time left in seconds

function startStop() {
  if (countdown) {
    // If timer is running, pause it
    clearInterval(countdown);
    countdown = null;
    startStopBtn.innerHTML = "Start";
  } else {
    // If timer is not running, start it
    countdown = setInterval(() => {
      timeLeft--;
      displayTimeLeft();
      if (timeLeft === 0) {
        // If timer is over, switch to break or session
        clearInterval(countdown);
        countdown = null;
        if (session) {
          session = false;
          timeLeft = breakTime * 60;
          timerLabel.innerHTML = "Break";
        } else {
          session = true;
          timeLeft = sessionTime * 60;
          timerLabel.innerHTML = "Session";
        }
        displayTimeLeft();
        countdown = setInterval(() => {
          timeLeft--;
          displayTimeLeft();
          if (timeLeft === 0) {
            // If break or session is over, stop timer
            clearInterval(countdown);
            countdown = null;
            startStopBtn.innerHTML = "Start";
          }
        }, 1000);
      }
    }, 1000);
    startStopBtn.innerHTML = "Pause";
  }
}

function reset() {
  // Reset timer to session time
  clearInterval(countdown);
  countdown = null;
  session = true;
  timeLeft = sessionTime * 60;
  displayTimeLeft();
  timerLabel.innerHTML = "Session";
  startStopBtn.innerHTML = "Start";
}

function displayTimeLeft() {
  // Display time left in mm:ss format
  let minutes = Math.floor(timeLeft / 60);
  let seconds = timeLeft % 60;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  timerDisplay.innerHTML = `${minutes}:${seconds}`;
}

