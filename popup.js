document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("search-form");
  const stopButton = document.getElementById("stop-button");
  const rewardsRed = document.getElementById("rewards-button");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    var numSearchesD = document.getElementById("num-searchesD").value;
    var numSearchesM = document.getElementById("num-searchesM").value;
    var searchType = document.getElementById("search-type").value;


    // Send message to background script to start searches
    chrome.runtime.sendMessage({
      action: "startSearch",
      numSearchesD,
      numSearchesM,
      searchType,
    });
  });

  // Retrieve the last value searched by the user (if any)
  chrome.storage.sync.get("lastSearchValueD", function (data) {
    if (data.lastSearchValueD) {
      document.getElementById("num-searchesD").value = data.lastSearchValueD;
    }
  });
  // Retrieve the last value searched by the user (if any)
  chrome.storage.sync.get("lastSearchValueM", function (data) {
    if (data.lastSearchValueM) {
      document.getElementById("num-searchesM").value = data.lastSearchValueM;
    }
  });
  // Retrieve the last value searched by the user (if any)
  chrome.storage.sync.get("lastTypeValue", function (data) {
    if (data.lastTypeValue) {
      document.getElementById("search-type").value = data.lastTypeValue;
    }
  });
  // Listen for form submission and save the search value to storage
  document.getElementById("search-form").addEventListener("submit", function (event) {
    event.preventDefault();
    const numSearchesD = document.getElementById("num-searchesD").value;
    const numSearchesM = document.getElementById("num-searchesM").value;
    const searchType = document.getElementById("search-type").value;
    // Save the search value to storage
    chrome.storage.sync.set({ lastSearchValueD: numSearchesD });
    chrome.storage.sync.set({ lastSearchValueM: numSearchesM });
    chrome.storage.sync.set({ lastTypeValue: searchType });
  });


  stopButton.addEventListener("click", function () {
    // Send message to background script to stop searches
    chrome.runtime.sendMessage({ action: "stopSearch" });
  });
  rewardsRed.addEventListener("click", function () {
    chrome.tabs.create({ url: "https://rewards.bing.com/" }, function (tab) {
      // Tab created, do something if needed
    });
  });
});
