let fs = require('fs');
let path = require('path');

let outDir = path.join("data", "out");

let data = fs.readFileSync(path.join(outDir, "rankDescs.json")).toString();

let descs = JSON.parse(data);

let schedules = {};

let max = {column_descs: []};
for (let desc in descs) {
    if(Object.keys(max.column_descs).length < Object.keys(descs[desc].column_descs).length){
        max = descs[desc];
    }
}

console.log(JSON.stringify(max, null, 2))

