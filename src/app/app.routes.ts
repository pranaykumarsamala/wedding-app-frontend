import { Routes } from '@angular/router';
import { WeddingInvite } from './templateone/wedding-invite/wedding-invite';
import { Template2 } from './template-2/template-2';
import { Home } from './pages/home/home';
import { BeachWedding } from './templates/beach-wedding/beach-wedding';
import { Templates } from './pages/templates/templates';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'templates',
    component: Templates,
  },

  {
    path: 'template-1',
    component: WeddingInvite,
  },
  {
    path: 'template-2',
    component: Template2,
  },
  {
    path: 'beach-wedding',
    component: BeachWedding,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
