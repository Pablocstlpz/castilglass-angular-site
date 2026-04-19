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
  {
    path: 'solicitar-presupuesto',
    loadComponent: () =>
      import('./components/solicitar-presupuesto/solicitar-presupuesto').then(
        (m) => m.SolicitarPresupuesto,
      ),
  },
  {
    path: 'servicios/nuestros-servicios',
    loadComponent: () =>
      import('./components/apartado-servicios/apartado-servicios').then(
        (m) => m.ApartadoServicios,
      ),
  }
];
