// script.js
document.getElementById('translate-button').addEventListener('click', async function () {
    const textInput = document.getElementById('text-input').value;
    const language = document.querySelector('input[name="language"]:checked').value;

    try {
        const response = await fetch('/translate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: textInput, targetLanguage: language }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.error) {
            throw new Error(data.error);
        }

        document.getElementById('original-text').textContent = textInput;
        document.getElementById('translated-text').textContent = data.translatedText;

        document.getElementById('input-section').style.display = 'none';
        document.getElementById('output-section').style.display = 'block';
    } catch (error) {
        console.error('Error translating text:', error.message);
        alert('An error occurred during translation. Please try again.');
    }
});

document.getElementById('start-over-button').addEventListener('click', function () {
    document.getElementById('input-section').style.display = 'block';
    document.getElementById('output-section').style.display = 'none';
    document.getElementById('text-input').value = '';
});
