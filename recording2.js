const recStart = document.getElementById("recStart");
const recStop = document.getElementById("recStop");

let startTimestamp, stopTimestamp;

const recordButtonOverlay = document.getElementById("recordButtonOverlay");
recordButtonOverlay.addEventListener("click", function() {
  if (!startTimestamp) {
    startTimestamp = Date.now();
    recStart.innerHTML = "Recording start time: " + timer.innerHTML;
  } else {
    stopTimestamp = Date.now();
    recStop.innerHTML = "Recording stop time: " + timer.innerHTML;
  }
});


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
