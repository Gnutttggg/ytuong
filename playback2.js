

// Create an AudioContext object
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// Create an array to store the audio tracks
const tracks = [];

// Load the audio files for the audio player and recording using XMLHttpRequest
const loadAudioFiles = () => {
  return Promise.all([
    loadAudioFile('file:///C:/Users/Tung Do/Downloads/boogie-funk-disco_9040792.mp3'),
    loadAudioFile('recording-file.wav')
  ]);
}

// Load an audio file using XMLHttpRequest
const loadAudioFile = (url) => {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';

    request.onload = () => {
      audioCtx.decodeAudioData(request.response, (buffer) => {
        const source = audioCtx.createBufferSource();
        source.buffer = buffer;
        tracks.push(source);
        resolve(source);
      }, reject);
    };

    request.onerror = reject;

    request.send();
  });
};

// Connect the tracks to a gain node and the audio context destination
const connectTracks = () => {
  const gainNode = audioCtx.createGain();
  gainNode.gain.value = 1;

  tracks.forEach((track) => {
    track.connect(gainNode);
  });

  gainNode.connect(audioCtx.destination);
};

// Start playing the tracks simultaneously, taking into account the start time of your recording
const startPlayback = () => {
  const offset = audioCtx.currentTime - recordingStartTime;

  tracks.forEach((track) => {
    track.start(0, offset);
  });
};

// Load the audio files, then connect the tracks and start playback
loadAudioFiles()
  .then(() => {
    connectTracks();
    startPlayback();
  })
  .catch((error) => {
    console.error(error);
  });
