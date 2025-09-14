document.getElementById('readCsvBtn').addEventListener('click', function() {
    document.getElementById('CsvInput').click();
});

document.getElementById('CsvInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        document.getElementById('inputprompt').innerText = 'Loaded file: ' + file.name;
        document.getElementById('readCsvBtn').disabled = true;
        displayCSV(readCSV(file, "ISO-8859-1"), 'outputTable');

        }
});

document.getElementById('formatBtn').addEventListener('click', function() {
    alert('Format button clicked!');
});

