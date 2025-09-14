document.getElementById('formatBtn').addEventListener('click', function() {
    alert('Format button clicked!');
});

// csv. file reading button logic
document.getElementById('readCsvBtn').addEventListener('click', function() {
    document.getElementById('CsvInput').click();
});

document.getElementById('CsvInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        alert('Selected file: ' + file.name);
    }
});