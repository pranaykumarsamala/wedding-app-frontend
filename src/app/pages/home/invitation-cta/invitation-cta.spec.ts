import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitationCta } from './invitation-cta';

describe('InvitationCta', () => {
  let component: InvitationCta;
  let fixture: ComponentFixture<InvitationCta>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvitationCta]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvitationCta);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
