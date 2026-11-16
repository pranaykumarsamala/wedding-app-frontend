import { Component } from '@angular/core';
import { HeroSection } from './sections/hero-section/hero-section';
import { CoupleIntro } from './sections/couple-intro/couple-intro';
import { WeddingDetails } from './sections/wedding-details/wedding-details';
import { EventGallery } from './sections/event-gallery/event-gallery';
import { RsvpSection } from './sections/rsvp-section/rsvp-section';
import { CountdownSection } from './sections/countdown-section/countdown-section';
@Component({
  selector: 'app-beach-wedding',
  imports: [HeroSection, CoupleIntro, WeddingDetails, EventGallery, RsvpSection, CountdownSection],
  templateUrl: './beach-wedding.html',
  styleUrl: './beach-wedding.scss',
})
export class BeachWedding {}
