import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
@Component({
  selector: 'app-couple-story',
  imports: [CommonModule],
  templateUrl: './couple-story.html',
  styleUrl: './couple-story.scss',
})
export class CoupleStory implements AfterViewInit {
  @ViewChild('coupleStory', { static: true })
  coupleStory!: ElementRef<HTMLElement>;

  @ViewChild('toySection', { static: true })
  toySection!: ElementRef<HTMLElement>;

  // 22 couple-story buttas
  buttas = Array.from({ length: 22 });

  // 8 toy-section buttas
  toyButtas = Array.from({ length: 8 });

  private ctx!: gsap.Context;

  ngAfterViewInit(): void {
    const section = this.coupleStory.nativeElement;
    const toySection = this.toySection.nativeElement;

    this.ctx = gsap.context(() => {
      /* =================================================
       FRAME CONTENT
       H2 + P : BOTTOM -> TOP
    ================================================= */

      const frameContents = gsap.utils.toArray<HTMLElement>('.frame-content');

      frameContents.forEach((content) => {
        const title = content.querySelector('h2');
        const description = content.querySelector('p');

        // Initial position
        gsap.set([title, description], {
          y: 120,
          opacity: 0,
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: content.closest('.carousel-item') || content,
            start: 'top 85%',
            end: 'top 45%',
            scrub: 1.5,
            invalidateOnRefresh: true,
          },
        });

        // H2 bottom -> top
        tl.to(title, {
          y: 0,
          opacity: 1,
          ease: 'power2.out',
        });

        // P bottom -> top
        tl.to(
          description,
          {
            y: 0,
            opacity: 1,
            ease: 'power2.out',
          },
          '-=0.2',
        );
      });

      /* =================================================
       COUPLE BUTTAS
    ================================================= */

      const buttas = gsap.utils.toArray<HTMLElement>('.butta');

      buttas.forEach((butta, index) => {
        gsap.fromTo(
          butta,
          {
            y: 600,
            opacity: 0,
            scale: 0.2,
            rotation: index % 2 === 0 ? -25 : 25,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            rotation: 0,
            ease: 'power2.out',

            scrollTrigger: {
              trigger: section,
              start: 'top 90%',
              end: 'top 10%',
              scrub: 2,
              invalidateOnRefresh: true,
            },
          },
        );
      });

      /* =================================================
       COUPLE TEXT
    ================================================= */

      const textItems = section.querySelectorAll(
        '.couples-desc p, ' +
          '.couples-desc h6, ' +
          '.couples-desc h2, ' +
          '.couples-desc .divider',
      );

      gsap.fromTo(
        textItems,
        {
          y: 200,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          stagger: 0.7,
          ease: 'power2.out',

          scrollTrigger: {
            trigger: section,
            start: 'top 90%',
            end: 'top 10%',
            scrub: 2,
            invalidateOnRefresh: true,
          },
        },
      );

      /* =================================================
       TOY BUTTAS
       BOTTOM -> TOP
    ================================================= */

      const toyButtas = gsap.utils.toArray<HTMLElement>('.toy-butta');

      toyButtas.forEach((butta, index) => {
        gsap.fromTo(
          butta,
          {
            y: () => window.innerHeight * 0.8,
            opacity: 0,
            scale: 0.2,
            rotation: index % 2 === 0 ? -35 : 35,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            rotation: 0,
            ease: 'power3.out',

            scrollTrigger: {
              trigger: toySection,
              start: 'top 90%',
              end: 'top 25%',
              scrub: 2,
              invalidateOnRefresh: true,
            },
          },
        );
      });
    });

    window.addEventListener('load', this.refreshScrollTrigger);

    ScrollTrigger.refresh();
  }

  private refreshScrollTrigger = (): void => {
    ScrollTrigger.refresh();
  };

  ngOnDestroy(): void {
    window.removeEventListener('load', this.refreshScrollTrigger);

    /*
      Only this component's animations
      destroy avuthayi.
    */
    this.ctx?.revert();
  }
}
