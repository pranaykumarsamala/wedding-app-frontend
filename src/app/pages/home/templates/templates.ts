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
      title: 'Purchase Your Template',
      description: 'Complete your purchase to receive instant access to your template. ',
      buttonText: 'Get started',
      link: '#get-started',
      image: 'assets/home-page/shapes/1.png',
    },
    {
      number: '02',
      title: 'Access Your Template',
      description: 'Check your email and click the template access link. ',
      buttonText: 'See how',
      link: '#content',
      image: 'assets/home-page/shapes/2.png',
    },
    {
      number: '03',
      title: 'Edit Your Template',
      description: 'Open your template and update it with your details. ',
      buttonText: 'Review it',
      link: '#review',
      image: 'assets/home-page/shapes/3.png',
    },
    {
      number: '04',
      title: 'Publish Your Final Link',
      description:
        'Preview your final design and publish your link using a free or custom domain. ',
      buttonText: 'Post it',
      link: '#publish',
      image: 'assets/home-page/shapes/4.png',
    },
    {
      number: '05',
      title: '5. Share With Your Guests',
      description:
        'Your final link is ready! Share it with your guests so they can view all the details. ',
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
