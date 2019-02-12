
chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.create({'url': 'https://www.linkedin.com/mynetwork/'}, function(tab) {
    // Tab opened.
  });
});