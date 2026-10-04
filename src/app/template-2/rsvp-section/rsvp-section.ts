import { DecimalPipe } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
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
  selector: 'app-rsvp-section',
  imports: [DecimalPipe],
  templateUrl: './rsvp-section.html',
  styleUrl: './rsvp-section.scss',
})
export class RsvpSection implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('rsvpSection', { static: true }) rsvpSection!: ElementRef<HTMLElement>;

  days = 0;
  hours = 0;
  minutes = 0;
  seconds = 0;
  private timerInterval!: ReturnType<typeof setInterval>;
  private ctx?: gsap.Context;
  private rsvpSplits: SplitText[] = [];
  private weddingDate = new Date(
    2026,
    11, // December
    20,
    18, // 6 PM
    0,
    0,
  ).getTime();

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    gsap.registerPlugin(ScrollTrigger, SplitText);
    this.updateCountdown();

    this.timerInterval = setInterval(() => {
      this.updateCountdown();

      this.cdr.detectChanges();
    }, 1000);
  }

  ngAfterViewInit(): void {
    this.ctx = gsap.context(() => {
      this.createRsvpAnimation();
    }, this.rsvpSection.nativeElement);
  }

  private createRsvpAnimation(): void {
    const section = this.rsvpSection.nativeElement;
    const title = section.querySelector<HTMLElement>('.social-media h1');
    const subtitle = section.querySelector<HTMLElement>('.social-media h2');
    const flowers = Array.from(section.querySelectorAll<HTMLElement>('.flower1, .flower2, .flower3'));
    const peacock = section.querySelector<HTMLElement>('.peacock-background');
    const titleSplit = title ? SplitText.create(title, { type: 'chars' }) : undefined;
    const subtitleSplit = subtitle ? SplitText.create(subtitle, { type: 'words' }) : undefined;

    if (titleSplit) {
      this.rsvpSplits.push(titleSplit);
    }

    if (subtitleSplit) {
      this.rsvpSplits.push(subtitleSplit);
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

    const titleChars = titleSplit?.chars ?? [];
    const subtitleWords = subtitleSplit?.words ?? [];

    gsap.set(titleChars, {
      autoAlpha: 0,
      y: 50,
      rotationX: -45,
      transformPerspective: 800,
    });
    gsap.set(subtitleWords, { autoAlpha: 0, y: 25 });
    gsap.set(flowers, { autoAlpha: 0, y: 28, scale: 0.8 });

    if (peacock) {
      gsap.set(peacock, { autoAlpha: 0, y: 45 });
    }

    const flowerFloat = gsap.to(flowers, {
      rotation: 4,
      transformOrigin: 'center center',
      duration: 2.4,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
      stagger: 0.25,
      paused: true,
    });

    const intro = gsap.timeline({ paused: true, defaults: { ease: 'power3.out' } });

    if (peacock) {
      intro.to(peacock, { autoAlpha: 1, y: 0, duration: 0.9 });
    }

    intro
      .to(flowers, { autoAlpha: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.12 }, '-=0.35')
      .to(
        titleChars,
        { autoAlpha: 1, y: 0, rotationX: 0, duration: 0.75, stagger: 0.055 },
        '-=0.25',
      )
      .to(
        subtitleWords,
        { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.08 },
        '-=0.3',
      );

    intro.eventCallback('onComplete', () => flowerFloat.play());

    ScrollTrigger.create({
      trigger: section,
      start: 'top 78%',
      onEnter: () => intro.restart(),
      onEnterBack: () => intro.restart(),
      onLeave: () => flowerFloat.pause(),
      onLeaveBack: () => flowerFloat.pause(0),
      invalidateOnRefresh: true,
    });

    const backgrounds = section.querySelectorAll<HTMLElement>(
      '.water-background, .rsvp-bg, .gallery-background',
    );
    const sceneElements = section.querySelectorAll<HTMLElement>(
      '.mudi-background, .peacock-background',
    );

    const parallax = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.2,
        invalidateOnRefresh: true,
      },
    });

    parallax.to(backgrounds, { yPercent: 3, ease: 'none' }, 0);
    parallax.to(sceneElements, { yPercent: -12, ease: 'none' }, 0);
    parallax.to(flowers, { yPercent: (index) => (index % 2 === 0 ? -12 : 10), ease: 'none' }, 0);

    refreshAfterLayout();
  }

  updateCountdown(): void {
    const difference = this.weddingDate - Date.now();

    if (difference <= 0) {
      this.days = 0;
      this.hours = 0;
      this.minutes = 0;
      this.seconds = 0;

      return;
    }

    const totalSeconds = Math.floor(difference / 1000);

    this.days = Math.floor(totalSeconds / 86400);

    this.hours = Math.floor((totalSeconds % 86400) / 3600);

    this.minutes = Math.floor((totalSeconds % 3600) / 60);

    this.seconds = totalSeconds % 60;
    // console.log(this.seconds);
  }

  ngOnDestroy(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }

    this.ctx?.revert();
    this.rsvpSplits.forEach((split) => split.revert());
  }
}
