import fs from 'fs/promises';
import { Project } from './objects/Project.js';
import { Target } from './objects/Target.js';
import { Block } from './objects/Block.js';

export class Parser {
    constructor() {
        // No need to pass anything to the constructor if we're reading from a file
    }

    async parse(filePath) {
        console.log("parsing...");
        console.log(filePath);

        try {
            // Read the JSON data from the file
            const jsonData = await fs.readFile(filePath, 'utf-8');
            this.projectData = JSON.parse(jsonData);

            // Parse the raw data and create a Project instance
            const project = new Project();
            
            this.projectData.targets.forEach(targetData => {
                const target = new Target(targetData);
                project.addTarget(target);
          
                Object.values(targetData.blocks).forEach(blockData => {
                    const block = new Block(blockData);
                    target.addBlock(block);
                });
            });

            // After all instances are created (Project, Target, Block),
            // we initiate the AST construction.
            const ast = this.constructAST(project);

            // Write the AST back to a JSON file, if needed
            await this.writeASTToFile(ast);

            // Return the AST
            return ast;
        } catch (err) {
            console.error('Error parsing the project data', err);
            throw err; // Re-throw the error so the caller can handle it
        }
    }

    constructAST(project) {
        // This function initiates the AST construction process 
        // starting from the Project level.
        return project.buildAST();
    }

    async writeASTToFile(ast) {
        try {
            const jsonString = JSON.stringify(ast, null, 2); // 'null' and '2' are used for formatting

            // Using promises to write to the file
            await fs.writeFile('output_ast.json', jsonString);
            console.log('Successfully wrote AST to file');
        } catch (err) {
            console.error('Error writing AST to file', err);
            throw err; // Re-throw the error so the caller can handle it
        }
    }
}
