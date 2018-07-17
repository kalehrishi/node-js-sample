const requestPromise = require('request-promise');
var fs = require('fs');


function saveToFile(fileName, fileData) {
    fs.writeFile(`${fileName}.json`, JSON.stringify(fileData), function(err) {
        if (err) {
            console.log("Error Occured:" + err);
        }
        console.log(`Saved! ${fileName}.json`);
    });
}

const getData = async () {
    try {
        const url = unescape(`https://jsonplaceholder.typicode.com/posts`)
        const options = {
            uri: url,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        };
        let response = await requestPromise(options);
        console.log("Response:" + response);
        if (response != undefined) {
            response = JSON.parse(response);
            response.map(obj => {
                saveToFile(obj['id'], obj);
            });
        }
    } catch (e) {
        console.log("Error Occured" + e);
    }
}

getData();