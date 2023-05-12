const recordButton = document.getElementById("recordButton");
const audioPlayer = document.getElementById("audioPlayer");
const recordedAudio = document.getElementById("recordedAudio");
let isRecording = false;
let mediaRecorder;
let chunks = [];
const overlay = document.getElementById("overlay");


function playAudio(url) {
const audioPlayer = document.getElementById("audioPlayer");
audioPlayer.src = url;
audioPlayer.play();
}


recordButtonOverlay.addEventListener("click", toggleRecording);

function toggleRecording() {
  if (isRecording) {
    mediaRecorder.stop();
    isRecording = false;
    recordButton.textContent = "Record";
    recordButton.innerHTML = '<i class="fas fa-microphone"></i>';
    overlay.style.pointerEvents = "none";
  } else {
    if (audioPlayer.src !== "" && !audioPlayer.paused) {
      recordingStartTime = audioPlayer.currentTime;
      overlay.style.pointerEvents = "auto";

      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(function (stream) {
          mediaRecorder = new MediaRecorder(stream);
          mediaRecorder.start();
          isRecording = true;
          chunks = [];
          recordButton.textContent = "Stop";
          recordButton.innerHTML = '<i class="fas fa-square"></i>';
           
          audioPlayer.addEventListener("timeupdate", syncRecording);
          mediaRecorder.addEventListener("dataavailable", function (event) {
            chunks.push(event.data);
          });
          mediaRecorder.addEventListener("stop", function () {
            const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
            recordedAudio.src = URL.createObjectURL(blob);
            recordedAudio.addEventListener('canplaythrough', function() {
              recordedAudio.play();
            });
            audioPlayer.removeEventListener("timeupdate", syncRecording);
            isRecording = false;
            recordButton.textContent = "Record";
          });
        })
        .catch(function (err) {
          console.error("Error recording audio: ", err);
        });
    }
  }
}

function syncRecording() {
  const elapsedTime = audioPlayer.currentTime - recordingStartTime;
  if (elapsedTime < 0) {
    recordingStartTime = audioPlayer.currentTime;
    return;
  }
  if (elapsedTime >= recordedAudio.duration) {
    audioPlayer.pause();
    audioPlayer.currentTime = 0;
    recordButton.disabled = false;
    recordedAudio.removeEventListener("timeupdate", syncRecording);
    recordButton.textContent = "Record";
    return;
  }
  recordedAudio.currentTime = elapsedTime;
}

