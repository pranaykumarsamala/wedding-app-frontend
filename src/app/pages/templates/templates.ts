import { Component } from '@angular/core';
import { Hero } from './hero/hero';
import { TemplatesList } from './templates-list/templates-list';
import { Faq } from './faq/faq';
import { HowItWorks } from './how-it-works/how-it-works';

@Component({
  selector: 'app-templates',
  imports: [Hero, TemplatesList, Faq, HowItWorks],
  templateUrl: './templates.html',
  styleUrl: './templates.scss',
})
export class Templates {}
