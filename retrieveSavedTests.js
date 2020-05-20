fetch('http://localhost:6109/qa/ftests/saved-state/selected-tests.json')
.then(r => r.text())
.then(results => {
    console.log(results);
    // save to storage
    chrome.runtime.sendMessage({command: 'saveTests', savedTests: results}, function(response) {
        console.log('saved to storage')
    });
});