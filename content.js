(function () {
  const existingButton = document.getElementById("screenshot-button");
  if (existingButton) return;

  const container = document.querySelector(".ytp-right-controls");
  if (!container) return;

  // 创建按钮
  const button = document.createElement("button");
  button.id = "screenshot-button";
  button.innerHTML = "🖼"; // 使用图标
  button.style.cssText = `
      background-color: #ffcc00;
      border: none;
      border-radius: 4px;
      color: black;
      font-size: 14px;
      margin-left: 10px;
      padding: 5px;
      cursor: pointer;
      outline: none;
    `;
  button.title = "截图当前视频屏幕";

  // 按钮点击事件
  button.addEventListener("click", () => {
    chrome.runtime.sendMessage({ action: "screenshot" });
  });

  // 插入到 YouTube 控件中
  container.insertBefore(button, container.firstChild);
})();
