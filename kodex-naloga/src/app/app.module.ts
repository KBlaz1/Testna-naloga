import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CountryListComponent } from './country-list/country-list.component';
import { CountriesService } from  './countries.service';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  { path: '', component: CountryListComponent },
  { path: 'countries', component: CountryListComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    CountryListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
