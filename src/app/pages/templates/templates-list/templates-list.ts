import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

interface Template {
  id: number;
  name: string;
  brand: string;
  category: string;
  vibe: string;
  description: string;
  image: string;
  family: 'wedding' | 'events';
  topPick?: boolean;
  price?: string;
}

@Component({
  selector: 'app-templates-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './templates-list.html',
  styleUrl: './templates-list.scss',
})
export class TemplatesList implements OnInit {
  isOtherEvents = false;
  searchText = '';

  weddingTemplates: Template[] = [
    {
      id: 1,
      name: 'TEMPLE BLESSING',
      brand: 'VARUMO',
      category: 'Regional',
      vibe: 'Colour dominated',
      description: 'Temple vibe, south Indian traditional love story.',
      image: 'assets/home-page/wedding-template-1.webp',
      family: 'wedding',
      topPick: true,
      price: '₹999/-',
    },

    {
      id: 2,
      name: 'VARUMO PRESS FOIL',
      brand: 'VARUMO',
      category: 'Varumo',
      vibe: 'Onyx + Gold',
      description:
        'Gilt corners, Fraunces italic display, burgundy section breaks. Black-tie heritage.',
      image: 'assets/home-page/wedding-template-1.webp',
      family: 'wedding',
      topPick: true,
      price: '₹999/-',
    },

    {
      id: 3,
      name: 'VIBRANT LOVE',
      brand: 'VIBRANT',
      category: 'Vibrant',
      vibe: 'Colourful',
      description: 'A vibrant wedding invitation design for a memorable celebration.',
      image: 'assets/home-page/wedding-template-2.webp',
      family: 'wedding',
      price: '₹999/-',
    },
  ];

  eventTemplates: Template[] = [
    {
      id: 7,
      name: 'BIRTHDAY CELEBRATION',
      brand: 'VIBRANT',
      category: 'Birthday',
      vibe: 'Playful',
      description: 'Celebrate your special day with a colourful birthday invitation.',
      image: 'assets/templates/birthday.jpg',
      family: 'events',
      price: '₹999/-',
    },
    {
      id: 8,
      name: 'HOUSEWARMING',
      brand: 'VIBRANT',
      category: 'Housewarming',
      vibe: 'Traditional',
      description: 'Invite your loved ones to celebrate your new home.',
      image: 'assets/templates/housewarming.jpg',
      family: 'events',
      price: '₹999/-',
    },
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      this.isOtherEvents = params.get('family') === 'events';
      this.searchText = '';
    });
  }

  // Dynamic counts
  get weddingCount(): number {
    return this.weddingTemplates.length;
  }

  get eventsCount(): number {
    return this.eventTemplates.length;
  }

  // Current templates
  get templates(): Template[] {
    return this.isOtherEvents ? this.eventTemplates : this.weddingTemplates;
  }

  // Search templates
  get filteredTemplates(): Template[] {
    const search = this.searchText.toLowerCase().trim();

    return this.templates.filter(
      (template) =>
        template.name.toLowerCase().includes(search) ||
        template.brand.toLowerCase().includes(search) ||
        template.vibe.toLowerCase().includes(search) ||
        template.category.toLowerCase().includes(search) ||
        template.description.toLowerCase().includes(search),
    );
  }

  // Switch between Wedding and Other Events
  changeFamily(events: boolean): void {
    this.router.navigate(['/templates'], {
      queryParams: {
        family: events ? 'events' : null,
      },
    });
  }
}
