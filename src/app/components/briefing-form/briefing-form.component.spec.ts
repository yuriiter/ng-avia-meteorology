import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BriefingFormComponent } from './briefing-form.component';

describe('BriefingFormComponent', () => {
  let component: BriefingFormComponent;
  let fixture: ComponentFixture<BriefingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BriefingFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BriefingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
