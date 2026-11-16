import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RsvpSection } from './rsvp-section';

describe('RsvpSection', () => {
  let component: RsvpSection;
  let fixture: ComponentFixture<RsvpSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RsvpSection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RsvpSection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
