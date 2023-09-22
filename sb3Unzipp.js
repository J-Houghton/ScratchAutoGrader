const JSZip = require('jszip');
const fs = require('fs-extra');

async function unzipSb3(filePath) {
    // Load the .sb3 file
    const data = await fs.readFile(filePath);

    // Load the .sb3 content with JSZip
    const zip = new JSZip();
    const contents = await zip.loadAsync(data);

    // Ensure the output directory exists
    await fs.ensureDir('./unzippedSb3');

    // Extract each file in the zip
    for (const [relativePath, fileEntry] of Object.entries(contents.files)) {
        if (!fileEntry.dir) { // Ensure it's a file and not a directory
            const content = await fileEntry.async('nodebuffer');
            await fs.writeFile(`./unzippedSb3/${relativePath}`, content);
        } else {
            await fs.ensureDir(`./unzippedSb3/${relativePath}`);
        }
    }

    console.log("Unzipping completed!");
}
unzipSb3().catch(error => {
    console.error("An error occurred:", error);
});

module.exports = unzipSb3; // Export the function to be used in other files
