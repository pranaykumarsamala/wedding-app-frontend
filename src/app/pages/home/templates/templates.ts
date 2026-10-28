import {
  Component,
  HostListener,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';

interface TemplateSlide {
  id: number;
  image: string;
  alt: string;
}

interface WorkStep {
  number: string;
  title: string;
  description: string;
  buttonText: string;
  link: string;
  image: string;
}

@Component({
  selector: 'app-templates',
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './templates.html',
  styleUrl: './templates.scss',
})
export class Templates implements AfterViewInit, OnDestroy {
  activeIndex = 0;

  @ViewChild('templateSwiper')
  swiperElement!: ElementRef;

  templates: TemplateSlide[] = [
    {
      id: 1,
      image: 'assets/home-page/wedding-template-1.webp',
      alt: 'Traditional Indian wedding invitation template',
    },
    {
      id: 2,
      image: 'assets/home-page/wedding-template-2.webp',
      alt: 'Elegant wedding invitation design',
    },
    {
      id: 3,
      image: 'assets/home-page/wedding-template-2.webp',
      alt: 'Decorative Indian wedding template',
    },
    {
      id: 4,
      image: 'assets/home-page/wedding-template-1.webp',
      alt: 'Luxury wedding invitation design',
    },
  ];

  steps: WorkStep[] = [
    {
      number: '01',
      title: 'Choose a Wedding Template',
      description:
        'Browse our collection of wedding invitation templates and preview the designs that catch your eye. Consider the style, layout and available features before selecting a template that suits your celebration.',
      buttonText: 'Get started',
      link: '#get-started',
      image: 'assets/home-page/shapes/1.png',
    },
    {
      number: '02',
      title: 'Add Your Wedding Details',
      description:
        'Enter the requested information, such as your names, wedding date, venue, personal message and selected photos. Depending on the available features, you may also be able to add a schedule, location link or RSVP details.',
      buttonText: 'See how',
      link: '#content',
      image: 'assets/home-page/shapes/2.png',
    },
    {
      number: '03',
      title: 'Review Your Invitation',
      description:
        'Preview your invitation and check that your names, dates, venue and other details are correct. Use the editing options available for your selected template to make any permitted adjustments before proceeding.',
      buttonText: 'Review it',
      link: '#review',
      image: 'assets/home-page/shapes/3.png',
    },
    {
      number: '04',
      title: 'Complete Your Order',
      description:
        'Review the plan, price and included features before completing payment. Check any optional extras and follow the instructions displayed during checkout.',
      buttonText: 'Post it',
      link: '#publish',
      image: 'assets/home-page/shapes/4.png',
    },
    {
      number: '05',
      title: 'Publish and Share',
      description:
        'Follow the publishing instructions and access your invitation website link when it is ready. Share it with your guests through your preferred messaging or social platforms.',
      buttonText: 'Track now',
      link: '#progress',
      image: 'assets/home-page/shapes/5.png',
    },
  ];

  private observer?: IntersectionObserver;

  constructor(private host: ElementRef<HTMLElement>) {}

  ngAfterViewInit(): void {
    const cards = this.host.nativeElement.querySelectorAll<HTMLElement>('.step-row');

    if (typeof IntersectionObserver === 'undefined') {
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => Math.abs(a.boundingClientRect.top) - Math.abs(b.boundingClientRect.top));

        if (visible.length) {
          const index = Array.from(cards).indexOf(visible[0].target as HTMLElement);

          if (index !== -1) {
            this.activeIndex = index;
          }
        }
      },
      {
        rootMargin: '-35% 0px -35% 0px',
        threshold: 0,
      },
    );

    cards.forEach((card) => this.observer?.observe(card));
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    // IntersectionObserver handles active-card updates.
    // Keep this method only if other scroll behavior is needed.
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
