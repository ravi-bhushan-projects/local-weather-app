import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CurrentWeather } from '../current-weather/current-weather';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  readonly currentWeather$ = new BehaviorSubject<CurrentWeather>({
    city: '--',
    country: '--',
    date: Date.now(),
    image: '',
    temperature: 0,
    description: '',
  });

  constructor(private httpClient: HttpClient) {}

  private static transformToCurrentWeather(
    data: CurrentWeatherData
  ): CurrentWeather {
    return {
      city: data.name,
      country: data.sys.country,
      date: data.dt * 1000,
      image: `${environment.baseUrl}openweathermap.org/img/w/${data.weather[0].icon}.png`,
      temperature: data.main.temp - 273.15,
      description: data.weather[0].description,
    };
  }

  getCurrentWeather(
    search: string | number,
    country?: string
  ): Observable<CurrentWeather> {
    let uriParams = new HttpParams();
    if (typeof search === 'string') {
      uriParams = uriParams.set('q', country ? `${search},${country}` : search);
    } else {
      uriParams = uriParams.set('zip', 'search');
    }
    return this.getCurrentWeatherHelper(uriParams);
  }

  updateCurrentWeather(search: string | number, country?: string): void {
    this.getCurrentWeather(search, country).subscribe((weather) =>
      this.currentWeather$.next(weather)
    );
  }

  getCurrentWeatherByCoords(coords: Coordinates): Observable<CurrentWeather> {
    const uriParams = new HttpParams()
      .set('lat', coords.latitude.toString())
      .set('lon', coords.longitude.toString());
    return this.getCurrentWeatherHelper(uriParams);
  }

  getCurrentWeatherHelper(uriParams: HttpParams): Observable<CurrentWeather> {
    uriParams = uriParams.set('appId', environment.appId);

    return this.httpClient
      .get<CurrentWeatherData>(
        `${environment.baseUrl}api.openweathermap.org/data/2.5/weather`,
        { params: uriParams }
      )
      .pipe(map((data) => WeatherService.transformToCurrentWeather(data)));
  }
}

interface CurrentWeatherData {
  weather: [
    {
      description: string;
      icon: string;
    }
  ];
  main: {
    temp: number;
  };
  sys: {
    country: string;
  };
  dt: number;
  name: string;
}
