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
    const titleChars: Element[] = [];
    const dateWords: Element[] = [];

    cards.forEach((card) => {
      const title = card.querySelector<HTMLElement>('.title');
      const date = card.querySelector<HTMLElement>('.content p');

      if (title) {
        const split = SplitText.create(title, { type: 'chars' });
        this.eventSplits.push(split);
        titleChars.push(...split.chars);
      }

      if (date) {
        const split = SplitText.create(date, { type: 'words' });
        this.eventSplits.push(split);
        dateWords.push(...split.words);
      }
    });

    if (cards.length === 0 || (titleChars.length === 0 && dateWords.length === 0)) {
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

    gsap.set(cards, { autoAlpha: 0, y: 36 });
    gsap.set(titleChars, {
      autoAlpha: 0,
      y: 40,
      rotationX: -45,
      transformPerspective: 800,
    });
    gsap.set(dateWords, { autoAlpha: 0, y: 25 });

    const intro = gsap.timeline({ paused: true, defaults: { ease: 'power3.out' } });

    intro
      .to(cards, { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.1 })
      .to(
        titleChars,
        { autoAlpha: 1, y: 0, rotationX: 0, duration: 0.7, stagger: 0.045 },
        '-=0.35',
      )
      .to(
        dateWords,
        { autoAlpha: 1, y: 0, duration: 0.55, stagger: 0.04 },
        '-=0.25',
      );

    ScrollTrigger.create({
      trigger: section,
      start: 'top 78%',
      onEnter: () => intro.restart(),
      onEnterBack: () => intro.restart(),
      invalidateOnRefresh: true,
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
