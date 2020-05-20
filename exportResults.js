// get table
let table = document.getElementsByClassName('x-grid3-body')[0];

const getText = (table, columnName) => {
    // get column of nodes
    let column = table.getElementsByClassName(columnName);
    // convert to array
    let columnArray = [...column];
    // grab innerText from each element
    let columns = columnArray.map(n => n.innerText);
    return columns;
}

const getColumnHeaders = (hdArray) => {
    let header = document.getElementsByClassName('x-grid3-header')[0];
    let result = [];
    for (let i = 0; i < hdArray.length; i++) {
        result.push(header.getElementsByClassName(`x-grid3-hd-${hdArray[i]}`)[0].innerText);
    }
    return result;
}

const names = getText(table, 'x-grid3-col-1');
const classes = getText(table, 'x-grid3-col-2');
const status = getText(table, 'x-grid3-col-4');
const targetBrowsers = getText(table, 'x-grid3-col-5');
const browsersUsed = getText(table, 'x-grid3-col-6');

let csv = getColumnHeaders(['1', '2', '4', '5', '6']).join(',');
for (let i = 0; i < names.length; i++) {
    csv = `${csv}\n${names[i]},${classes[i]},${status[i]},${targetBrowsers[i]},${browsersUsed[i]}`;
}
console.log(csv);

// special case for splitting list of browsers out into their own column
// browsers.map(b => {
//     let mapp = [0, 0, 0, 0, 0];
//     let arr = b.split(',');
//     for (let i = 0; i < arr.length; i++) {
//         let browser = arr[i].trim();
//         if (browser === 'edge') {
//             mapp[0] = 1;
//         } else if (browser === 'firefox') {
//             mapp[1] = 1;
//         } else if (browser === 'googlechrome') {
//             mapp[2] = 1;
//         } else if (browser === 'ie11') {
//             mapp[3] = 1;
//         } else if (browser === 'safari') {
//             mapp[4] = 1;
//         } else {
//             console.log(`${browser} isn't in the list...`);
//         }
//     }
//     return mapp;
// });

// grab all rows, then for loop through them to construct a CSV
// let csv = '';
// let browserSplit = browsers.map(b => {
//         let mapp = [0, 0, 0, 0, 0];
//         let arr = b.split(',');
//         for (let i = 0; i < arr.length; i++) {
//             let browser = arr[i].trim();
//             if (browser === 'edge') {
//                 mapp[0] = 1;
//             } else if (browser === 'firefox') {
//                 mapp[1] = 1;
//             } else if (browser === 'googlechrome') {
//                 mapp[2] = 1;
//             } else if (browser === 'ie11') {
//                 mapp[3] = 1;
//             } else if (browser === 'safari') {
//                 mapp[4] = 1;
//             } else {
//                 console.log(`${browser} isn't in the list...`);
//             }
//         }
//         return mapp;
//     });
// for (let i = 0; i < names.length; i++) {
//     csv = `${csv}\n${classes[i]},${names[i]},${browserSplit[i].join().trim()}`;
// }