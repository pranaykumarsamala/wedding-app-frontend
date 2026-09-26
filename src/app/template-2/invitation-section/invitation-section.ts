import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
@Component({
  selector: 'app-invitation-section',
  imports: [],
  templateUrl: './invitation-section.html',
  styleUrl: './invitation-section.scss',
})
export class InvitationSection implements OnInit, OnDestroy {
  @ViewChild('invitationSection', { static: true }) invitationSection!: ElementRef<HTMLElement>;

  private ctx?: gsap.Context;

  ngOnInit(): void {
    gsap.registerPlugin(ScrollTrigger);
  }

  ngOnDestroy(): void {

    this.ctx?.revert();

  }

  ngAfterViewInit() {
    this.ctx = gsap.context(() => {
      this.createInvitationAnimation();
    }, this.invitationSection.nativeElement);
  }

  createInvitationAnimation() {
    const section = this.invitationSection.nativeElement;

    const getElement = (selector: string): HTMLElement => {
      const element = section.querySelector<HTMLElement>(selector);
      if (!element) {
        throw new Error(`Required invitation element not found: ${selector}`);
      }
      return element;
    };

    const background = getElement('.invitation-background');
    const peacock = getElement('.peacock');
    const card = getElement('.invitation-card');
    const title = getElement('.invitation-title');
    const family = getElement('.family-name');
    const message = getElement('.invitation-message');
    const saveDate = getElement('.save-date');
    const date = getElement('.wedding-date');
    const venue = getElement('.venue');

    const mm = gsap.matchMedia();
    /* =====================================================
          DESKTOP
       ===================================================== */

    mm.add('(min-width: 601px)', () => {

      this.createDesktopInvitationAnimation(
        section,
        background,
        peacock,
        title,
        family,
        message,
        saveDate,
        date,
        venue
      );

    });


    /* =====================================================
       MOBILE
    ===================================================== */

    mm.add('(max-width: 600px)', () => {

      this.createMobileInvitationAnimation(
        section,
        background,
        peacock,
        title,
        family,
        message,
        saveDate,
        date,
        venue
      );

    });
  }

  private createDesktopInvitationAnimation(
    section: HTMLElement,
    background: HTMLElement,
    peacock: HTMLElement,
    title: HTMLElement,
    family: HTMLElement,
    message: HTMLElement,
    saveDate: HTMLElement,
    date: HTMLElement,
    venue: HTMLElement
  ): void {


    /* =====================================================
       INITIAL STATES
    ===================================================== */

    gsap.set(peacock, {
      opacity: 0,
      y: -80,
      x: 30,
      scale: 0.96,
      transformOrigin: 'center bottom'
    });


    gsap.set(title, {
      opacity: 0,
      y: 35
    });


    gsap.set(family, {
      opacity: 0,
      y: 25
    });


    gsap.set(message, {
      opacity: 0,
      y: 25
    });


    gsap.set(saveDate, {
      opacity: 0,
      y: 25
    });


    gsap.set(date, {
      opacity: 0,
      y: 20
    });


    gsap.set(venue, {
      opacity: 0,
      y: 20
    });


    /* =====================================================
       INTRO TIMELINE
    ===================================================== */

    const intro = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 72%',
        once: true
      }
    });


    intro
      /* Peacock */
      .to(peacock, {
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
        duration: 1.4,
        ease: 'power3.out'
      })

      /* Invitation title */
      .to(title, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out'
      }, '-=0.7')

      /* Family */
      .to(family, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power3.out'
      }, '-=0.45')


      /* Message */
      .to(message, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out'
      }, '-=0.35')


      /* Save date */
      .to(saveDate, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power3.out'
      }, '-=0.35')


      /* Date */
      .to(date, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out'
      }, '-=0.35')


      /* Venue */
      .to(venue, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out'
      }, '-=0.3');


    /* =====================================================
       SCROLL PARALLAX
    ===================================================== */

    const parallax = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.2,
        invalidateOnRefresh: true
      }
    });
    parallax
      /*
       * Background moves very slightly.
       */
      .to(
        background,
        {
          yPercent: 3,

          scale: 1.015,

          ease: 'none'
        },
        0
      )


      /*
       * Peacock moves faster than background.
       */
      .to(
        peacock,
        {
          yPercent: -12,
          xPercent: -3,
          ease: 'none'
        },
        0
      )


      /*
       * Text moves slightly upward.
       */
      .to(
        title,
        {
          yPercent: -8,

          ease: 'none'
        },
        0
      )

      .to(
        family,
        {
          yPercent: -10,

          ease: 'none'
        },
        0
      )

      .to(
        message,
        {
          yPercent: -12,

          ease: 'none'
        },
        0
      )

      .to(
        saveDate,
        {
          yPercent: -14,

          ease: 'none'
        },
        0
      )

      .to(
        date,
        {
          yPercent: -16,

          ease: 'none'
        },
        0
      )

      .to(
        venue,
        {
          yPercent: -18,

          ease: 'none'
        },
        0
      );


    /* =====================================================
       PEACOCK NATURAL FLOAT
    ===================================================== */

    gsap.to(peacock, {
      y: -4,
      rotation: 0.4,
      transformOrigin: 'center bottom',
      duration: 3.8,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true
    });

  }

  private createMobileInvitationAnimation(
    section: HTMLElement,
    background: HTMLElement,
    peacock: HTMLElement,
    title: HTMLElement,
    family: HTMLElement,
    message: HTMLElement,
    saveDate: HTMLElement,
    date: HTMLElement,
    venue: HTMLElement
  ): void {


    /* =====================================================
       INITIAL STATES
    ===================================================== */

    gsap.set(peacock, {
      opacity: 0,
      y: -45,
      x: 10,
      scale: 0.97
    });


    gsap.set(
      [
        title,
        family,
        message,
        saveDate,
        date,
        venue
      ],
      {
        opacity: 0,
        y: 20
      }
    );


    /* =====================================================
       INTRO
    ===================================================== */

    const intro = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 78%',
        once: true
      }

    });

    intro

      .to(peacock, {
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
        duration: 1.1,
        ease: 'power3.out'
      })


      .to(title, {
        opacity: 1,
        y: 0,
        duration: 0.75,
        ease: 'power3.out'
      }, '-=0.5')


      .to(family, {
        opacity: 1,
        y: 0,
        duration: 0.6
      }, '-=0.35')


      .to(message, {
        opacity: 1,
        y: 0,
        duration: 0.65
      }, '-=0.3')


      .to(saveDate, {
        opacity: 1,
        y: 0,
        duration: 0.6
      }, '-=0.3')


      .to(
        [date, venue],
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          stagger: 0.1
        },
        '-=0.25'
      );


    /* =====================================================
       MOBILE PARALLAX
    ===================================================== */

    const parallax = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5,
        invalidateOnRefresh: true
      }

    });


    parallax

      .to(
        background,
        {
          yPercent: 2,
          scale: 1.008,
          ease: 'none'
        },
        0
      )

      .to(
        peacock,
        {
          yPercent: -6,
          xPercent: -1,
          ease: 'none'
        },
        0
      )

      .to(
        title,
        {
          yPercent: -4,
          ease: 'none'
        },
        0
      )

      .to(
        family,
        {
          yPercent: -5,
          ease: 'none'
        },
        0
      )

      .to(
        message,
        {
          yPercent: -6,
          ease: 'none'
        },
        0
      )

      .to(
        saveDate,
        {
          yPercent: -7,
          ease: 'none'
        },
        0
      )

      .to(
        date,
        {
          yPercent: -8,
          ease: 'none'
        },
        0
      )

      .to(
        venue,
        {
          yPercent: -9,
          ease: 'none'
        },
        0
      );


    /* =====================================================
       SUBTLE PEACOCK MOVEMENT
    ===================================================== */

    gsap.to(peacock, {
      y: -2,
      rotation: 0.25,
      transformOrigin: 'center bottom',
      duration: 4,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true
    });

  }
}
