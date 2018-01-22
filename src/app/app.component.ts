import { Component } from '@angular/core';
import { DatParserService } from './services/dat-parser.service';
import {FootballPageComponent} from './football-page/football-page.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ DatParserService ]

})

export class AppComponent {

  title = 'Dat Manager';
  pages: Array<{ title: string, component: any }>;

  constructor( public parser: DatParserService ) {

      this.pages = [ { title: 'Loading page', component: AppComponent },
                     { title: 'Soccer stats', component: FootballPageComponent }
      ];

  }

  openFile( event: any ): void {
    this.parser.openFile( event ).then( ( reponse ) => {
      console.log( reponse );
    } );
  }

}
