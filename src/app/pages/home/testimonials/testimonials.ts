import { Component, AfterViewInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';

import { CommonModule } from '@angular/common';
import Swiper from 'swiper';
import { Autoplay, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

@Component({
  selector: 'app-testimonials',
  imports: [CommonModule],
  templateUrl: './testimonials.html',
  styleUrls: ['./testimonials.scss'],
})
export class Testimonials implements AfterViewInit, OnDestroy {
  @ViewChild('testimonialSlider')
  slider!: ElementRef<HTMLElement>;

  swiper?: Swiper;

  reviews = [
    {
      name: 'Sofia',
      date: 'March 2026',
      message:
        'It makes it easy to create beautiful, personalised invitation websites for every special occasion. Choose from thoughtfully designed templates, add your story, photos, event details and countdown, and share everything with one simple link.',
    },
    {
      name: 'Priya',
      date: 'April 2026',
      message:
        'A beautiful and simple way to create invitations for birthdays, weddings and other special occasions. The templates look elegant and are easy to customise.',
    },
    {
      name: 'Emma',
      date: 'May 2026',
      message:
        'I loved how easy it was to create a personalised event website and share all the important details with family and friends.',
    },
    {
      name: 'Olivia',
      date: 'June 2026',
      message:
        'The design is elegant, the process is simple, and sharing the invitation with everyone takes just a moment.',
    },
  ];

  ngAfterViewInit(): void {
    this.swiper = new Swiper(this.slider.nativeElement, {
      modules: [Autoplay, Pagination],
      loop: true,
      speed: 700,
      slidesPerView: 3,
      spaceBetween: 28,
      watchOverflow: true,

      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },

      pagination: {
        el: this.slider.nativeElement.querySelector('.swiper-pagination') as HTMLElement,
        clickable: true,
      },

      breakpoints: {
        0: {
          slidesPerView: 1,
          spaceBetween: 16,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 22,
        },
        1100: {
          slidesPerView: 3,
          spaceBetween: 28,
        },
      },
    });
  }

  ngOnDestroy(): void {
    this.swiper?.destroy(true, true);
  }
}
