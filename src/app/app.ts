import { Component, signal, inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { RouterOutlet } from '@angular/router';
import { Footer } from './Common/footer/footer';
import { Header } from './Common/header/header';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('wedding-app-frontend');

  private router = inject(Router);

  showHeaderFooter = true;

  constructor() {
    this.updateLayout(this.router.url);

    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event) => {
        this.updateLayout(event.urlAfterRedirects);
      });
  }

  private updateLayout(url: string): void {
    const path = url.split('?')[0].split('#')[0];

    this.showHeaderFooter = !['/template-1', '/template-2'].includes(path);
  }
}
