import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface InfoItem {
  label: string;
  value: string;
  subValue?: string;
}
@Component({
  selector: 'app-invitation-cta',
  imports: [CommonModule],
  templateUrl: './invitation-cta.html',
  styleUrl: './invitation-cta.scss',
})
export class InvitationCta {
  title = 'SEND YOUR\nINVITATION.';

  description = `Turn your big day into a invitation your guests will remember. Personalised, shareable and ready in minutes, with a custom domain to make it truly yours.`;

  infoList: InfoItem[] = [
    { label: 'MEMORIES', value: 'PHOTO GALLERY. VIDEO' },
    { label: 'MUSIC', value: 'YOUR SONG. PLAYS ON OPEN' },
    { label: 'COUNTDOWN', value: 'LIVE TILL THE BIG DAY' },
    { label: 'DELIVERY', value: 'READY IN MINUTES' },
    { label: 'GUESTS', value: 'UNLIMITED INVITES' },
  ];
}
