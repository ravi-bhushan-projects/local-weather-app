import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WeatherService } from '../weather/weather.service';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-city-search',
  templateUrl: './city-search.component.html',
  styleUrls: ['./city-search.component.scss'],
})
export class CitySearchComponent implements OnInit {
  searchForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private weatherService: WeatherService
  ) {}

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      query: ['', Validators.minLength(2)],
    });
    this.searchForm.valueChanges
      .pipe(debounceTime(1000))
      .subscribe((searchValue) => {
        if (searchValue) {
          const userInput = searchValue.query.split(',').map((s) => s.trim());
          this.weatherService
            .getCurrentWeather(
              userInput[0],
              userInput.length > 1 ? userInput[1] : undefined
            )
            .subscribe((data) => console.log(data));
        }
      });
  }

  getErrorMessage(error): void {
    console.log(error);
  }
}
