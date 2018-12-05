let parse = require('csv-parse/lib/sync');
let fs = require('fs');
let path = require( 'path' );

let fileDir = "data";
let outDir = path.join("data", "out");

fs.readdir( fileDir, function( err, files ) {
    if( err ) {
        console.error( "Could not list the directory.", err );
        process.exit( 1 );
    } 

    let munis = {};

    files.forEach( function( file, index ) {
        var location = path.join( fileDir, file );

        if(file.endsWith(".csv")){
            console.log("Processing: " + location);
            let data = fs.readFileSync(location).toString();
            let records = parse(data, {columns: true});

            for(let recordnum in records){
                let record = records[recordnum];

                let id = record.MUNID.trim();
                if(munis[id] === undefined){
                    munis[id] = {
                        id: id,
                        desc: record.MUNICIPALITY_DESC
                    };
                }
                let muni = munis[id];

                let MARSYEAR = record.MARSYEAR;
                if(muni[MARSYEAR] === undefined){
                    muni[MARSYEAR] = {};
                }
                let muniyear = muni[MARSYEAR];


                let SLC = record.SLC;
                muniyear[SLC] = {
                    amount: Number(record.AMOUNT),
                    value_text: record.VALUE_TEXT,
                    line_desc: record.SCHEDULE_LINE_DESC,
                    column_desc: record.SCHEDULE_COLUMN_DESC
                }
            }
        }
    } );

    for(let id in munis){
        let muni = munis[id];

        fs.writeFile(fs.join(outDir, id + ".json"), JSON.stringify(muni), function(err, data){
            if (err) console.log(err);
            console.log("Successfully Written to " + id + ".json");
        });

    }


} );



