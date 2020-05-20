// chrome.storage.sync.get(['loadedBookmarks_v2'], (value) => {
//     console.log(value['loadedBookmarks_v2']);
//     chrome.cookies.set({
//         url: 'http://localhost:6109/qa/ftests/',
//         name: 'ys-loadedBookmarks_v2',
//         value: value['loadedBookmarks_v2']
//     }, (cookie) => {
//         console.log(cookie);
//     });
// });
// chrome.cookies.set({
//     url: 'http://localhost:6109/qa/ftests/',
//     name: 'ys-loadedBookmarks_v2',
//     value: "o%3A%20ui-global-components%3Db%253A1%5E%20ui-force-components%3Db%253A1%5E%20ui-laf-components%3Db%253A1"
// }, (cookie) => {
//     console.log(cookie);
// });

chrome.runtime.sendMessage({command: 'setCookies'}, function(response) {
    console.log(response);
});