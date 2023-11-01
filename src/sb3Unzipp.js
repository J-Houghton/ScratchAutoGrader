import JSZip from 'jszip';
import fs from 'fs-extra';

export async function unzipSb3(filePath, outputDir = './unzippedSb3') {
    // Load the .sb3 file
    const data = await fs.readFile(filePath);
    console.log(filePath);

    // Load the .sb3 content with JSZip
    const zip = new JSZip();
    const contents = await zip.loadAsync(data);

    // Ensure the output directory exists
    await fs.ensureDir(outputDir);

    // Extract each file in the zip
    for (const [relativePath, fileEntry] of Object.entries(contents.files)) {
        if (!fileEntry.dir) { // Ensure it's a file and not a directory
            const content = await fileEntry.async('nodebuffer');
            await fs.writeFile(`${outputDir}/${relativePath}`, content);
        } else {
            await fs.ensureDir(`${outputDir}/${relativePath}`);
        }
    }

    console.log("Unzipping completed!");
    return `${outputDir}/project.json`; // return the path of the unzipped project.json file
}

export async function unzipSb3Data(data, outputDir = './unzippedSb3') {
    // Load the .sb3 content with JSZip
    const zip = new JSZip();
    const contents = await zip.loadAsync(data);

    // Ensure the output directory exists
    await fs.ensureDir(outputDir);

    // Extract each file in the zip
    for (const [relativePath, fileEntry] of Object.entries(contents.files)) {
        if (!fileEntry.dir) { // Ensure it's a file and not a directory
            const content = await fileEntry.async('nodebuffer');
            await fs.writeFile(`${outputDir}/${relativePath}`, content);
        } else {
            await fs.ensureDir(`${outputDir}/${relativePath}`);
        }
    }

    console.log("Unzipping completed!");
    return `${outputDir}/project.json`; // return the path of the unzipped project.json file
}