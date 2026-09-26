import { Routes } from '@angular/router';
import { WeddingInvite } from './templateone/wedding-invite/wedding-invite';

export const routes: Routes = [
    {
        path: 'template-1',
        component: WeddingInvite
    },
    {
        path: '**',
        redirectTo: ''
    }
];
