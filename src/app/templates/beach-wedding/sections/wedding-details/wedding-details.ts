import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-wedding-details',
  imports: [CommonModule],
  templateUrl: './wedding-details.html',
  styleUrl: './wedding-details.scss',
})
export class WeddingDetails implements OnInit, OnDestroy {
  images = [
    'assets/beach-images/gallery/beach-image.webp',
    'assets/beach-images/gallery/DSC.webp',
    'assets/beach-images/gallery/couple-walking.jpg',
  ];

  currentIndex = 0;

  autoSlide: ReturnType<typeof setInterval> | undefined;

  ngOnInit() {
    this.startAutoSlide();
  }

  startAutoSlide() {
    this.autoSlide = setInterval(() => {
      this.nextSlide();
    }, 3000);
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  prevSlide() {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
  }

  ngOnDestroy() {
    if (this.autoSlide) {
      clearInterval(this.autoSlide);
    }
  }
}
