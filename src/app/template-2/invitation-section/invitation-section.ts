import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
@Component({
  selector: 'app-invitation-section',
  imports: [],
  templateUrl: './invitation-section.html',
  styleUrl: './invitation-section.scss',
})
export class InvitationSection implements OnInit, OnDestroy {
  @ViewChild('invitationSection', { static: true }) invitationSection!: ElementRef<HTMLElement>;

  private ctx?: gsap.Context;
  private media?: gsap.MatchMedia;
  private invitationSplits: SplitText[] = [];

  ngOnInit(): void {
    gsap.registerPlugin(ScrollTrigger, SplitText);
  }

  ngOnDestroy(): void {
    this.media?.revert();
    this.ctx?.revert();

  }

  ngAfterViewInit() {
    this.ctx = gsap.context(() => {
      this.createInvitationAnimation();
    }, this.invitationSection.nativeElement);
  }

  private createInvitationAnimation(): void {

    const section = this.invitationSection.nativeElement;
    const refreshAfterLayout = (): void => {
      requestAnimationFrame(() => ScrollTrigger.refresh());
    };

    section.querySelectorAll('img').forEach((image) => {
      if (!image.complete) {
        image.addEventListener('load', refreshAfterLayout, { once: true });
        image.addEventListener('error', refreshAfterLayout, { once: true });
      }
    });

    const background =
      section.querySelector<HTMLElement>(
        '.invitation-background'
      );

    const content =
      section.querySelector<HTMLElement>(
        '.invitation-content'
      );

    const peacock =
      section.querySelector<HTMLElement>(
        '.peacock'
      );

    const title =
      section.querySelector<HTMLElement>(
        '.invitation-title'
      );

    const familyName =
      section.querySelector<HTMLElement>(
        '.family-name'
      );

    const message =
      section.querySelector<HTMLElement>(
        '.invitation-message'
      );

    const saveDate =
      section.querySelector<HTMLElement>(
        '.save-date'
      );

    const weddingDate =
      section.querySelector<HTMLElement>(
        '.wedding-date'
      );

    const venue =
      section.querySelector<HTMLElement>(
        '.venue'
      );


    if (
      !background ||
      !content ||
      !peacock ||
      !title ||
      !familyName ||
      !message ||
      !saveDate ||
      !weddingDate ||
      !venue
    ) {
      return;
    }


    // =====================================================
    // SPLIT TEXT
    // =====================================================

    const titleSplit = SplitText.create(
      title,
      {
        type: 'chars'
      }
    );

    const familySplit = SplitText.create(
      familyName,
      {
        type: 'words'
      }
    );

    const messageSplit = SplitText.create(
      message,
      {
        type: 'words'
      }
    );

    const saveDateSplit = SplitText.create(
      saveDate,
      {
        type: 'chars'
      }
    );

    const dateSplit = SplitText.create(
      weddingDate,
      {
        type: 'words'
      }
    );

    const venueSplit = SplitText.create(
      venue,
      {
        type: 'words'
      }
    );


    this.invitationSplits = [
      titleSplit,
      familySplit,
      messageSplit,
      saveDateSplit,
      dateSplit,
      venueSplit
    ];


    // =====================================================
    // INITIAL STATE
    //
    // IMPORTANT:
    // Text is hidden immediately.
    // It will NOT animate until ScrollTrigger fires.
    // =====================================================

    gsap.set(
      [
        ...titleSplit.chars,
        ...saveDateSplit.chars
      ],
      {
        autoAlpha: 0,
        y: 50,
        rotationX: -45,
        transformPerspective: 800
      }
    );


    gsap.set(
      [
        ...familySplit.words,
        ...messageSplit.words,
        ...dateSplit.words,
        ...venueSplit.words
      ],
      {
        autoAlpha: 0,
        y: 25
      }
    );


    // =====================================================
    // PEACOCK INITIAL STATE
    // =====================================================

    gsap.set(peacock, {
      autoAlpha: 0,
      y: -70,
      x: 30,
      scale: 0.96,
      transformOrigin: 'center bottom'
    });


    // =====================================================
    // INTRO TIMELINE
    //
    // Nothing starts until section reaches viewport.
    // =====================================================

    const peacockFloat = gsap.to(peacock, {
      y: -8,
      x: 3,
      rotation: 0.8,
      transformOrigin: 'center bottom',
      duration: 5.2,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
      paused: true
    });

    const intro = gsap.timeline({ paused: true });


    // =====================================================
    // 1. PEACOCK
    // =====================================================

    intro.to(peacock, {

      autoAlpha: 1,

      y: 0,

      x: 0,

      scale: 1,

      duration: 1.4,

      ease: 'power3.out'

    });


    // =====================================================
    // 2. INVITATION TITLE
    // Character by character
    // =====================================================

    intro.to(
      titleSplit.chars,
      {

        autoAlpha: 1,

        y: 0,

        rotationX: 0,

        duration: 0.8,

        ease: 'power3.out',

        stagger: 0.065

      },
      '-=0.65'
    );


    // =====================================================
    // 3. FAMILY NAME
    // Word by word
    // =====================================================

    intro.to(
      familySplit.words,
      {

        autoAlpha: 1,

        y: 0,

        duration: 0.65,

        ease: 'power3.out',

        stagger: 0.09

      },
      '-=0.35'
    );


    // =====================================================
    // 4. MESSAGE
    // Word by word
    // =====================================================

    intro.to(
      messageSplit.words,
      {

        autoAlpha: 1,

        y: 0,

        duration: 0.55,

        ease: 'power3.out',

        stagger: 0.045

      },
      '-=0.30'
    );


    // =====================================================
    // 5. SAVE THE DATE
    // Character by character
    // =====================================================

    intro.to(
      saveDateSplit.chars,
      {

        autoAlpha: 1,

        y: 0,

        rotationX: 0,

        duration: 0.7,

        ease: 'power3.out',

        stagger: 0.055

      },
      '-=0.20'
    );


    // =====================================================
    // 6. DATE
    // Word by word
    // =====================================================

    intro.to(
      dateSplit.words,
      {

        autoAlpha: 1,

        y: 0,

        duration: 0.55,

        ease: 'power3.out',

        stagger: 0.08

      },
      '-=0.30'
    );


    // =====================================================
    // 7. VENUE
    // Word by word
    // =====================================================

    intro.to(
      venueSplit.words,
      {

        autoAlpha: 1,

        y: 0,

        duration: 0.55,

        ease: 'power3.out',

        stagger: 0.045

      },
      '-=0.30'
    );


    // =====================================================
    // PEACOCK SUBTLE FLOAT
    // =====================================================

    intro.eventCallback('onComplete', () => peacockFloat.play());

    this.media = gsap.matchMedia(section);
    this.media.add(
      {
        isMobile: '(max-width: 600px)',
        isDesktop: '(min-width: 601px)',
      },
      (context) => {
        const isMobile = context.conditions?.['isMobile'] ?? false;

        ScrollTrigger.create({
          trigger: section,
          start: isMobile ? 'top 60%' : 'top 78%',
          animation: intro,
          toggleActions: isMobile ? 'play none none none' : 'play reverse play reverse',
          onEnter: () => {
            if (intro.progress() === 1) {
              peacockFloat.play();
            }
          },
          onEnterBack: () => {
            if (intro.progress() === 1) {
              peacockFloat.play();
            }
          },
          onLeave: () => peacockFloat.pause(),
          onLeaveBack: () => {
            if (!isMobile) {
              peacockFloat.pause(0);
            } else {
              peacockFloat.pause();
            }
          },
          invalidateOnRefresh: true,
        });
      },
    );


    // =====================================================
    // PARALLAX
    // =====================================================

    const parallax = gsap.timeline({

      scrollTrigger: {

        trigger: section,

        start: 'top bottom',

        end: 'bottom top',

        scrub: 1.2,

        invalidateOnRefresh: true

      }

    });


    // Background — very subtle
    parallax.to(
      background,
      {

        yPercent: 3,

        scale: 1.02,

        ease: 'none'

      },
      0
    );

    parallax.to(
      content,
      {

        yPercent: -14,

        ease: 'none'

      },
      0
    );

    refreshAfterLayout();


    // Peacock — stronger movement
    parallax.to(
      peacock,
      {

        yPercent: -20,

        xPercent: -3,

        ease: 'none'

      },
      0
    );

  }
}
