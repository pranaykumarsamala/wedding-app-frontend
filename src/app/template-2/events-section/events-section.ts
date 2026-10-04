import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

@Component({
  selector: 'app-events-section',
  imports: [],
  templateUrl: './events-section.html',
  styleUrl: './events-section.scss',
})
export class EventsSection implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('eventsSection', { static: true }) eventsSection!: ElementRef<HTMLElement>;

  private ctx?: gsap.Context;
  private eventSplits: SplitText[] = [];

  ngOnInit(): void {
    gsap.registerPlugin(ScrollTrigger, SplitText);
  }

  ngAfterViewInit(): void {
    this.ctx = gsap.context(() => {
      this.createEventsAnimation();
    }, this.eventsSection.nativeElement);
  }

  ngOnDestroy(): void {
    this.ctx?.revert();
    this.eventSplits.forEach((split) => split.revert());
  }

  private createEventsAnimation(): void {
    const section = this.eventsSection.nativeElement;
    const cards = Array.from(section.querySelectorAll<HTMLElement>('.event'));
    if (cards.length === 0) {
      return;
    }

    const refreshAfterLayout = (): void => {
      requestAnimationFrame(() => ScrollTrigger.refresh());
    };

    section.querySelectorAll('img').forEach((image) => {
      if (!image.complete) {
        image.addEventListener('load', refreshAfterLayout, { once: true });
        image.addEventListener('error', refreshAfterLayout, { once: true });
      }
    });

    cards.forEach((card) => {
      const title = card.querySelector<HTMLElement>('.title');
      const date = card.querySelector<HTMLElement>('.content p');
      const titleSplit = title ? SplitText.create(title, { type: 'chars' }) : undefined;
      const dateSplit = date ? SplitText.create(date, { type: 'words' }) : undefined;

      if (titleSplit) {
        this.eventSplits.push(titleSplit);
      }

      if (dateSplit) {
        this.eventSplits.push(dateSplit);
      }

      gsap.set(card, { autoAlpha: 0, y: 38, scale: 0.98 });
      gsap.set(titleSplit?.chars ?? [], {
        autoAlpha: 0,
        y: 36,
        rotationX: -45,
        transformPerspective: 800,
      });
      gsap.set(dateSplit?.words ?? [], { autoAlpha: 0, y: 22 });

      const intro = gsap.timeline({
        defaults: { ease: 'power3.out' },
        scrollTrigger: {
          trigger: card,
          start: 'top 84%',
          once: true,
          invalidateOnRefresh: true,
        },
      });

      intro.to(card, { autoAlpha: 1, y: 0, scale: 1, duration: 0.65 });

      if (titleSplit) {
        intro.to(
          titleSplit.chars,
          { autoAlpha: 1, y: 0, rotationX: 0, duration: 0.65, stagger: 0.045 },
          '-=0.25',
        );
      }

      if (dateSplit) {
        intro.to(
          dateSplit.words,
          { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.05 },
          '-=0.25',
        );
      }
    });

    const background = section.querySelector<HTMLElement>('.invitation-background');
    const eventCardBackgrounds = section.querySelectorAll<HTMLElement>('.event-background');
    const landscape = section.querySelector<HTMLElement>('.event-bg-2-img');
    const elephant = section.querySelector<HTMLElement>('.elephant');

    const parallax = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.2,
        invalidateOnRefresh: true,
      },
    });

    if (background) {
      parallax.to(background, { yPercent: 4, scale: 1.1, ease: 'none' }, 0);
    }

    if (eventCardBackgrounds.length) {
      parallax.to(eventCardBackgrounds, { yPercent: -4, scale: 1.08, ease: 'none' }, 0);
    }

    if (landscape) {
      parallax.to(landscape, { yPercent: 3, scale: 1.08, ease: 'none' }, 0);
    }

    if (elephant) {
      parallax.to(elephant, { x: () => -window.innerWidth * 0.2, ease: 'none' }, 0);
    }

    refreshAfterLayout();
  }
}
