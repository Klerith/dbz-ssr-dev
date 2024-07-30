import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'characters/page/:page',
    loadComponent: () => import('./pages/characters/characters-page.component'),
  },
  {
    path: 'character/',
    loadComponent: () => import('./pages/character/character-page.component'),
  },
  {
    path: '**',
    redirectTo: () => {
      return 'characters/page/1';
    },
  },
];
