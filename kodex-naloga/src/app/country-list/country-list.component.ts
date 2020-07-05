import { Component, OnInit } from '@angular/core';
import { JsonPipe } from '@angular/common';

import { CountryService } from '../country.service';


@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.css']
})

export class CountryListComponent implements OnInit {
  countries = [];

  constructor(
    private countryService: CountryService,
  ) { }

  ngOnInit(): void {

    this.countryService.getCountries().subscribe((data)=>{
      this.countries=JSON.parse(JSON.stringify(data));
    })

  }

}
