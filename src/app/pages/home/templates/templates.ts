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
      title: 'SHARE YOUR IDEAS',
      description: 'Tell us about your brand, goals and the content you want to create.',
      buttonText: 'Get started',
      link: '#get-started',
      image: 'assets/home-page/shapes/1.png',
    },
    {
      number: '02',
      title: 'CREATE YOUR CONTENT',
      description: 'Our team turns your ideas into engaging content tailored to your brand.',
      buttonText: 'See how',
      link: '#content',
      image: 'assets/home-page/shapes/2.png',
    },
    {
      number: '03',
      title: 'REVIEW AND REFINE',
      description: 'Review the content and request revisions until everything feels right.',
      buttonText: 'Review it',
      link: '#review',
      image: 'assets/home-page/shapes/3.png',
    },
    {
      number: '04',
      title: 'POST WHEN READY',
      description:
        'Your final bundle lands in your inbox, ready to post whenever your content calendar needs it.',
      buttonText: 'Post it',
      link: '#publish',
      image: 'assets/home-page/shapes/4.png',
    },
    {
      number: '05',
      title: 'TRACK YOUR PROGRESS',
      description:
        'Monitor your content performance and discover what works best for your audience.',
      buttonText: 'Track now',
      link: '#progress',
      image: 'assets/home-page/shapes/5.png',
    },
    {
      number: '06',
      title: 'GROW YOUR BRAND',
      description:
        'Use your content insights to improve your strategy and grow your brand consistently.',
      buttonText: 'Grow now',
      link: '#growth',
      image: 'assets/home-page/shapes/6.png',
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
