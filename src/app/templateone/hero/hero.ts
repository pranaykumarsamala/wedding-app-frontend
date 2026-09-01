import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild
} from '@angular/core';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-hero',
  imports: [],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero implements AfterViewInit, OnDestroy {

  @ViewChild('hero', { static: true })
  hero!: ElementRef<HTMLElement>;

  private ctx!: gsap.Context;


  // ==========================================
  // INIT
  // ==========================================

  ngAfterViewInit(): void {

    this.ctx = gsap.context(() => {

      this.animateFlowers();

      this.animateBells();

      this.animateBottomDecorations();

    }, this.hero.nativeElement);

  }


  // ==========================================
  //  TOP FLOWERS
  // ==========================================

  private animateFlowers(): void {

    const flowers =
      gsap.utils.toArray<HTMLElement>('.flower');


    flowers.forEach((flower, index) => {

      gsap.to(flower, {

        rotation: index % 2 === 0 ? 3 : -3,

        y: 3,

        duration: 3 + index * 0.25,

        delay: index * 0.2,

        ease: 'sine.inOut',

        repeat: -1,

        yoyo: true,

        transformOrigin: '50% 0%',

      });

    });

  }


  // ==========================================
  // BELLS
  // ==========================================

  private animateBells(): void {

    const bells =
      gsap.utils.toArray<HTMLElement>('.bell');


    bells.forEach((bell, index) => {

      const tl = gsap.timeline({

        repeat: -1,

        delay: index * 0.25,

        repeatDelay: 2,

      });


      tl.to(bell, {

        rotation: 4,

        duration: 0.35,

        ease: 'power2.out',

        transformOrigin: '50% 0%',

      })

      .to(bell, {

        rotation: -3,

        duration: 0.7,

        ease: 'sine.inOut',

      })

      .to(bell, {

        rotation: 2,

        duration: 0.6,

        ease: 'sine.inOut',

      })

      .to(bell, {

        rotation: 0,

        duration: 0.6,

        ease: 'sine.out',

      });

    });

  }


  // ==========================================
  // SIDE BANNER DECORATIONS
  // ==========================================

  private animateBottomDecorations(): void {

    const leftTree =
      this.hero.nativeElement.querySelector<HTMLElement>(
        '.left-bottom-flower .banner-tree'
      );

    const rightTree =
      this.hero.nativeElement.querySelector<HTMLElement>(
        '.right-bottom-flower .banner-tree'
      );


    // ========================================
    // LEFT BANANA TREE
    // ========================================

    if (leftTree) {

      gsap.to(leftTree, {

        rotation: 2,

        x: 3,

        duration: 4,

        ease: 'sine.inOut',

        repeat: -1,

        yoyo: true,

        transformOrigin: '50% 100%',

      });

    }


    // ========================================
    // RIGHT BANANA TREE
    // ========================================

    if (rightTree) {

      gsap.to(rightTree, {

        rotation: -2,

        x: -3,

        duration: 4.2,

        ease: 'sine.inOut',

        repeat: -1,

        yoyo: true,

        transformOrigin: '50% 100%',

      });

    }

  }


  // ==========================================
  // DESTROY
  // ==========================================

  ngOnDestroy(): void {

    this.ctx?.revert();

  }

}
