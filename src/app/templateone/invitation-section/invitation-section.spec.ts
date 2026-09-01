import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitationSection } from './invitation-section';

describe('InvitationSection', () => {
  let component: InvitationSection;
  let fixture: ComponentFixture<InvitationSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvitationSection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvitationSection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
