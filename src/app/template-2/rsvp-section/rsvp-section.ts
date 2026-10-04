import { DecimalPipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-rsvp-section',
  imports: [DecimalPipe],
  templateUrl: './rsvp-section.html',
  styleUrl: './rsvp-section.scss',
})
export class RsvpSection implements OnInit, OnDestroy {
  days = 0;
  hours = 0;
  minutes = 0;
  seconds = 0;
  private timerInterval!: ReturnType<typeof setInterval>;
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
    this.updateCountdown();

    this.timerInterval = setInterval(() => {
      this.updateCountdown();

      this.cdr.detectChanges();
    }, 1000);
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

    // this.ctx?.revert();
  }
}
