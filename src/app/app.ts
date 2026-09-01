import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {WeddingInvite} from  './templateone/wedding-invite/wedding-invite'
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, WeddingInvite],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('wedding-app-frontend');
}
