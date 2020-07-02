import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../countries.service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.css']
})
export class CountryListComponent implements OnInit {
  countries = [];

  constructor(
    private countriesService: CountriesService
  ) { }

  ngOnInit(): void {

    this.countriesService.getCountries().subscribe((data)=>{
      this.countries=JSON.parse(JSON.stringify(data));
      console.log("countries: " + this.countries);
    })

  }

}
