const fs = require('fs').promises;

//const projectJSON = require('./unzippedSb3/project.json');

async function parse(filePath) {
    console.log("parsing...");
    console.log(filePath);

    const jsonData = await fs.readFile(filePath, 'utf-8');
    const largeJsonObject = JSON.parse(jsonData);
    const jsonString = JSON.stringify(largeJsonObject, null, 2); // 'null' and '2' are used for formatting

// Write the formatted JSON string to a file
    fs.writeFile('output.json', jsonString, (err) => {
    if (err) {
        console.error('Error writing to file', err);
    } else {
        console.log('Successfully wrote to file');
    }
    });

}

module.exports = parse;