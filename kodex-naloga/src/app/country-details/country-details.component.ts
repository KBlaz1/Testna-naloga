import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { CountryService } from '../country.service';
import { Country } from '../country';

@Component({
  selector: 'app-country-details',
  templateUrl: './country-details.component.html',
  styleUrls: ['./country-details.component.css']
})
export class CountryDetailsComponent implements OnInit {
  country: Country;

  constructor(
    private activatedRoute: ActivatedRoute,
    private countryService: CountryService,
    private location: Location
  ) { }

  ngOnInit(): void {
    let iso2Code = this.activatedRoute.snapshot.paramMap.get("iso2Code");

    this.countryService.getCountriesByIso2Code(iso2Code).subscribe((data)=>{
      this.country = data[1];
      this.country = this.country[0];
    })
  }

  goBack(): void {
    this.location.back();
  }

}
