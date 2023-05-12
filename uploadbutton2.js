const uploadButton = document.getElementById("uploadButton");

uploadButton.addEventListener("click", function() {
  // Trigger the file upload dialog
  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.accept = "audio/*";
  fileInput.style.display = "none";

  document.body.appendChild(fileInput);
  fileInput.click();

  // Wait for the user to select a file
  fileInput.addEventListener("change", function(event) {
    const file = event.target.files[0];

    // Use FileReader to read the file contents
    const reader = new FileReader();

    reader.addEventListener("load", function() {
      const audioDataUrl = reader.result;
      const audioElement = new Audio(audioDataUrl);

      // Ask the user to name their audio
      const audioName = prompt("Please enter a name for your audio:");

      // Create a new grid item element to represent the uploaded audio
      const newGridItem = document.createElement("div");
      newGridItem.classList.add("grid-item");
      newGridItem.appendChild(audioElement);

      // Add a click event listener to play the audio when the grid item is clicked
      newGridItem.addEventListener("click", function() {
        audioPlayer.src = audioDataUrl;
        audioPlayer.play();
      });

      // Set the name of the grid item to the user-specified audio name
      const audioNameElement = document.createElement("p");
      audioNameElement.textContent = audioName;
      newGridItem.appendChild(audioNameElement);

      // Add the new grid item element to the container
      const container = document.querySelector(".container");
      container.appendChild(newGridItem);
    });

    reader.readAsDataURL(file);
  });
});

