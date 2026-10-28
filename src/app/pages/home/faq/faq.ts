import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface FAQ {
  question: string;
  answer: string;
}
@Component({
  selector: 'app-faq',
  imports: [CommonModule],
  templateUrl: './faq.html',
  styleUrl: './faq.scss',
})
export class Faq {
  activeIndex: number | null = 0;

  faqs: FAQ[] = [
    {
      question: 'What’s included in the Signature Bundle?',
      answer:
        'The Signature Bundle includes customized content designed around your brand, audience, and business goals.',
    },
    {
      question: 'Who will be working on my content?',
      answer:
        'Your content will be handled by a dedicated creative team focused on your brand voice, strategy, and quality.',
    },
    {
      question: 'Is this AI content?',
      answer:
        'Our content is created with a human-first approach, with thoughtful research, creativity, and quality checks.',
    },
    {
      question: 'How fast will I get my content?',
      answer:
        'Delivery timelines depend on the selected package and project scope. Your timeline will be shared after confirmation.',
    },
    {
      question: 'What’s your revision policy?',
      answer:
        'We offer revisions to help ensure your content aligns with the agreed brief and brand guidelines.',
    },
    {
      question: 'I’m a social media manager. Can I use this for my clients?',
      answer:
        'Yes, you can use our content services for your clients. Share your requirements when placing your order.',
    },
    {
      question: 'What kind of businesses do you work with?',
      answer:
        'We work with a variety of businesses, including personal brands, startups, service providers, and growing companies.',
    },
    {
      question: 'What do I need to give you for a successful content bundle?',
      answer:
        'A short brief covering your business, target audience, brand voice, goals, preferred platforms, and examples you like.',
    },
  ];

  toggleFaq(index: number): void {
    this.activeIndex = this.activeIndex === index ? null : index;
  }
}
