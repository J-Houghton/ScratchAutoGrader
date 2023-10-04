const fs = require('fs').promises;

async function parse(filePath) {
    console.log("parsing...");
    console.log(filePath);

    try {
        const jsonData = await fs.readFile(filePath, 'utf-8');
        const largeJsonObject = JSON.parse(jsonData);
        const jsonString = JSON.stringify(largeJsonObject, null, 2); // 'null' and '2' are used for formatting

        // Using promises to write to the file
        await fs.writeFile('output.json', jsonString);
        console.log('Successfully wrote to file');
    } catch (err) {
        console.error('Error writing to file', err);
    }
}

module.exports = parse;