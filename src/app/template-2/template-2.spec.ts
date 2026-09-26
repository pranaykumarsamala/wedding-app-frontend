import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Template2 } from './template-2';

describe('Template2', () => {
  let component: Template2;
  let fixture: ComponentFixture<Template2>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Template2]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Template2);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
