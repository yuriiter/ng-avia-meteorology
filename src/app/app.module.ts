import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BriefingFormComponent } from './components/briefing-form/briefing-form.component';
import { BriefingResultsComponent } from './components/briefing-results/briefing-results.component';

@NgModule({
  declarations: [AppComponent, BriefingFormComponent, BriefingResultsComponent],
  imports: [BrowserModule, HttpClientModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
