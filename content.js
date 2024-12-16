"use strict";

function CaptureScreenshot() {
  const extension = "png"; // 文件格式固定为 png
  const appendixTitle = "screenshot." + extension;

  let title;

  // 获取视频标题
  const headerEls = document.querySelectorAll(
    "h1.title.ytd-video-primary-info-renderer"
  );

  if (headerEls.length > 0) {
    title = headerEls[0].innerText.trim();
  } else {
    title = "YouTube_Screenshot"; // 如果未找到标题，设置默认值
  }

  // 获取当前视频时间，生成文件名
  const player = document.querySelector(".video-stream");
  const time = Math.floor(player?.currentTime || 0);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  title += ` ${minutes}-${seconds} ${appendixTitle}`;

  // 创建 Canvas 并绘制当前视频帧
  const canvas = document.createElement("canvas");
  canvas.width = player.videoWidth;
  canvas.height = player.videoHeight;
  canvas.getContext("2d").drawImage(player, 0, 0, canvas.width, canvas.height);

  // 下载截图
  canvas.toBlob((blob) => {
    const downloadLink = document.createElement("a");
    downloadLink.download = title; // 文件名
    downloadLink.href = URL.createObjectURL(blob); // Blob URL
    downloadLink.click(); // 触发下载
  }, "image/png");
}

function AddScreenshotButton() {
  if (document.querySelector(".screenshotButton")) return; // 防止重复添加按钮

  const ytpRightControls = document.querySelector(".ytp-right-controls");
  if (ytpRightControls) {
    // 创建截图按钮
    const screenshotButton = document.createElement("button");
    screenshotButton.className = "screenshotButton ytp-button";
    screenshotButton.style.width = "auto";
    screenshotButton.innerHTML = "Screenshot";
    screenshotButton.style.cssFloat = "left";
    screenshotButton.onclick = CaptureScreenshot;

    ytpRightControls.prepend(screenshotButton);
  }
}

// 使用 MutationObserver 监听页面变化，确保按钮在不同页面加载
const observer = new MutationObserver(() => {
  AddScreenshotButton();
});

observer.observe(document.body, { childList: true, subtree: true });
