chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "screenshot") {
    chrome.tabs.captureVisibleTab(null, { format: "png" }, (dataUrl) => {
      const filename = `youtube-screenshot-${Date.now()}.png`;

      chrome.downloads.download({
        url: dataUrl,
        filename: filename,
        conflictAction: "uniquify",
      });
    });
  }
});
