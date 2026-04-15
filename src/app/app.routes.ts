import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/layout/main/main').then((m) => m.Main),
  },
  {
    path: 'politica-privacidad',
    loadComponent: () =>
      import('./components/footerLinks/politica-privacidad/politica-privacidad').then(
        (m) => m.PoliticaPrivacidad,
      ),
  },
];
