import { Project } from "sb-edit"; 
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
 
export async function convertSb3ToJs(filePath) {
    // Derive the directory name from the current file URL
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    // Read the file from the provided file path
    const file = fs.readFileSync(path.join(__dirname, filePath));
    const project = await Project.fromSb3(file);

    const jsCode = project.toLeopard();  // Convert to Leopard JavaScript code
    console.log(project);  // Log the JavaScript code

    const outputFiles = project.toLeopard();

    // Ensure output directory exists
    const outputDir = path.join(__dirname, "output");
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
    }

    // Write HTML and JavaScript to file
    fs.writeFileSync(path.join(outputDir, "index.html"), outputFiles['index.html']);
    fs.writeFileSync(path.join(outputDir, "index.js"), outputFiles['index.js']);

    // Write additional JS files to their respective directories
    Object.keys(outputFiles).forEach(key => {
        if (key !== 'index.html' && key !== 'index.js') {
            const dirs = key.split('/');
            dirs.pop();  // Remove the filename from the array
            const dirPath = path.join(outputDir, ...dirs);
            fs.mkdirSync(dirPath, { recursive: true });  // Ensure the directory exists
            fs.writeFileSync(path.join(outputDir, key), outputFiles[key]);
        }
    });
}
