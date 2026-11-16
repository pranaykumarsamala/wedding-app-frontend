import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeachWedding } from './beach-wedding';

describe('BeachWedding', () => {
  let component: BeachWedding;
  let fixture: ComponentFixture<BeachWedding>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BeachWedding]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BeachWedding);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
