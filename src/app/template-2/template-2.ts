import { Component } from '@angular/core';
import { Hero } from './hero/hero';
import { InvitationSection } from './invitation-section/invitation-section';
import { EventsSection } from './events-section/events-section';
import { RsvpSection } from './rsvp-section/rsvp-section';

@Component({
  selector: 'app-template-2',
  imports: [Hero, InvitationSection, EventsSection, RsvpSection],
  templateUrl: './template-2.html',
  styleUrl: './template-2.scss',
})
export class Template2 {

}
