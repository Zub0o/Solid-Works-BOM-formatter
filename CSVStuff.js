const MATERIALURL = "SheetDBExport.csv";

const MATERIALTABLENAME = "materialTable";

const KONFIGOPTIONS = ["Rosättra nesting", "Rosättra singel"];
const LAGEROPTIONS = [
    "Rosättra nesting",
    "Rosättra singel",
    "Rosättra corian",
];
const BEARBETNINGOPTIONS = ["Rosättra nesting", "Rosättra Corian"];

USEDMATERIALS = [];

CHOICEHEADERS = ["sheet", "config", "layer", "process"];

CSVDATA = [];
MATERIALCHOICES = [];
SELECTEDSETTINGS = [];

async function loadcsvfiles(file) {
    CSVDATA = await readCSVinput(file, "ISO-8859-1", ",");

    MaterialChoicesdata = await fetchCSVfile(MATERIALURL);
    MATERIALCHOICES = trimDuplicateData(MaterialChoicesdata, 3, 1);

    displaymaterialTable(MATERIALTABLENAME);
    displayCSVTable(CSVDATA, "outputTable");
}

function writecsv(list, name, sep = ";") {
    let csvContent = `data:text/csv;charset=utf-8,${"\ufeff"}`;

    for (let i = 0; i < list.length; i++) {
        let row = list[i].join(sep);
        csvContent += row + "\r\n";
    }

    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", String(name));
    document.body.appendChild(link); // Required for FF

    link.click();
}

function findusedmaterials() {
    for (let i = 1; i < CSVDATA.length; i++) {
        if (!USEDMATERIALS.includes(CSVDATA[i][0])) {
            USEDMATERIALS.push(CSVDATA[i][0]);
        }
    }
}

function readCSVinput(csv, decode, sep = ";") {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = function (e) {
            const contents = e.target.result;
            list = [];
            const rows = contents
                .split(/\r?\n/)
                .filter((row) => row.trim() !== "");

            for (let r = 0; r < rows.length; r++) {
                row = rows[r].split(sep);
                list.push(row);
            }

            resolve(list);
        };
        reader.readAsText(csv, decode);
    });
}

function fetchCSVfile(url, sep = ";") {
    // Fetches a CSV file from a URL and returns a list (array of arrays)
    return fetch(url)
        .then((response) => response.text())
        .then((contents) => {
            const rows = contents
                .split(/\r?\n/)
                .filter((row) => row.trim() !== "");
            const list = rows.map((row) =>
                row.split(sep).map((cell) => cell.trim()),
            );
            return list;
        });
}

// Trims duplicates from a list
function trimDuplicateData(data, start, col) {
    newdata = [];
    for (let i = start; i < data.length; i++) {
        current = data[i][col];
        if (!newdata.includes(current)) {
            newdata.push(current);
        }
    }
    return newdata.sort();
}
