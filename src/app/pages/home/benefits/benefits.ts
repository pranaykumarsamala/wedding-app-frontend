import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface BenefitRow {
  feature: string;
  values: string[];
}

@Component({
  selector: 'app-benefits',
  imports: [CommonModule],
  templateUrl: './benefits.html',
  styleUrl: './benefits.scss',
})
export class Benefits {
  benefits: BenefitRow[] = [
    {
      feature: 'Looks & feels like your brand',
      values: ['✓', '✓', '✓', '✕', 'Depends'],
    },
    {
      feature: 'Brand + strategy + design',
      values: ['✓', '✓', 'Sometimes', '✕', '✕'],
    },
    {
      feature: 'Time to publish',
      values: ['5 days', 'Weeks', 'Weeks', 'Depends on you', 'Depends on you'],
    },
    {
      feature: 'Commitment required',
      values: ['One-time', 'Retainer', 'Salary', 'None', 'None'],
    },
    {
      feature: 'Captions included',
      values: ['✓', 'Usually', 'Depends', '✕', '✕'],
    },
    {
      feature: 'Built around your goals',
      values: ['✓', 'Usually', 'Depends', '✕', 'Depends'],
    },
    {
      feature: 'Your involvement',
      values: ['Up to you!', 'Medium', 'Medium', 'Very high', 'Very high'],
    },
  ];

  learnMore(): void {
    // Replace with your actual learn-more page or dialog.
    // Example: window.location.href = '/learn-more';
  }
}
