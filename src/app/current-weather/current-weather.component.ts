import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather/weather.service';
import { CurrentWeather } from './current-weather';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.scss']
})
export class CurrentWeatherComponent implements OnInit {

  currentWeather: CurrentWeather;

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.weatherService.getCurrentWeather('Bangalore', 'IN')
      .subscribe(data => this.currentWeather = data);
  }

}
