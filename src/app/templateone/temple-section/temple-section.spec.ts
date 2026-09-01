import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TempleSection } from './temple-section';

describe('TempleSection', () => {
  let component: TempleSection;
  let fixture: ComponentFixture<TempleSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TempleSection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TempleSection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
