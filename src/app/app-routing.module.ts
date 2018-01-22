import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

// components
import { FootballPageComponent } from './football-page/football-page.component';

const routes: Routes = [
    { path: 'soccer', component: FootballPageComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot( routes )
  ],
  declarations: [],
    exports: [ RouterModule ]
})
export class AppRoutingModule { }
