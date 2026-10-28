import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero',
  imports: [CommonModule],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {
  activeView: 'mobile' | 'desktop' = 'mobile';

  setView(view: 'mobile' | 'desktop'): void {
    this.activeView = view;
  }

  browseTemplates(): void {
    document.getElementById('templates')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }
}
