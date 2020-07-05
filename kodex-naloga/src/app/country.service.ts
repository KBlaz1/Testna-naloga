import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(
    private http: HttpClient
  ) { }

  getCountries() {
    return this.http.get('http://api.worldbank.org/v2/country/?format=json');
  }

  getCountriesByIso2Code(iso2Code) {
    console.log('http://api.worldbank.org/v2/country/' + iso2Code + '?format=json');
    return this.http.get('http://api.worldbank.org/v2/country/' + iso2Code + '?format=json');
  }
}
