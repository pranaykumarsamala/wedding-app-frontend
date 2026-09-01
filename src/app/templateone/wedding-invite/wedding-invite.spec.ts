import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeddingInvite } from './wedding-invite';

describe('WeddingInvite', () => {
  let component: WeddingInvite;
  let fixture: ComponentFixture<WeddingInvite>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeddingInvite]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeddingInvite);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
