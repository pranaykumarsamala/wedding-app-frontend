import { Component } from '@angular/core';
import { Hero } from './hero/hero';
import { InvitationSection } from './invitation-section/invitation-section';

@Component({
  selector: 'app-template-2',
  imports: [Hero, InvitationSection],
  templateUrl: './template-2.html',
  styleUrl: './template-2.scss',
})
export class Template2 {

}
