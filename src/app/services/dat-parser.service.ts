import { Injectable } from '@angular/core';


const validFootballContent = /^([a-zA-Z]|[0-9])*$/i;

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
  stringParser( string ) {

    // build an array of lines nad check that the file is not empty
    let lines =  string.split(/\r?\n/);
    if ( lines.length < 2 ) { return { code: 500, body: 'Attention, empty file provided' }; }

    // split again the file, in order to check the headers of the table and to get separated values for each line
    let table = [];
    lines.map( ( item, index ) => {
        let row       = item.split( ' ' );
        // push in table array only items with a non empty content
        let parsedRow = row.filter( ( rowItem, rowIndex ) => {
            if ( rowItem.length > 0 && ( validFootballContent.test( rowItem ) !== false ) ) { return rowItem; }
        } );
        table.push( parsedRow );

    } );
    console.log( table );

  }

  /*
  * @param - event - Object the event occurred when the load input changes
  * @return -> An object with a success code and a content or a error code and an error message
  * ex: success => { code: 200, body: Object }
  *     error   => { code: 500, body: String }
  * */
  openFile( event ) {
      let input         = event.target;
      console.log( input.files );
      let fileExtension = input.files[ 0 ].name.split( '.' ).pop();

      // check that he file is really in input and that the extesnion is correct
      if ( input.files.length === 0 ) { return  { code: 500, body: 'No input file provided!' }; }
      if ( fileExtension !== 'dat' ) { return  { code: 500, body: 'No valid file provided, please load a ".dat" file.' }; }

      for ( let index = 0; index < input.files.length; index++) {
          let reader = new FileReader();
          reader.onload = () => {
              let text = reader.result;
              this.stringParser( text );
          };
          reader.readAsText(input.files[index]);
      }
  }



}
