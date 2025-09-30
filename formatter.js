const MAINHEADERS = ["Kund","Jobb namn","Konfig","Lager","Berarbetning","Material","Antal","Fil URL","Material","Beskrivning","SW Config","Finnish"];
CUSTOMER = "Rosättra"
JOBB = "Linjett"

function formatData() {
    newCSV = []
    console.log("Formatting output data...");

    // User input from dropdowns
    temp = [];
    for (let i=0; i<KONFIGHEADERS.length; i++) {
        temp.push(getdropdownvalues(MATERIALTABLENAME,i));
    };
    choices = combineArrays(CHOICEHEADERS,temp[0],temp[1],temp[2],temp[3])


    // START NEW CSV

    newCSV.push(MAINHEADERS)

    for (let row = 1; row < CSVDATA.length; row++) {
        newrow = [];
        rowmaterial = 0

        newrow.push(CUSTOMER)
        newrow.push(JOBB)

        
        for (let i = 0; i < choices.length; i++) {
            if (choices[i].sheet.includes(CSVDATA[row][0])) {
                rowmaterial = i;
                break
            };
        };

        newrow.push(choices[rowmaterial].config);
        newrow.push(choices[rowmaterial].layer);
        newrow.push(choices[rowmaterial].process);
        newrow.push(choices[rowmaterial].sheet);
        newrow.push(CSVDATA[row][1])
        
        folder = CSVDATA[row][2] + CSVDATA[row][3] + ".SLDPRT"
        newrow.push(folder)

        newrow.push(choices[rowmaterial].sheet);
        newrow.push(CSVDATA[row][4])
        newrow.push(CSVDATA[row][5])
        newrow.push(CSVDATA[row][6])

        newCSV.push(newrow)
    }
    newCSV.sort() 
    writecsv(newCSV); 
};