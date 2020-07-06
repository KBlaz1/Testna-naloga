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
    this.getCountries();
    this.addAllKeysToSelect();
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

  saveLayout(): void {
    let layoutName: string = (<HTMLInputElement>document.getElementById("layoutName")).value;
    let countryIds: string[] = [];

    this.countries.forEach(country =>
      countryIds.push(country.id));

    localStorage.setItem(layoutName, JSON.stringify(countryIds));
    this.addKeyToSelected(layoutName);
  }

  clearLayouts(): void {
    localStorage.clear();
    let layoutSelect: HTMLSelectElement = (<HTMLSelectElement>document.getElementById("layoutSelect"));

    for(let i = layoutSelect.options.length; i >= 1; i--) {
      layoutSelect.options[i] = null;
    }
  }

  changeLayout(): void {
    let layoutSelect: HTMLSelectElement = (<HTMLSelectElement>document.getElementById("layoutSelect"));
    let index = layoutSelect.selectedIndex;
    let selectedLayout: string = layoutSelect.options[index].text;
    let newLayout: Country[] = [];

    let storedLayeout: string[] = JSON.parse(localStorage.getItem(selectedLayout));

    for (let i = 0; i < storedLayeout.length; i++) {
      for (let j = 0; j < this.countries.length; j++) {
        if (storedLayeout[i] == this.countries[j].id) {
          newLayout.push(this.countries[j]);
        }
      }
    }

    this.countries = newLayout;
  }

  private addAllKeysToSelect(): void {
    let keys: string[] = [];

    if (localStorage.length > 0) {

      for (let i = 0; i < localStorage.length; i++) {
        keys.push(localStorage.key(i));
      }

      for (let i = 0; i < keys.length; i++) {
        this.addKeyToSelected(keys[i]);
      }
    }
  }

  private addKeyToSelected(key: string): void {
    let layoutSelect: HTMLSelectElement = (<HTMLSelectElement>document.getElementById("layoutSelect"));
    let option: HTMLOptionElement = document.createElement("option");
    option.text = key;
    layoutSelect.add(option);
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
