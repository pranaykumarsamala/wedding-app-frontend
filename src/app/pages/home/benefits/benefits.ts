import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface BenefitRow {
  feature: string;
  icon: string;
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
      feature: 'Cost',
      icon: 'fa-solid fa-indian-rupee-sign',
      values: ['High', 'Moderate', 'Low'],
    },
    {
      feature: 'Customization',
      icon: 'fa-solid fa-pen',
      values: ['Limited', 'Hard', 'Easy'],
    },
    {
      feature: 'Interactivity',
      icon: 'fa-solid fa-fingerprint',
      values: ['Static', 'View-only', 'Highly Interactive'],
    },
    {
      feature: 'Updating',
      icon: 'fa-solid fa-rotate',
      values: ['Impossible', 'Difficult', 'Instant'],
    },
    {
      feature: 'Eco Friendly',
      icon: 'fa-solid fa-leaf',
      values: ['No', 'Yes', 'Yes'],
    },
    {
      feature: 'Sharing',
      icon: 'fa-solid fa-share-nodes',
      values: [
        'Limited to Physical Delivery',
        'Forwardable',
        'Shareable via Link, WhatsApp & More',
      ],
    },
    {
      feature: 'Delivery Time',
      icon: 'fa-regular fa-clock',
      values: ['Several Days', 'Same Day', 'Instant'],
    },
  ];

  learnMore(): void {
    // Replace with your actual learn-more page or dialog.
    // Example: window.location.href = '/learn-more';
  }
}
