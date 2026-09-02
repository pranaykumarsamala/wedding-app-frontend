import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';

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
    const flowers = gsap.utils.toArray<HTMLElement>('.flower');

    flowers.forEach((flower, index) => {
      gsap.to(flower, {
        rotation: 4,
        y: 3,

        duration: 1.2,
        delay: index * 0.08,

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
    const bells = gsap.utils.toArray<HTMLElement>('.bell');

    bells.forEach((bell, index) => {
      gsap.to(bell, {
        rotation: 4,
        y: 3,

        duration: 1.2,
        delay: index * 0.08,

        ease: 'sine.inOut',

        repeat: -1,
        yoyo: true,

        transformOrigin: '50% 0%',
      });
    });
  }
  // ==========================================
  // SIDE BANNER DECORATIONS
  // ==========================================

  private animateBottomDecorations(): void {
    const leftTree = this.hero.nativeElement.querySelector<HTMLElement>(
      '.left-bottom-flower .banner-tree',
    );

    const rightTree = this.hero.nativeElement.querySelector<HTMLElement>(
      '.right-bottom-flower .banner-tree',
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
