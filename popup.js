let exportResults = document.getElementById('exportResults');

exportResults.onclick = function(element) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.executeScript(
            tabs[0].id,
            {file: 'exportResults.js'});
    });
}

let retrieveSavedTests = document.getElementById('retrieveSavedTests');
retrieveSavedTests.onclick = function(element) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.executeScript(
            tabs[0].id,
            {file: 'retrieveSavedTests.js'});
    });
}

let postSavedTests = document.getElementById('postSavedTests');
postSavedTests.onclick = function(element) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.executeScript(
            tabs[0].id,
            {file: 'postSavedTests.js'});
    });
}

let setCookies = document.getElementById('setCookies');
setCookies.onclick = function(element) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.executeScript(
            tabs[0].id,
            {file: 'setCookies.js'});
    });
}

// TODO - retrieve cookie info, test grid fetch data and store local

/* IDEAS
    - store configs on Heroku
    - select from list in popup
    - users create configs and share
*/
