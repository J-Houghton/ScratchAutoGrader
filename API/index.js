import express from 'express';
import multer from 'multer';
import { unzipSb3Data } from '../src/sb3Unzipp.js';
import { Parser } from '../src/parser.js';
import { AST } from '../src/objects/ast.js';
import { countBlockTypes } from '../src/count.js';

const app = express();
const PORT = process.env.PORT || 3000;

const storage = multer.memoryStorage(); // Store the file in memory
const upload = multer({ storage: storage });

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.get('/test', (req, res) => {
    res.status(200).send({
        test: 'got test',
        two: 'two fields'
    })
});

app.get('/example', (req, res) => {
    res.send('<h1>Hello from Express!</h1>');
});

app.post('/upload', upload.single('file'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    const fileBuffer = req.file.buffer;

    try {
        const unzippedFilePath = await unzipSb3Data(fileBuffer);
        // Assuming unzipSb3 correctly resolves with './unzippedSb3/project.json'
        
        const parser = new Parser();
        const astRootNode = await parser.parse(unzippedFilePath); 
        const counts = countBlockTypes(astRootNode);
        console.log("Number of unique block types:", counts);
        

        // Send nodes or some processed data back to the client
        res.json({ blocks: counts });

    } catch (error) {
        console.error("An error occurred:", error);
        res.status(569).json({ error: 'Internal Server Error' });
    }
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

