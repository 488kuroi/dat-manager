import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

// services
import { DatParserService } from './services/dat-parser.service';

// components
import { AppComponent } from './app.component';
import { FootballPageComponent } from './football-page/football-page.component';
import { AppRoutingModule } from './/app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    FootballPageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  bootstrap: [AppComponent],
  entryComponents: [ AppComponent ],
  providers: [ DatParserService ],
})
export class AppModule { }
