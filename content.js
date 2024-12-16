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
    chrome.runtime.sendMessage({ action: "screenshot" });
  });

  // Insert into YouTube controls
  container.insertBefore(button, container.firstChild);
})();
