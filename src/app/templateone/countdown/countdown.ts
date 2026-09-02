import { Component, OnInit, OnDestroy } from '@angular/core';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-countdown',
  imports: [DecimalPipe],
  templateUrl: './countdown.html',
  styleUrl: './countdown.scss',
})
export class Countdown implements OnInit, OnDestroy {
  days = 0;
  hours = 0;
  minutes = 0;
  seconds = 0;

  private timerInterval: ReturnType<typeof setInterval> | undefined;

  // CHANGE THIS TO YOUR WEDDING DATE & TIME
  private weddingDate = new Date('2026-12-20T18:00:00').getTime();

  ngOnInit(): void {
    this.updateCountdown();

    this.timerInterval = setInterval(() => {
      this.updateCountdown();
    }, 1000);
  }

  updateCountdown(): void {
    const now = Date.now();
    const difference = this.weddingDate - now;

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
  }
}
