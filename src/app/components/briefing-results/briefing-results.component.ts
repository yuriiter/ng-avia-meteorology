import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherReport } from '../../models/weather-response';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-briefing-results',
  templateUrl: './briefing-results.component.html',
  styleUrls: ['./briefing-results.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class BriefingResultsComponent {
  @Input() reports: WeatherReport[] = [];

  constructor(private weatherService: WeatherService) {}

  getGroupedReports(): { [key: string]: WeatherReport[] } {
    return this.reports.reduce(
      (groups, report) => {
        const key = report.stationId;
        if (!groups[key]) {
          groups[key] = [];
        }
        groups[key].push(report);
        return groups;
      },
      {} as { [key: string]: WeatherReport[] },
    );
  }

  formatDateTime(isoDate: string): string {
    return new Date(isoDate).toLocaleString('sk-SK', {
      timeZone: 'Europe/Bratislava',
    });
  }

  formatReportText(text: string): string {
    return this.weatherService.formatWeatherText(text);
  }
}
