import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherQuery } from './models/weather-query';
import { WeatherService } from './services/weather.service';
import { WeatherReport } from './models/weather-response';
import { BriefingFormComponent } from './components/briefing-form/briefing-form.component';
import { BriefingResultsComponent } from './components/briefing-results/briefing-results.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [CommonModule, BriefingFormComponent, BriefingResultsComponent],
})
export class AppComponent {
  reports: WeatherReport[] = [];

  constructor(private weatherService: WeatherService) {}

  onQuerySubmit(query: WeatherQuery) {
    this.weatherService.queryWeather(query).subscribe(
      (response) => {
        if (response.error) {
          alert(response.error);
          this.reports = [];
        }
        this.reports = response.result;
      },
      (error) => {
        alert(error);
      },
    );
  }
}
