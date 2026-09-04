import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-invitation-section',
  imports: [],
  templateUrl: './invitation-section.html',
  styleUrl: './invitation-section.scss',
})
export class InvitationSection implements AfterViewInit, OnDestroy {
  @ViewChild('invitationSection', { static: true }) invitationSection!: ElementRef<HTMLElement>;
  private ctx!: gsap.Context;
  ngAfterViewInit(): void {
    const section = this.invitationSection.nativeElement;
    this.ctx = gsap.context(() => {
      const title = section.querySelector('h3');
      gsap.fromTo(
        title,
        { y: 150, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: 'power2.out',
          scrollTrigger: { trigger: section, start: 'top 90%', end: 'top 50%', scrub: 1.5 },
        },
      );
    }, section);
    ScrollTrigger.refresh();
  }
  ngOnDestroy(): void {
    this.ctx?.revert();
  }
}
