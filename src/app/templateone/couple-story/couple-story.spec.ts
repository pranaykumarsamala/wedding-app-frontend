import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoupleStory } from './couple-story';

describe('CoupleStory', () => {
  let component: CoupleStory;
  let fixture: ComponentFixture<CoupleStory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoupleStory]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoupleStory);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
