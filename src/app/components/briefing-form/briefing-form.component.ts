import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { WeatherQuery } from '../../models/weather-query';

@Component({
  selector: 'app-briefing-form',
  templateUrl: './briefing-form.component.html',
  styleUrls: ['./briefing-form.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class BriefingFormComponent {
  @Output() submitQuery = new EventEmitter<WeatherQuery>();
  briefingForm: FormGroup;
  reportTypes = ['METAR', 'TAF_LONGTAF', 'SIGMET'];

  constructor(private fb: FormBuilder) {
    this.briefingForm = this.fb.group(
      {
        messageTypes: this.fb.group({
          METAR: [false],
          TAF_LONGTAF: [false],
          SIGMET: [false],
        }),
        airports: [''],
        countries: [''],
      },
      { validator: this.atLeastOneReportType },
    );
  }

  private atLeastOneReportType(
    group: FormGroup,
  ): { [key: string]: any } | null {
    const types = group.get('messageTypes') as FormGroup;
    return Object.values(types.value).some((value) => value)
      ? null
      : { noReportType: true };
  }

  onSubmit() {
    if (this.briefingForm.valid) {
      const formValue = this.briefingForm.value;
      const selectedTypes = Object.entries(formValue.messageTypes)
        .filter(([_, selected]) => selected)
        .map(([type]) => type);

      const airports = formValue.airports.trim().split(/\s+/).filter(Boolean);
      const countries = formValue.countries.trim().split(/\s+/).filter(Boolean);

      const allAirportsValid = !airports.some(
        (airportCode: string) =>
          airportCode.length !== 4 || /[a-z]/.test(airportCode),
      );
      const allCountriesValid = !countries.some(
        (countryCode: string) =>
          countryCode.length !== 2 || /[a-z]/.test(countryCode),
      );

      const haveEitherAirportsOrCountries = !(
        airports.length === 0 && countries.length === 0
      );

      if (
        !(
          haveEitherAirportsOrCountries &&
          allCountriesValid &&
          allAirportsValid
        )
      ) {
        let message = 'Bad input: ';
        if (!haveEitherAirportsOrCountries)
          message += 'You must input at least one airport or country';

        if (!allAirportsValid)
          message +=
            'Airport code format must be 4 uppercase letters and numbers; ';
        if (!allCountriesValid)
          message += 'Country code format must be 2 uppercase letters';

        alert(message);
        return;
      }

      const query: WeatherQuery = {
        id: `query${Date.now()}`,
        method: 'query',
        params: [
          {
            id: `briefing${Date.now()}`,
            reportTypes: selectedTypes,
            ...(airports.length && { stations: airports }),
            ...(countries.length && { countries: countries }),
          },
        ],
      };

      this.submitQuery.emit(query);
    }
  }
}
