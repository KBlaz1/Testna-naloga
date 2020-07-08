import { Component, OnInit } from '@angular/core';

import { CountryService } from '../country.service';
import { Country } from '../country';
import { Column, IcolumnToJson } from '../column';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.css']
})

export class CountryListComponent implements OnInit {
  countries: Country[];
  layouts: string[] = [];
  errorText: boolean = false;

  //columns
  columnName = new Column("name", null);
  columnCapital = new Column("capital", null);
  columnRegion = new Column("region", null);
  columnIncome = new Column("income", null);

  columnPrimary: Column;

  constructor(
    private countryService: CountryService,
  ) { }

  ngOnInit(): void {
    this.getCountries();
    this.addNamesToSelect();
  }

  getCountries(): void {
    this.countryService.getCountries()
      .subscribe(countries =>
        this.countries = countries[1])
  }

  sortBy(propertyName: string): void {
    switch (propertyName) {
      case ("name"):
        this.columnName.changeReverseValue();
        this.sortByName();
        break;
      case ("capital"):
        this.columnCapital.changeReverseValue();
        this.sortByCapital();
        break;
      case ("region"):
        this.columnRegion.changeReverseValue();
        this.sortByRegion();
        break;
      case ("income"):
        this.columnIncome.changeReverseValue();
        this.sortByIncome()
    }
  }

  sortByName() {
    this.columnPrimary = this.columnName;

    this.columnName.primary = true;
    this.columnCapital.primary = false;
    this.columnIncome.primary = false;
    this.columnRegion.primary = false

    this.columnCapital.reverse = null;
    this.columnIncome.reverse = null;
    this.columnRegion.reverse = null;
    let isReverse = this.columnName.reverse;

    if (isReverse == true) {
      this.countries.sort((a: Country, b: Country) => {
        if (a.name < b.name) {
          return 1;
        }
        else if (a.name > b.name) {
          return -1;
        }
        return 0;
      });
    }
    else if (isReverse == false) {
      this.countries.sort((a: Country, b: Country) => {
        if (a.name > b.name) {
          return 1;
        }
        else if (a.name < b.name) {
          return -1;
        }
        return 0;
      });
    }
    else if (isReverse == null) {
      this.getCountries();
    }

  }

  sortByCapital() {
    this.columnPrimary = this.columnCapital;

    this.columnName.primary = false;
    this.columnCapital.primary = true;
    this.columnIncome.primary = false;
    this.columnRegion.primary = false

    this.columnName.reverse = null;
    this.columnIncome.reverse = null;
    this.columnRegion.reverse = null;
    let isReverse = this.columnCapital.reverse;

    if (isReverse == true) {
      this.countries.sort((a: Country, b: Country) => {
        if (a.capitalCity < b.capitalCity) {
          return 1;
        }
        else if (a.capitalCity > b.capitalCity) {
          return -1;
        }
        return 0;
      });
    }
    else if (isReverse == false) {
      this.countries.sort((a: Country, b: Country) => {
        if (a.capitalCity > b.capitalCity) {
          return 1;
        }
        else if (a.capitalCity < b.capitalCity) {
          return -1;
        }
        return 0;
      });
    }
    else if (isReverse == null) {
      this.getCountries();
    }
  }


  sortByRegion() {
    this.columnPrimary = this.columnRegion;

    this.columnName.primary = false;
    this.columnCapital.primary = false;
    this.columnIncome.primary = false;
    this.columnRegion.primary = true;

    this.columnName.reverse = null;
    this.columnIncome.reverse = null;
    this.columnCapital.reverse = null;
    let isReverse = this.columnRegion.reverse;

    if (isReverse == true) {
      this.countries.sort((a: Country, b: Country) => {
        if (a.region.value < b.region.value) {
          return 1;
        }
        else if (a.region.value > b.region.value) {
          return -1;
        }
        return 0;
      });
    }
    else if (isReverse == false) {
      this.countries.sort((a: Country, b: Country) => {
        if (a.region.value > b.region.value) {
          return 1;
        }
        else if (a.region.value < b.region.value) {
          return -1;
        }
        return 0;
      });
    }
    else if (isReverse == null) {
      this.getCountries();
    }

  }

  sortByIncome() {
    this.columnPrimary = this.columnIncome

    this.columnName.primary = false;
    this.columnCapital.primary = false;
    this.columnIncome.primary = true;
    this.columnRegion.primary = false;

    this.columnName.reverse = null;
    this.columnRegion.reverse = null;
    this.columnCapital.reverse = null;
    let isReverse = this.columnIncome.reverse;

    if (isReverse == true) {
      this.countries.sort((a: Country, b: Country) => {
        if (a.incomeLevel.value < b.incomeLevel.value) {
          return 1;
        }
        else if (a.incomeLevel.value > b.incomeLevel.value) {
          return -1;
        }
        return 0;
      });
    }
    else if (isReverse == false) {
      this.countries.sort((a: Country, b: Country) => {
        if (a.incomeLevel.value > b.incomeLevel.value) {
          return 1;
        }
        else if (a.incomeLevel.value < b.incomeLevel.value) {
          return -1;
        }
        return 0;
      });
    }
    else if (isReverse == null) {
      this.getCountries();
    }
  }


  clearLayouts(): void {
    localStorage.removeItem("ly:key");
    this.layouts = [];
  }

  saveLayout(): void {
    let layoutName: string = (<HTMLInputElement>document.getElementById("layoutName")).value;
    (<HTMLInputElement>document.getElementById("layoutName")).value = "";
    let columnPrimary: Column = this.columnPrimary;
    let layObj: IcolumnToJson = { layout: layoutName, column: "none", descending: null };
    let key: string = "ly:key";
    let layoutObjs: IcolumnToJson[] = [];


    if (layoutName == "") {
      this.errorText = true;
      return;
    }
    //check if same name exists in localStorage
    if (localStorage.getItem(key) != null) {
      layoutObjs = JSON.parse(localStorage.getItem(key));
      for (let i = 0; i < layoutObjs.length; i++) {
        if (layoutObjs[i].layout == layoutName) {
          this.errorText = true;
          return;
        }
      }
    }

    if (localStorage.getItem("ly:key") === null) {
      if (columnPrimary != undefined) {
        layObj.column = columnPrimary.name;
        layObj.descending = columnPrimary.reverse;
      }

      layoutObjs.push(layObj);
      localStorage.setItem(key, JSON.stringify(layoutObjs));
    }
    else {
      if (columnPrimary != undefined) {
        layObj.column = columnPrimary.name;
        layObj.descending = columnPrimary.reverse;
      }
      layoutObjs = JSON.parse(localStorage.getItem(key));
      localStorage.removeItem(key);
      layoutObjs.push(layObj);
      localStorage.setItem(key, JSON.stringify(layoutObjs));

    }
    this.errorText = false;
    this.addNamesToSelect();
  }

  changeLayout(): void {
    let layoutSelect: HTMLSelectElement = (<HTMLSelectElement>document.getElementById("layoutSelect"));
    let index = layoutSelect.selectedIndex;
    let selectedLayout: string = layoutSelect.options[index].text;
    let layoutObjs: IcolumnToJson[] = JSON.parse(localStorage.getItem("ly:key")) as IcolumnToJson[];

    for (let i = 0; i < layoutObjs.length; i++) {
      if (layoutObjs[i].layout == selectedLayout) {
        let layObj: IcolumnToJson = layoutObjs[i];

        if (layObj.column == "name") {
          this.columnName.reverse = layObj.descending;
          this.sortByName();
        }
        else if (layObj.column == "capital") {
          this.columnCapital.reverse = layObj.descending;
          this.sortByCapital();
        }
        else if (layObj.column == "region") {
          this.columnRegion.reverse = layObj.descending;
          this.sortByRegion();
        }
        else if (layObj.column == "income") {
          this.columnIncome.reverse = layObj.descending;
          this.sortByRegion();
        }
        else if (layObj.column == "none") {
          this.getCountries();
          this.columnName.reverse = null;
          this.columnCapital.reverse = null;
          this.columnRegion.reverse = null;
          this.columnIncome.reverse = null;
        }
          this.columnName.selectArrow();
          this.columnCapital.selectArrow();
          this.columnIncome.selectArrow();
          this.columnRegion.selectArrow();
      }
    }
  }

  private addNamesToSelect(): void {
    if (localStorage.getItem("ly:key") != null) {
      this.layouts = [];
      let layoutObjs: IcolumnToJson[] = JSON.parse(localStorage.getItem("ly:key")) as IcolumnToJson[];
      for(let i = 0; i < layoutObjs.length; i++) {
        this.layouts.push(layoutObjs[i].layout);
      }

    }
  }

}
