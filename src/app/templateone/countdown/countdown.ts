import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { DecimalPipe } from '@angular/common';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-countdown',
  imports: [DecimalPipe],
  templateUrl: './countdown.html',
  styleUrl: './countdown.scss',
})
export class Countdown implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('countdownSection', { static: true })
  countdownSection!: ElementRef<HTMLElement>;

  days = 0;
  hours = 0;
  minutes = 0;
  seconds = 0;

  private timerInterval!: ReturnType<typeof setInterval>;

  private ctx!: gsap.Context;

  private weddingDate = new Date(
    2026,
    11, // December
    20,
    18, // 6 PM
    0,
    0,
  ).getTime();

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.updateCountdown();

    this.timerInterval = setInterval(() => {
      this.updateCountdown();

      this.cdr.detectChanges();
    }, 1000);
  }

  ngAfterViewInit(): void {
    const section = this.countdownSection.nativeElement;

    this.ctx = gsap.context(() => {
      /* ==========================================
         COUNTDOWN CONTENT
         BOTTOM -> TOP
      ========================================== */

      gsap.fromTo(
        '.countdown-content',

        {
          y: 250,
          opacity: 0,
        },

        {
          y: 0,
          opacity: 1,
          ease: 'power2.out',

          scrollTrigger: {
            trigger: section,

            start: 'top 90%',
            end: 'top 40%',

            scrub: 1.5,

            invalidateOnRefresh: true,
          },
        },
      );
    }, section);

    ScrollTrigger.refresh();
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
  }

  ngOnDestroy(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }

    this.ctx?.revert();
  }
}
