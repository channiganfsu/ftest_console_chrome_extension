chrome.runtime.onInstalled.addListener(function() {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [
                new chrome.declarativeContent.PageStateMatcher({
                    pageUrl: { hostEquals: 'localhost' },
                })
            ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
    });
});

chrome.cookies.onChanged.addListener(function(info) {
  console.log("onChanged" + JSON.stringify(info));
});

/**
 * APIs
 */
const retrieveAllCookies = () => {
    return new Promise((resolve, reject) => {
        chrome.cookies.getAll({domain: 'localhost', path: '/qa/ftests/'}, (cookies) => {
            resolve(cookies);
        });
    });
};

const retrieveCookie = (name) => {
    return new Promise((resolve, reject) => {
        chrome.cookies.get({
            url: 'http://localhost:6109/qa/ftests/',
            name
        }, cookie => resolve(cookie))
    });
}

const setCookie = (name, value) => {
    return new Promise((resolve, reject) => {
        chrome.cookies.set({
            url: 'http://localhost:6109/qa/ftests/',
            name,
            value
        }, (cookie) => {
            // TODO what is returned here?
            console.log(cookie);
            resolve(cookie);
        });
    });
}

const setStorage = (name, value) => {
    return new Promise((resolve, reject) => {
        chrome.storage.sync.set(
            { [name]: value },
            resolve
        );
    });
    // console.log(cookie ? cookie.value : 'no cookie');
    // if (cookie) {
    //     chrome.storage.sync.set({loadedBookmarks_v2: cookie.value}, () => console.log('loadedBookmarks_v2 stored success!'));
    // }});
}

const getFromStorage = (name) => {
    return new Promise((resolve, reject) => {
        chrome.storage.sync.get([name], resolve);
    });
}

const postSavedTests = () => {
    return new Promise((resolve, reject) => {
        getFromStorage('savedTests')
        .then((tests) => {
            console.log('tests returned from storage', tests);
            fetch('http://localhost:6109/qa/ftests/Dispatch/saveTests', {
                method: 'POST', // or 'PUT'
                body: tests.savedTests,
            })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
                resolve();
            })
            .catch((error) => {
                console.error('Error:', error);
                reject(error);
            });
        });
    });
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
    // setCookies
    if (request.command === 'setCookies') {
        // ys-previousBookmark
        //o%3Abookmark%3Da%253As%25253A%252520ui-laf-components%255Es%25253A%252520ui-global-components
        // ys-loadedBookmarks_v2
        // o%3A%20ui-global-components%3Db%253A1%5E%20ui-force-components%3Db%253A1%5E%20ui-laf-components%3Db%253A1
        sendResponse({ack: 'setting cookies'});
        // chrome.storage.sync.get(['loadedBookmarks_v2'], (value) => {
            chrome.cookies.set({
                url: 'http://localhost:6109/qa/ftests/',
                name: 'ys-loadedBookmarks_v2',
                value: 'o%3A%20ui-global-components%3Db%253A1%5E%20ui-force-components%3Db%253A1%5E%20ui-laf-components%3Db%253A1'
            }, (cookie) => {
                // TODO what is returned here?
                console.log(cookie);
            });
            chrome.cookies.set({
                url: 'http://localhost:6109/qa/ftests/',
                name: 'ys-previousBookmark',
                value: 'o%3Abookmark%3Da%253As%25253A%252520ui-laf-components%255Es%25253A%252520ui-global-components'
            }, (cookie) => {
                // TODO what is returned here?
                console.log(cookie);
            });
        // });
    } else if (request.command === 'saveTests') {
        console.log('saveTests command received', request.savedTests);
        setStorage('savedTests', request.savedTests)
        .then(result => sendResponse({result}));
    } else if (request.command === 'postSavedTests') {
        postSavedTests().then(result => sendResponse({result}));
    }
  });