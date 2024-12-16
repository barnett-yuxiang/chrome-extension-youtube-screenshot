"use strict";

var screenshotFunctionality = 0;
var screenshotFormat = "png";
var extension = "png";

function CaptureScreenshot() {
  var appendixTitle = "screenshot." + extension;

  var title;

  var headerEls = document.querySelectorAll(
    "h1.title.ytd-video-primary-info-renderer"
  );

  function SetTitle() {
    if (headerEls.length > 0) {
      title = headerEls[0].innerText.trim();
      return true;
    } else {
      return false;
    }
  }

  if (SetTitle() == false) {
    headerEls = document.querySelectorAll("h1.watch-title-container");

    if (SetTitle() == false) title = "";
  }

  var player = document.getElementsByClassName("video-stream")[0];

  var time = player.currentTime;

  title += " ";

  let minutes = Math.floor(time / 60);

  time = Math.floor(time - minutes * 60);

  if (minutes > 60) {
    let hours = Math.floor(minutes / 60);
    minutes -= hours * 60;
    title += hours + "-";
  }

  title += minutes + "-" + time;

  title += " " + appendixTitle;

  var canvas = document.createElement("canvas");
  canvas.width = player.videoWidth;
  canvas.height = player.videoHeight;
  canvas.getContext("2d").drawImage(player, 0, 0, canvas.width, canvas.height);

  var downloadLink = document.createElement("a");
  downloadLink.download = title;

  function DownloadBlob(blob) {
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.click();
  }

  async function ClipboardBlob(blob) {
    const clipboardItemInput = new ClipboardItem({ "image/png": blob });
    await navigator.clipboard.write([clipboardItemInput]);
  }

  // If clipboard copy is needed generate png (clipboard only supports png)
  if (screenshotFunctionality == 1 || screenshotFunctionality == 2) {
    canvas.toBlob(async function (blob) {
      await ClipboardBlob(blob);
      // Also download it if it's needed and it's in the correct format
      if (screenshotFunctionality == 2 && screenshotFormat === "png") {
        DownloadBlob(blob);
      }
    }, "image/png");
  }

  // Create and download image in the selected format if needed
  if (
    screenshotFunctionality == 0 ||
    (screenshotFunctionality == 2 && screenshotFormat !== "png")
  ) {
    canvas.toBlob(async function (blob) {
      DownloadBlob(blob);
    }, "image/" + screenshotFormat);
  }
}

function AddScreenshotButton() {
  if (document.querySelector(".screenshotButton")) return; // 防止重复添加按钮

  var ytpRightControls =
    document.getElementsByClassName("ytp-right-controls")[0];
  if (ytpRightControls) {
    ytpRightControls.prepend(screenshotButton);
  }
}

var screenshotButton = document.createElement("button");
screenshotButton.className = "screenshotButton ytp-button";
screenshotButton.style.width = "auto";
screenshotButton.innerHTML = "Screenshot";
screenshotButton.style.cssFloat = "left";
screenshotButton.onclick = CaptureScreenshot;

chrome.storage.sync.get(
  ["screenshotFunctionality", "screenshotFileFormat"],
  function (result) {
    screenshotFormat = result.screenshotFileFormat ?? "png";
    screenshotFunctionality = result.screenshotFunctionality ?? 0;
    extension = screenshotFormat === "jpeg" ? "jpg" : screenshotFormat;

    AddScreenshotButton(); // 在设置加载完后调用
  }
);

AddScreenshotButton();
