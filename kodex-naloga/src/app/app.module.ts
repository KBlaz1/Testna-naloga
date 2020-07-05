import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CountryListComponent } from './country-list/country-list.component';
import { CountryService } from  './country.service';
import { HttpClientModule } from '@angular/common/http';
import { CountryDetailsComponent } from './country-details/country-details.component';

const routes: Routes = [
  { path: '', component: CountryListComponent },
  { path: 'countries', component: CountryListComponent },
  { path: 'countries/:iso2Code', component: CountryDetailsComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    CountryListComponent,
    CountryDetailsComponent
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
