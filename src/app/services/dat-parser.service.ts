import { Injectable } from '@angular/core';


const validationRules = {
    football: {
        regex: /^([a-zA-Z]|[0-9])*$/i,
        headers: ["Team", "P", "W", "L", "D", "F", "A", "Pts"]
    }
};


@Injectable()
export class DatParserService {

  constructor() {
  }

  /*
  * @param - string - Text inside the provided file from user
  * @ return -> An Object with a success code and a body with the parsed content of the file,
  *             or an object with an error code and a body with an error message
  * ex: success => { code: 200, body: Object }
  *     error   => { code: 500, body: String }
  * */
  stringParser( string: string ): any {

    // build an array of lines nad check that the file is not empty
    let lines =  string.split(/\r?\n/);
    if ( lines.length < 2 ) { return { code: 500, body: 'Attention, empty file provided' }; }

    // split again the file, in order to check the headers of the table and to get separated values for each line
    let table = [];
    lines.map( ( item, index ) => {
        let row       = item.split( ' ' );
        // push in table array only items with a non empty content
        let parsedRow = row.filter( ( rowItem, rowIndex ) => {
            if ( rowItem.length > 0 && ( validationRules.football.regex.test( rowItem ) !== false ) ) { return rowItem; }
        } );
        if ( parsedRow.length > 0 ) { table.push( parsedRow ); }
    } );

    console.log( table[ 0 ] );

    if ( table[ 0 ].toString() === validationRules.football.headers.toString() ) {
        return { code: 200, body: table, pageRoute: 'soccer' };
    } else {
        return { code: 500, body: 'Invalid columns in file, please read the documentation in order to provide the correct file' };
    }

  }

  /*
  * @param - event - Object the event occurred when the load input changes
  * @return -> An object with a success code and a content or a error code and an error message
  * ex: success => { code: 200, body: Object }
  *     error   => { code: 500, body: String }
  * */
  openFile( event: any ): any {
      return new Promise( ( resolve, reject ) => {
          let input         = event.target;
          console.log( input.files );
          let fileExtension = input.files[ 0 ].name.split( '.' ).pop();

          // check that he file is really in input and that the extesnion is correct
          if ( input.files.length === 0 ) { reject ( { code: 500, body: 'No input file provided!' } ); }
          if ( fileExtension !== 'dat' ) { reject ( { code: 500, body: 'No valid file provided, please load a ".dat" file.' } ); }

          for ( let index = 0; index < input.files.length; index++) {
              let reader = new FileReader();
              reader.onload = () => {
                  let text = reader.result;
                  let parsedData = this.stringParser( text );
                  if ( parsedData[ 'code' ] === 200 ) {
                      resolve( [  parsedData[ 'body' ], parsedData[ 'pageRoute' ] ] );
                  } else {
                      reject ( parsedData[ 'body' ] );
                  }
              };
              reader.readAsText(input.files[index]);
          }
      } );
  }



}
