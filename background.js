chrome.webNavigation.onHistoryStateUpdated.addListener(
  function (data) {
    chrome.tabs.get(data.tabId, function (tab) {
      chrome.scripting.executeScript({
        target: { tabId: data.tabId },
        func: () => {
          if (typeof AddScreenshotButton !== "undefined") {
            AddScreenshotButton();
          }
        },
      });
    });
  },
  { url: [{ hostSuffix: ".youtube.com" }] }
);
