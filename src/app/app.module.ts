import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';


// services
import { DatParserService } from './services/dat-parser.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  bootstrap: [AppComponent],
  entryComponents: [ AppComponent ],
  providers: [ DatParserService ],
})
export class AppModule { }
