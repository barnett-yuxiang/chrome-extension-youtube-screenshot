(function () {
  const BUTTON_ID = "screenshot-button";
  const BUTTON_TEXT = "Screenshot";

  // 创建 Screenshot 按钮
  const createScreenshotButton = () => {
    const button = document.createElement("button");
    button.id = BUTTON_ID;
    button.innerText = BUTTON_TEXT;
    button.className = "ytp-button"; // 保持与 YouTube 按钮一致
    button.style.cssText = `
      font-size: 12px;
      color: white;
      background: rgba(255, 204, 0, 0.9);
      border: none;
      border-radius: 4px;
      padding: 4px 8px;
      cursor: pointer;
      outline: none;
      order: 9999; /* 确保按钮始终排在最右侧 */
    `;
    button.title = "Capture current video frame";

    // 悬停时调整背景色
    button.addEventListener("mouseover", () => {
      button.style.background = "rgba(255, 204, 0, 1)";
    });
    button.addEventListener("mouseout", () => {
      button.style.background = "rgba(255, 204, 0, 0.9)";
    });

    // 点击按钮截图
    button.addEventListener("click", captureScreenshot);
    return button;
  };

  // 截图逻辑
  const captureScreenshot = () => {
    const video = document.querySelector("video");
    if (!video) return;

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      const filename = `youtube-screenshot-${Date.now()}.png`;

      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(url);
    }, "image/png");
  };

  // 确保按钮始终靠右
  const ensureButtonPosition = () => {
    const container = document.querySelector(".ytp-right-controls");
    if (!container) return;

    let button = document.getElementById(BUTTON_ID);
    if (!button) {
      button = createScreenshotButton();
      container.appendChild(button);
    }

    // 重新设置 order，确保按钮始终在最后
    container.querySelectorAll(".ytp-button").forEach((btn, index) => {
      btn.style.order = index + 1;
    });
    button.style.order = 9999;
  };

  // 监听布局变化
  const observeLayoutChanges = () => {
    const targetNode = document.querySelector(".ytp-right-controls");
    if (!targetNode) return;

    const observer = new MutationObserver(() => {
      ensureButtonPosition(); // 当控件发生变化时重新校准按钮
    });

    observer.observe(targetNode, {
      childList: true,
      subtree: false,
    });
  };

  // 初始化按钮
  const init = () => {
    const container = document.querySelector(".ytp-right-controls");
    if (container) {
      ensureButtonPosition();
      observeLayoutChanges();
    } else {
      setTimeout(init, 500); // 如果控件未加载，稍后重试
    }
  };

  init();
})();
