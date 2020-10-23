import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WeatherService } from '../weather/weather.service';
import { debounceTime, filter, tap } from 'rxjs/operators';

@Component({
  selector: 'app-city-search',
  templateUrl: './city-search.component.html',
  styleUrls: ['./city-search.component.scss'],
})
export class CitySearchComponent {
  searchForm = this.fb.group({
    query: ['', [Validators.required, Validators.minLength(2)]],
  });

  constructor(private fb: FormBuilder, private weatherService: WeatherService) {
    this.searchForm.valueChanges
      .pipe(
        debounceTime(1000),
        filter(() => !this.searchForm.invalid),
        tap((searchValue) => this.doSearch(searchValue.query))
      )
      .subscribe();
  }

  private doSearch(query: string) {
    console.log(query);
    const userInput = query.split(',').map((s) => s.trim());
    const searchText = userInput[0];
    const country = userInput.length > 1 ? userInput[1] : undefined;
    this.weatherService.updateCurrentWeather(searchText, country);
  }

  getErrorMessage(error): void {
    console.log(error);
  }
}
