import { Component, OnInit } from '@angular/core';

import { CountryService } from '../country.service';
import { Country } from '../country';


@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.css']
})

export class CountryListComponent implements OnInit {
  countries: Country[];
  //sortedCountries: Country[] = [];

  constructor(
    private countryService: CountryService,
  ) { }

  ngOnInit(): void {
    this.getCountries()
  }

  getCountries(): void {
    this.countryService.getCountries()
      .subscribe(countries => this.countries = countries[1]);
  }

  sortTable(): void {
    this.countries.reverse();
  }

  countryUp(id: string): void {
    let index = this.findIndexById(id);
    if (index != 0) {
      this.flipCountries(-1, index);
    }
  }

  countryDown(id: string): void {
    let index = this.findIndexById(id);
    if (index != this.countries.length - 1) {
      this.flipCountries(1, index);
    }
  }

  private flipCountries(n: number, index: number) {
      let tempCountry = this.countries[index];
      this.countries[index] = this.countries[index + n];
      this.countries[index + n] = tempCountry;
  }

  private findIndexById(id: string): number {
    for (let i = 0; i < this.countries.length; i++) {
      if (id === this.countries[i].id) {
        console.log(i);
        return i;
      }
    }
    return -1;
  }

  /*
  sorTableABC(n: number): void {
    let names: string[] = [];

    for (let i = 0; i < this.countries.length; i++) {
      names.push(this.countries[i].name);
    }
    names.sort();
    //console.log(names);

    for (let i = 0; i < names.length; i++) {
      for (let j = 0; j < this.countries.length; j++) {
        if (names[i] == this.countries[j].name) {
          this.sortedCountries.push(this.countries[j]);
          break;
        }
      }
    }
    console.log("sorted: " + this.sortedCountries[0].name);
    this.countries = this.sortedCountries;
    this.countries.forEach(country => console.log(country));

  }*/
}
