import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CountryService } from '../country.service';

@Component({
  selector: 'app-country-details',
  templateUrl: './country-details.component.html',
  styleUrls: ['./country-details.component.css']
})
export class CountryDetailsComponent implements OnInit {
  country;

  constructor(
    private activatedRoute: ActivatedRoute,
    private countryService: CountryService
  ) { }

  ngOnInit(): void {
    let iso2Code = this.activatedRoute.snapshot.paramMap.get("iso2Code");

    this.countryService.getCountriesByIso2Code(iso2Code).subscribe((data)=>{
      this.country = data;
    })
  }

}
