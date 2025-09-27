KONFIGHEADERS = ["Skiv typ/storlek","Konfig","Lager","Berarbetning"]


document.getElementById('readCsvBtn').addEventListener('click', function() {
    document.getElementById('CsvInput').click();
});

document.getElementById('CsvInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        document.getElementById('inputprompt').innerText = 'Loaded file: ' + file.name;
        document.getElementById('readCsvBtn').disabled = true;
        
        loadcsvfiles(file);

    };
});


document.getElementById('formatBtn').addEventListener('click', function() {
    alert('Format button clicked!');
    formatOutputData(CSVDATA);
});


function displayCSVTable(csv,tableId) {
    // Accepts a list and displays as a table
    const table = document.getElementById(tableId);
    table.id = tableId
    table.innerHTML = '';
    for (let rowIndex = 0; rowIndex < csv.length; rowIndex++) {
        const tr = document.createElement('tr');
        
        for (let colIndex = 0; colIndex < csv[rowIndex].length; colIndex++) {
            const cellElem = document.createElement(rowIndex === 0 ? 'th' : 'td');
            cellElem.textContent = csv[rowIndex][colIndex];
            tr.appendChild(cellElem);
            cellElem.id = tableId+"col";
        };
        
        table.appendChild(tr);
    };
};


function getdropdownvalues(tableId,col) {
    id = "select#"+tableId+"_dropdown_"+String(col);
    const table = document.getElementById(tableId);
    const selects = table.querySelectorAll(id);
    const values = Array.from(selects).map(select => select.value);

};


function displaymaterialTable(tableId) {
    findusedmaterials();
    csv = CSVDATA;

    // test = combineArrays(CHOICEHEADERS,MATERIALCHOICES);
    const table = document.getElementById(tableId);
    const tr = document.createElement('tr');

    // First empty
    const td = document.createElement('td');
    tr.appendChild(td);
    
    for (let i = 0; i < KONFIGHEADERS.length; i++) {
        const td = document.createElement('td');
        text = document.createElement("h3")
        text.id = "materialchoice"
        text.textContent = KONFIGHEADERS[i]

        td.appendChild(text);
        tr.appendChild(td);
    };


    table.appendChild(tr);
    

    for (let i=0; i<USEDMATERIALS.length; i++) {
        dropdownfieldrow(tableId,USEDMATERIALS[i],KONFIGOPTIONS,LAGEROPTIONS,BEARBETNINGOPTIONS);
    
    getdropdownvalues(tableId,0);
    // getdropdownvalues('materialTable',0);
    };
};


// Creates a dropdown menu field under the specified table
function dropdownfieldrow(tableId,material,...options) {
    const table = document.getElementById(tableId);
    // Create a container row for the dropdown
    const tr = document.createElement('tr');

    const header = document.createElement('td');
    header.textContent = material;

    tr.appendChild(header);
    createdropdown(tableId,tr,0,MATERIALCHOICES);

    // First col for material choices
    for (let i = 0; i < options.length; i++) {
        createdropdown(tableId,tr,i,options[i]);
    };

    table.appendChild(tr);
};


function createdropdown(tableId,tr,id,options) {
        const td = document.createElement('td');
        td.id = tableId+"Col";
        // Create the dropdown
        const select = document.createElement('select');
        select.id = tableId + "_dropdown_" + String(id);
        options.forEach(opt => {
            const option = document.createElement('option');
            option.value = opt;
            option.textContent = opt;
            select.appendChild(option);
        });
        td.appendChild(select);
        tr.appendChild(td);
};