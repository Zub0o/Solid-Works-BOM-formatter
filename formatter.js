function displayCSV(csv,tableId) {
    if (csv instanceof Promise) {
        csv.then(data => displayCSV(data, tableId));
        return;
    }
    // Accepts a list and displays as a table
    const table = document.getElementById(tableId);
    table.innerHTML = "";
    csv.forEach((row, rowIndex) => {
        const tr = document.createElement('tr');
        row.forEach(cell => {
            const cellElem = document.createElement(rowIndex === 0 ? 'th' : 'td');
            cellElem.textContent = cell;
            tr.appendChild(cellElem);
        });
        table.appendChild(tr);
    });
};

function readCSV(csv,decode) {
    // Reads a CSV file and returns a list

    return new Promise((resolve, reject) => {
        if (csv) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const contents = e.target.result;
                const rows = contents.split(/\r?\n/).filter(row => row.trim() !== "");
                const list = rows.map(row => row.split(';').map(cell => cell.trim()));
                resolve(list);
            };
            reader.onerror = reject;
            reader.readAsText(csv, decode);
        } else {
            resolve([]);
        }
    });
};