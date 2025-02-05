import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherQuery } from './models/weather-query';
import { WeatherService } from './services/weather.service';
import { WeatherReport } from './models/weather-response';
import { BriefingFormComponent } from './components/briefing-form/briefing-form.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [CommonModule, BriefingFormComponent],
})
export class AppComponent {
  reports: WeatherReport[] = [];

  constructor(private weatherService: WeatherService) {}

  onQuerySubmit(query: WeatherQuery) {
    this.weatherService.queryWeather(query).subscribe(
      (response) => (this.reports = response.result),
      (error) => console.error('Error fetching weather data:', error),
    );
  }
}
