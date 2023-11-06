document.querySelector('form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    try {
        const response = await fetch('/upload', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error(`Server responded with status: ${response.statusText}`);
        }

        const data = JSON.parse(await response.text());
        renderResults(data);

    } catch (error) {
        console.error('Error:', error.message);
    }
});

function renderResults(jsonData) {
    const container = document.createElement('div');
    console.log(jsonData);
    const groupedData = {
        "Motion": [],
        "Looks": [],
        "Sound": [],
        "Events": [],
        "Control": [],
        "Sensing": [],
        "Operators": [],
        "Data": [],
        "Music": [],
        "Pen": [] 
    };

    for (let opcode in jsonData.blocks) { 
        if (opcode.startsWith("motion_")) {
            groupedData["Motion"].push({opcode, count: jsonData.blocks[opcode]});
        } else if (opcode.startsWith("looks_")) {
            groupedData["Looks"].push({opcode, count: jsonData.blocks[opcode]});
        } else if (opcode.startsWith("sound_")) {
            groupedData["Sound"].push({opcode, count: jsonData.blocks[opcode]});
        } else if (opcode.startsWith("event_")) {
            groupedData["Events"].push({opcode, count: jsonData.blocks[opcode]});
        } else if (opcode.startsWith("control_")) {
            groupedData["Control"].push({opcode, count: jsonData.blocks[opcode]});
        } else if (opcode.startsWith("sensing_")) {
            groupedData["Sensing"].push({opcode, count: jsonData.blocks[opcode]});
        } else if (opcode.startsWith("operator_")) {
            groupedData["Operators"].push({opcode, count: jsonData.blocks[opcode]});
        } else if (opcode.startsWith("data_")) {
            groupedData["Data"].push({opcode, count: jsonData.blocks[opcode]});
        } else if (opcode.startsWith("music_")) {
            groupedData["Music"].push({opcode, count: jsonData.blocks[opcode]});
        } else if (opcode.startsWith("pen_")) {
            groupedData["Pen"].push({opcode, count: jsonData.blocks[opcode]});
        } 
    }

    for (let category in groupedData) {
        console.log(`Group ${category} has ${groupedData[category].length} opcodes.`);
        const group = document.createElement('div');
        group.classList.add('opcode-group');
        group.id = 'group-' + category;
        
        const title = document.createElement('div');
        title.classList.add('opcode-title');
        title.textContent = category;
        group.appendChild(title);
        
        groupedData[category].forEach(item => {
            const opcodeItem = document.createElement('div');
            opcodeItem.classList.add('opcode-item');
            opcodeItem.textContent = `${item.opcode}: ${item.count}`;
            group.appendChild(opcodeItem);
        });

        container.appendChild(group);
    }

    const resultsDiv = document.querySelector('#results');
    resultsDiv.innerHTML = ''; // Clear existing content if any
    resultsDiv.appendChild(container);
}
