chrome.action.onClicked.addListener((tab) => {
    chrome.tabs.sendMessage(tab.id, { toggleHide: true }, response => {
      if (chrome.runtime.lastError) {
        console.error(JSON.stringify(chrome.runtime.lastError));
      }
    });
  });
  