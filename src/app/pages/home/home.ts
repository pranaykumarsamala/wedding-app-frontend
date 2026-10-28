import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Templates } from './templates/templates';
import { Benefits } from './benefits/benefits';
import { Faq } from './faq/faq';
import { HowItWorks } from './how-it-works/how-it-works';
import { InvitationCta } from './invitation-cta/invitation-cta';
import { Testimonials } from './testimonials/testimonials';
import { Hero } from './hero/hero';

@Component({
  selector: 'app-home',
  imports: [Hero, Templates, HowItWorks, Benefits, Faq, Testimonials, InvitationCta, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
