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

        const text = await response.text();

        try {
            const data = JSON.parse(text);
            // Render the data to the #results div
            document.querySelector('#results').textContent = JSON.stringify(data, null, 2);
        } catch (e) {
            console.error('Failed to parse JSON:', text);
            throw e;
        }

    } catch (error) {
        console.error('Error uploading file:', error.message);
    }
});
