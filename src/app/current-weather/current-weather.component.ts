import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { WeatherService } from '../weather/weather.service';
import { CurrentWeather } from './current-weather';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.scss'],
})
export class CurrentWeatherComponent implements OnInit {
  currentWeather$: Observable<CurrentWeather>;

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.currentWeather$ = this.weatherService.currentWeather$;
  }

  getOrdinal(date: number): string {
    const n = new Date(date).getDate();
    return n > 0
      ? ['th', 'st', 'nd', 'rd'][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10]
      : '';
  }
}
