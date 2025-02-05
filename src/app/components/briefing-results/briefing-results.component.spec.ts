import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BriefingResultsComponent } from './briefing-results.component';

describe('BriefingResultsComponent', () => {
  let component: BriefingResultsComponent;
  let fixture: ComponentFixture<BriefingResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BriefingResultsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BriefingResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
