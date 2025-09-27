// Combines two or more arrays into an array of objects
function combineArrays(headers,...arrays) {
    const maxLength = Math.max(...arrays.map(arr => arr.length));
    const combined = [];
    for (let i = 0; i < maxLength; i++) {
        const obj = {};
        arrays.forEach((arr, arrIdx) => {
            obj[headers[arrIdx]] = arr[i] !== undefined ? arr[i] : "";
        });
        combined.push(obj);
    }
    return combined;
};


function formatOutputData(data) {
    console.log("Formatting output data...");
};

