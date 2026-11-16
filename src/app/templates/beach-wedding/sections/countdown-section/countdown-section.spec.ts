import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountdownSection } from './countdown-section';

describe('CountdownSection', () => {
  let component: CountdownSection;
  let fixture: ComponentFixture<CountdownSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountdownSection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CountdownSection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
