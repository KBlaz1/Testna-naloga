import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  constructor(
    private http: HttpClient
  ) { }

  getCountries() {
    return this.http.get('http://api.worldbank.org/v2/country/?format=json');
  }

}
