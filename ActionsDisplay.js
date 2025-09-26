document.getElementById('readCsvBtn').addEventListener('click', function() {
    document.getElementById('CsvInput').click();
});

document.getElementById('CsvInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        document.getElementById('inputprompt').innerText = 'Loaded file: ' + file.name;
        document.getElementById('readCsvBtn').disabled = true;
        
        loadcsvfiles(file);

        }
});

document.getElementById('formatBtn').addEventListener('click', function() {
    alert('Format button clicked!');
});


function displayCSVTable(csv,tableId) {
    // Accepts a list and displays as a table
    const table = document.getElementById(tableId);
    table.innerHTML = '';
    for (let rowIndex = 0; rowIndex < csv.length; rowIndex++) {
        const tr = document.createElement('tr');
        for (let colIndex = 0; colIndex < csv[rowIndex].length; colIndex++) {
            const cellElem = document.createElement(rowIndex === 0 ? 'th' : 'td');
            cellElem.textContent = csv[rowIndex][colIndex];
            tr.appendChild(cellElem);
        };
        table.appendChild(tr);
    };
};

function displaymaterialTable(csv,tableId) {
    // Accepts a list and displays as a table
    const table = document.getElementById(tableId);
    table.innerHTML = '';
    for (let rowIndex = 0; rowIndex < csv.length; rowIndex++) {
        const tr = document.createElement('tr');
        for (let colIndex = 0; colIndex < csv[rowIndex].length; colIndex++) {
            const cellElem = document.createElement(rowIndex === 0 ? 'th' : 'td');
            cellElem.textContent = csv[rowIndex][colIndex];
            tr.appendChild(cellElem);
        };
        table.appendChild(tr);
    };
};