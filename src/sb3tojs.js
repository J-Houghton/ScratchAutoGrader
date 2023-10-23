import { Project } from "sb-edit"; 
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const file = fs.readFileSync(path.join(__dirname, "sb3Files/parser.sb3"));
const project = await Project.fromSb3(file);

const jsCode = project.toLeopard();  // Convert to Leopard JavaScript code

console.log(jsCode);  // This should now log the JavaScript code

const outputFiles = project.toLeopard();

// Write HTML to file
fs.writeFileSync(path.join(__dirname, "output", "index.html"), outputFiles['index.html']);

// Write JavaScript to file
fs.writeFileSync(path.join(__dirname, "output", "index.js"), outputFiles['index.js']);

// Write additional JS files to their respective directories
Object.keys(outputFiles).forEach(key => {
  if (key !== 'index.html' && key !== 'index.js') {
    const dirs = key.split('/');
    dirs.pop();  // Remove the filename from the array
    const dirPath = path.join(__dirname, "output", ...dirs);
    fs.mkdirSync(dirPath, { recursive: true });  // Ensure the directory exists
    fs.writeFileSync(path.join(__dirname, "output", key), outputFiles[key]);
  }
});