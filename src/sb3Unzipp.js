import JSZip from 'jszip';
import fs from 'fs-extra';

export async function unzipSb3(filePath) {
    // Load the .sb3 file
    const data = await fs.readFile(filePath);
    console.log(filePath);
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
    return './unzippedSb3/project.json'; // return the path of the unzipped project.json file
}
 
