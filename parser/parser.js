let parse = require('csv-parse/lib/sync');
let fs = require('fs');
let path = require( 'path' );

let fileDir = "data"

fs.readdir( fileDir, function( err, files ) {
    if( err ) {
        console.error( "Could not list the directory.", err );
        process.exit( 1 );
    } 

    files.forEach( function( file, index ) {
            var location = path.join( fileDir, file );

            console.log(location);
    } );
} );



