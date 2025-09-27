const MATERIALURL = 'SheetDBExport.csv'
const CHOICEHEADERS =  ['Material','Sheet','Konfig',"Lager","Berarbetning"];

const KONFIGOPTIONS = ["Rosättra nesting","Rosättra singel"]
const LAGEROPTIONS = ["Rosättra nesting","Rosättra singel","Rosättra corian"]
const BEARBETNINGOPTIONS = ["Rosättra nesting","Rosättra Corian"]

USEDMATERIALS = [];

CSVDATA = [];
MATERIALCHOICES = [];
SELECTEDSETTINGS = [];

async function loadcsvfiles(file) {
    CSVDATA = await readCSVinput(file, "ISO-8859-1",",");

    MaterialChoicesdata = await fetchCSVfile(MATERIALURL);
    MATERIALCHOICES = trimDuplicateData(MaterialChoicesdata,3,1);

    displaymaterialTable('materialTable'); 
    displayCSVTable(CSVDATA, 'outputTable'); 

};

function findusedmaterials() {
    for (let i=0;i < CSVDATA.length; i++) {
        // console.log(CSVDATA[i][0]);
        if (!USEDMATERIALS.includes(CSVDATA[i][0])) {
            USEDMATERIALS.push(CSVDATA[i][0]);
        };
    };
};

function readCSVinput(csv, decode,sep=';') {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = function(e) {
            const contents = e.target.result;
            const rows = contents.split(/\r?\n/).filter(row => row.trim() !== "");
            const list = rows.map(row => row.split(sep).map(cell => cell.trim()));
            resolve(list);
        };
        reader.readAsText(csv, decode);
    });
};


function fetchCSVfile(url,sep=';') {
    // Fetches a CSV file from a URL and returns a list (array of arrays)
    return fetch(url)
        .then(response => response.text())
        .then(contents => {
            const rows = contents.split(/\r?\n/).filter(row => row.trim() !== "");
            const list = rows.map(row => row.split(sep).map(cell => cell.trim()));
            return list;
        });
};  

// Trims duplicates from a list
function trimDuplicateData(data,start,col) {

    newdata = [];
    for (let i = start; i < data.length; i++) {
        current = data[i][col];
        if (!newdata.includes(current)) {
            newdata.push(current);
        };
    };
    return newdata.sort();
};

