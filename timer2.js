const timer = document.getElementById("timer");
let startTime, elapsedTime = 0, timerInterval, initialTime = 0;

audioPlayer.addEventListener("timeupdate", function () {
  if (audioPlayer.currentTime == initialTime) {
    resetTimer();
  }
});


audioPlayer.addEventListener("play", function () {
  startTimer();
});

audioPlayer.addEventListener("pause", function () {
  stopTimer();
});


audioPlayer.addEventListener("ended", function () {
  stopTimer();
});

function startTimer() {
  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(function () {
    elapsedTime = Date.now() - startTime;
    timer.innerHTML = formatTime(elapsedTime);
  }, 10);
}

function resetTimer() {
  elapsedTime = 0;
  clearInterval(timerInterval); // Clear the timer interval when resetting the timer
  timerInterval = null; // Reset the timer interval to null
  timer.innerHTML = formatTime(elapsedTime);
}


function stopTimer() {
    clearInterval(timerInterval);
}



function formatTime(time) {
  let minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((time % (1000 * 60)) / 1000);
  let milliseconds = time % 1000;
  return (
    padZero(minutes, 2) +
    ":" +
    padZero(seconds, 2) +
    ":" +
    padZero(milliseconds, 3)
  );
}

function padZero(num, size) {
  let padded = "000000000" + num;
  return padded.substr(padded.length - size);
}


