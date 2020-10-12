import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { WeatherService } from '../weather/weather.service';

import { CurrentWeatherComponent } from './current-weather.component';

describe('CurrentWeatherComponent', () => {
  let component: CurrentWeatherComponent;
  let fixture: ComponentFixture<CurrentWeatherComponent>;
  let weatherServiceMock: jasmine.SpyObj<WeatherService>;

  beforeEach(async () => {
    const weatherServiceSpy = jasmine.createSpyObj('WeatherService', ['getCurrentWeather']);
    await TestBed.configureTestingModule({
      declarations: [CurrentWeatherComponent],
      providers: [{
        provide: WeatherService, useValue: weatherServiceSpy
      }]
    })
      .compileComponents();
    weatherServiceMock = TestBed.inject(WeatherService) as any;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentWeatherComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    // Arrange
    weatherServiceMock.getCurrentWeather.and.returnValue(of());

    // Act
    fixture.detectChanges();

    // Assert
    expect(component).toBeTruthy();
  });

  it('should get currentWeather from weatherService', () => {
    // Arrange
    weatherServiceMock.getCurrentWeather.and.returnValue(of());

    // Act
    fixture.detectChanges();

    // Assert
    expect(weatherServiceMock.getCurrentWeather).toHaveBeenCalledTimes(1);
  });
});
