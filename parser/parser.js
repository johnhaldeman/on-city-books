let parse = require('csv-parse/lib/sync');
let fs = require('fs');
let path = require('path');

let fileDir = "data";
let outDir = path.join("data", "out");

fs.readdir(fileDir, function (err, files) {
    if (err) {
        console.error("Could not list the directory.", err);
        process.exit(1);
    }

    let descs = {};
    let muniList = {};


    files.forEach(function (file, index) {
        var location = path.join(fileDir, file);

        if (file.endsWith(".csv")) {
            console.log("Processing: " + location);
            let data = fs.readFileSync(location).toString();
            let records = parse(data, { columns: true });
            let muni = {};

            let filePath = "";
            for (let recordnum in records) {
                let record = records[recordnum];

                if (muni.id !== record.MUNID.trim()) {
                    if(muni.id !== undefined){
                        console.log("Writing: " + filePath);
                        fs.writeFileSync(filePath, JSON.stringify(muni));
                    }
                    muni = {};
                    muni.id = record.MUNID.trim();
                    filePath = path.join(outDir, muni.id  + ".json");
                    if (fs.existsSync(filePath)) {
                        let muniData = fs.readFileSync(filePath).toString();
                        muni = JSON.parse(muniData);
                    }
                    muni.desc = record.MUNICIPALITY_DESC;

                    muniList[muni.id] = {
                        name: muni.desc
                    }
                }

                let MARSYEAR = record.MARSYEAR;
                if (muni[MARSYEAR] === undefined) {
                    muni[MARSYEAR] = {};
                }
                let muniyear = muni[MARSYEAR];

                let SLC = record.SLC;
                muniyear[SLC] = {
                    amount: Number(record.AMOUNT),
                    value_text: record.VALUE_TEXT
                }

                descs[SLC] = {
                    line_desc: record.SCHEDULE_LINE_DESC,
                    column_desc: record.SCHEDULE_COLUMN_DESC
                }

                if(SLC.trim() === "slc.02X.L0041.C01.01"){
                    muniList[muni.id].population = Number(record.AMOUNT);
                    muniList[muni.id].population_year = MARSYEAR;
                }
                else if(SLC.trim() === "slc.02X.L0040.C01.01"){
                    muniList[muni.id].households = Number(record.AMOUNT);
                    muniList[muni.id].households_year = MARSYEAR;
                }
            }
        }
    });

    fs.writeFileSync(path.join(outDir, "descs.json"), JSON.stringify(descs));
    fs.writeFileSync(path.join(outDir, "muniList.json"), JSON.stringify(muniList));

});



