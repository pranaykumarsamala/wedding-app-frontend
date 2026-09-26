import { Component, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { ISourceOptions } from '@tsparticles/engine';
import { loadSlim } from '@tsparticles/slim';
import { tsParticles } from '@tsparticles/engine';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-hero',
  imports: [],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {
  @ViewChild('hero', { static: true }) hero!: ElementRef<HTMLElement>;

  private ctx?: gsap.Context;

  async ngAfterViewInit() {

    await loadSlim(tsParticles);

    await tsParticles.load({
      id: 'wedding-stars',

      options: this.getStarOptions()
    });

    this.ctx = gsap.context(() => {
      this.createHeroAnimation();
    }, this.hero.nativeElement);

  }

  private getStarOptions(): ISourceOptions {

    return {

      fullScreen: {
        enable: false
      },

      particles: {

        number: {
          value: 50,
          density: {
            enable: true,
            width: 1920,
            height: 1080
          }
        },

        color: {
          value: '#ffffff'
        },

        shape: {
          type: 'star',
          options: {
            star: {
              sides: 4,
              inset: 3,
            },
          },
        },

        size: {
          value: { min: 2, max: 6 },
          animation: {
            enable: true,
            speed: 1.5,
            sync: false,
            startValue: "random"
          }
        },

        opacity: {
          value: { min: 0.1, max: 1 },

          animation: {
            enable: true,
            speed: 1,
            minimumValue: 0.2,
            sync: false,
            startValue: "random"
          }
        },

        move: {
          enable: true,
          speed: 0.25,
          direction: 'none',
          random: true,
          straight: false,
          outModes: {
            default: 'bounce'
          }
        }
      },
      detectRetina: true
    };
  }

  private createHeroAnimation(): void {

    const hero = this.hero.nativeElement;

    // const background = hero.querySelector(
    //   '.hero-background'
    // );

    const thoran = hero.querySelector(
      '.thoran'
    );

    const ganesh = hero.querySelector(
      '.ganesh'
    );

    const names = hero.querySelector(
      '.names'
    );

    const groom = hero.querySelector(
      '.names h1:first-child'
    );

    const weds = hero.querySelector(
      '.names span'
    );

    const bride = hero.querySelector(
      '.names h1:last-child'
    );

    // const moon = hero.querySelector(
    //   '.moon'
    // );

    const taj = hero.querySelector(
      '.taj-mahal'
    );

    const couple = hero.querySelector(
      '.couple'
    );

    const hangingFlowers =
      hero.querySelectorAll('.hanging');
    /* -----------------------------
       Initial states
    ----------------------------- */

    gsap.set(thoran, {
      y: -40,
      opacity: 0
    });

    gsap.set(ganesh, {
      y: -20,
      opacity: 0,
      scale: 0.9
    });

    gsap.set([groom, weds, bride], {
      y: 40,
      opacity: 0
    });

    // gsap.set(moon, {
    //   x: 20,
    //   opacity: 0
    // });

    gsap.set(taj, {
      y: 50,
      opacity: 0
    });

    gsap.set(couple, {
      y: 60,
      opacity: 0,
      scale: 0.95
    });

    gsap.to(hangingFlowers, {
      rotation: 3,
      transformOrigin: 'top center',
      duration: 1,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
      stagger: {
        each: 0.3
      }
    });

    gsap.to(thoran, {
      y: 3,
      duration: 3,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true
    });

    /* -----------------------------
       Entrance timeline
    ----------------------------- */

    const intro = gsap.timeline({
      defaults: {
        ease: 'power3.out'
      }
    });

    intro
      .to(thoran, {
        y: 0,
        opacity: 1,
        duration: 1.2
      })

      .to(ganesh, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.9
      }, '-=0.7')

      .to(groom, {
        opacity: 1,
        y: 0,
        duration: 0.8
      })

      .to(weds, {
        opacity: 1,
        y: 0,
        duration: 0.6
      }, '-=0.4')

      .to(bride, {
        opacity: 1,
        y: 0,
        duration: 0.8
      }, '-=0.3')

      // .to(moon, {
      //   x: 0,
      //   opacity: 1,
      //   duration: 0.8
      // }, '-=0.6')

      .to(taj, {
        y: 0,
        opacity: 1,
        duration: 1
      }, '-=0.5')

      .to(couple, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1
      }, '-=0.7');


    /* -----------------------------
       Scroll animation
    ----------------------------- */

    this.createScrollAnimation(hero, {
      thoran,
      ganesh,
      names,
      taj,
      couple
    });


  }

  private createScrollAnimation(
    hero: HTMLElement,
    elements: {
      thoran: Element | null;
      ganesh: Element | null;
      names: Element | null;
      taj: Element | null;
      couple: Element | null;
    }
  ): void {

    const {
      thoran,
      ganesh,
      names,
      taj,
      couple
    } = elements;


    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: hero,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
        invalidateOnRefresh: true
      }
    });


    timeline


      /* Thoran */
      .to(thoran, {
        yPercent: -12,
        ease: 'none'
      }, 0)


      /* Ganesh */
      .to(ganesh, {
        yPercent: -18,
        ease: 'none'
      }, 0)


      /* Names */
      .to(names, {
        yPercent: -28,
        opacity: 0.75,
        ease: 'none'
      }, 0)

      /* Taj Mahal */
      .to(taj, {
        yPercent: -10,
        ease: 'none'
      }, 0)


      /* Couple */
      .to(couple, {
        yPercent: -5,
        ease: 'none'
      }, 0);

  }

  ngOnDestroy(): void {

    this.ctx?.revert();

  }
}
