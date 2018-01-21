import { Component } from '@angular/core';
import { DatParserService } from './services/dat-parser.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ DatParserService ]

})

export class AppComponent {
  title = 'Football Manager';

  constructor( public parser: DatParserService ) {}

  openFile( event ): void {
    let fileStatus = this.parser.openFile( event );
    console.log( fileStatus );
  }

}
