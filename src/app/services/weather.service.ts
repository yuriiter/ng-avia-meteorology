import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { WeatherQuery } from '../models/weather-query';
import { WeatherResponse } from '../models/weather-response';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private apiUrl = 'https://ogcie.iblsoft.com/ria/opmetquery';

  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer,
  ) {}

  queryWeather(query: WeatherQuery): Observable<WeatherResponse> {
    return this.http.post<WeatherResponse>(this.apiUrl, query);
  }

  formatWeatherText(text: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(
      text.replace(/(BKN|FEW|SCT)(\d{3})/g, (match, prefix, number) => {
        const color = parseInt(number) <= 30 ? 'blue' : 'red';
        return `<span style="color: ${color}">${prefix}${number}</span>`;
      }),
    );
  }
}
