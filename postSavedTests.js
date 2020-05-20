// retrieve saved tests from storage
// build POST body
// fire off XHR


chrome.runtime.sendMessage({command: 'postSavedTests'}, function(response) {
    console.log(response);
});


//// From Ftest console source
// var records = this.store.getRange(0, this.store.getCount());
// var data = new Array();
// for (var i = 0; i < records.length; i++) {
//     data.push(records[i].data);
// }

// var jsonData = new Object();
// jsonData.rows = data;
// Ext.Ajax.request({
//     url: '../ftests/Dispatch/saveTests',
//     method: 'POST',
//     scope: this,
//     jsonData: Ext.util.JSON.encode(jsonData),
//     success: function(response) {
//         this.fireEvent('testssaved');
//     },
//     failure: function(response) {
//         this.fireEvent('communicationfailure', response.statusText);
//     }
// });