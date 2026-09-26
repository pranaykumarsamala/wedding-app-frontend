import { Routes } from '@angular/router';
import { WeddingInvite } from './templateone/wedding-invite/wedding-invite';
import { Template2 } from './template-2/template-2';

export const routes: Routes = [
    {
        path: 'template-1',
        component: WeddingInvite
    },
    {
        path: 'template-2',
        component: Template2
    },
    {
        path: '**',
        redirectTo: ''
    }
];
