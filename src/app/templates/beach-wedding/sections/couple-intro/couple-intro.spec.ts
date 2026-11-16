import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoupleIntro } from './couple-intro';

describe('CoupleIntro', () => {
  let component: CoupleIntro;
  let fixture: ComponentFixture<CoupleIntro>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoupleIntro]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoupleIntro);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
