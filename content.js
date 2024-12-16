(function () {
  const existingButton = document.getElementById("screenshot-button");
  if (existingButton) return;

  const container = document.querySelector(".ytp-right-controls");
  if (!container) return;

  // Create button
  const button = document.createElement("button");
  button.id = "screenshot-button";
  button.innerText = "Screenshot"; // Display English text
  button.style.cssText = `
    background-color: #ffcc00;
    border: none;
    border-radius: 4px;
    color: black;
    font-size: 12px;
    margin-left: 5px;
    padding: 5px 8px;
    cursor: pointer;
    outline: none;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 36px; /* Match YouTube control button height */
  `;
  button.title = "Capture current video frame";

  // Button click event
  button.addEventListener("click", () => {
    const video = document.querySelector("video");
    if (!video) return;

    // Create canvas to draw current video frame
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert canvas to image URL
    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      const filename = `youtube-screenshot-${Date.now()}.png`;

      // Download the image
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(url);
    }, "image/png");
  });

  // Insert into YouTube controls
  container.insertBefore(button, container.firstChild);
})();
