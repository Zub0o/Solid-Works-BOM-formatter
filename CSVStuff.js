MATERIALURL = 'SheetDBExport.csv'
CSVDATA = [];
MATERIALCHOICES = [];

async function loadcsvfiles(file) {
    CSVDATA = await readCSVinput(file, "ISO-8859-1");

    MaterialChoicesdata = await fetchCSVfile(MATERIALURL);
    MATERIALCHOICES = trimDuplicateData(MaterialChoicesdata,3,1);

    displayCSVTable(MATERIALCHOICES, 'materialTable'); 

    displayCSVTable(CSVDATA, 'outputTable'); 
};

function readCSVinput(csv, decode) {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = function(e) {
            const contents = e.target.result;
            const rows = contents.split(/\r?\n/).filter(row => row.trim() !== "");
            const list = rows.map(row => row.split(';').map(cell => cell.trim()));
            resolve(list);
        };
        reader.readAsText(csv, decode);
    });
};


function fetchCSVfile(url) {
    // Fetches a CSV file from a URL and returns a list (array of arrays)
    return fetch(url)
        .then(response => response.text())
        .then(contents => {
            const rows = contents.split(/\r?\n/).filter(row => row.trim() !== "");
            const list = rows.map(row => row.split(';').map(cell => cell.trim()));
            return list;
        });
};  


function trimDuplicateData(data,start,col) {
    // Trims duplicates from a list
    newdata = [];
    for (let i = start; i < data.length; i++) {
        current = data[i][col];
        if (!newdata.includes(current)) {
            newdata.push(current);
        };
    };
    return newdata.sort();
};

