// background.js

let desktopSearchesRemaining = 0;
let mobileSearchesRemaining = 0;
const desktopUserAgent = navigator.userAgent;
let userAgent = navigator.userAgent;
const mobileUserAgent = "Mozilla/5.0 (Linux; Android 11; Pixel 4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Mobile Safari/537.36";
let searching = false;
let intervalId = null;
let constantTabId = null;

// Function to retrieve the active tab ID and set constantTabId
function getActiveTabId(callback) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    if (tabs.length > 0) {
      constantTabId = tabs[0].id;
      callback(constantTabId);
    } else {
      console.log("No active tabs found. Retrying...");
      setTimeout(() => {
        getActiveTabId(callback);
      }, 1000); // Retry after 1 second
    }
  });
}

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === "startSearch" && !searching) {
    const { numSearchesD, numSearchesM, searchType } = message;

    searching = true;

    // Attempt to retrieve the active tab ID continuously until it's found
    getActiveTabId(function (tabId) {
      constantTabId = tabId;

      if (constantTabId === null) {
        console.log("Constant Tab ID is null. Terminating program.");
        return; // Terminate the program if constantTabId is null
      }

      if (searchType === "desktopmobile") {
        desktopSearchesRemaining = parseInt(numSearchesD);
        mobileSearchesRemaining = parseInt(numSearchesM);

        executeSearches(true); // Start with desktop searches
      } else if (searchType === "desktop") {
        desktopSearchesRemaining = parseInt(numSearchesD);
        userAgent = desktopUserAgent;
        executeSearches(false); // Execute desktop searches only
      } else if (searchType === "mobile") {
        mobileSearchesRemaining = parseInt(numSearchesM);
        userAgent = mobileUserAgent;
        executeSearches(true); // Execute mobile searches only
      }
    });
  } else if (message.action === "stopSearch") {
    clearInterval(intervalId);
    searching = false;
    userAgent = desktopUserAgent;
  }
});

function executeSearches(isMobile) {
  console.log("Tab: " + constantTabId);

  function performSearch() {
    if (!searching) {
      clearInterval(intervalId);
      userAgent = desktopUserAgent;
      return;
    }

    if (isMobile && mobileSearchesRemaining > 0) {
      userAgent = mobileUserAgent;
      console.log("Mobile");
      mobileSearchesRemaining--;
      // Perform mobile search logic here
      // Example: Execute content script for mobile search here
      // chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      //   chrome.tabs.executeScript(tabs[0].id, {
      //     file: "content.js",
      //   });
      // });
      executeContentScript();

    } else if (!isMobile && desktopSearchesRemaining > 0) {
      userAgent = desktopUserAgent;
      console.log("Desktop");
      desktopSearchesRemaining--;
      // Perform desktop search logic here
      // Example: Execute content script for desktop search here
      // chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      //   chrome.tabs.executeScript(tabs[0].id, {
      //     file: "content.js",
      //   });
      // });
      executeContentScript();

    } else {
      if (isMobile) {
        userAgent = desktopUserAgent;
        isMobile = false; // Switch to desktop searches after mobile searches are completed

      } else {
        searching = false; // Stop searching when both types of searches are completed
      }
    }
  }

  // Perform the first search immediately
  performSearch();

  // Set interval for subsequent searches with a random delay between 1 to 2.5 minutes
  intervalId = setInterval(performSearch, Math.floor(Math.random() * (150000 - 60000 + 1)) + 60000);
}

// Modify the function to execute content.js on the constantTabId
function executeContentScript() {
  if (constantTabId !== null) {
    chrome.tabs.executeScript(constantTabId, {
      file: "content.js",
    });
  }
}

// add webRequest listener at the end of the file
chrome.webRequest.onBeforeSendHeaders.addListener(
  function (details) {
    for (let i = 0; i < details.requestHeaders.length; ++i) {
      if (details.requestHeaders[i].name === 'User-Agent') {
        details.requestHeaders[i].value = userAgent;
        break;
      }
    }
    return { requestHeaders: details.requestHeaders };
  },
  {
    urls: ["<all_urls>"]
  },
  ["blocking", "requestHeaders"]
);
