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

  description = `Add a custom domain at checkout. Pay double your plan — one payment covers both the plan and the domain add-on. Already own a name? You can connect that too.`;

  infoList: InfoItem[] = [
    { label: 'FROM', value: '₹799', subValue: '/ ONE -TIME' },
    { label: 'TEMPLATES', value: '7 ACROSS 33 VOICES' },
    { label: 'PAYMENTS', value: 'UPI. CARDS. WALLETS' },
    { label: 'INVITATIONS', value: '177 BUILT' },
  ];
}
