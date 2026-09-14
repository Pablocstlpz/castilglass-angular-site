import { Routes } from '@angular/router';

// SEO: `title` feeds <title>/og:title, `data.description` feeds meta description (see app.ts).
export const routes: Routes = [
  {
    path: '',
    title: 'Carpintería de aluminio, PVC y hierro en Córdoba | Castilglass',
    data: {
      description:
        'Carpintería de aluminio, PVC y hierro a medida en Córdoba. Fabricación propia e instalación, con más de 50 años de experiencia. Pide tu presupuesto sin compromiso.',
    },
    loadComponent: () => import('./components/layout/main/main').then((m) => m.Main),
  },
  {
    path: 'nuestros-servicios',
    title: 'Servicios de aluminio, PVC y hierro en Córdoba | Castilglass',
    data: {
      description:
        'Carpintería metálica, ventanas de aluminio y PVC, vidrios, panel composite, ventanas curvas, motorizaciones y muros cortina a medida en Córdoba.',
    },
    loadComponent: () =>
      import('./components/apartado-servicios/apartado-servicios').then(
        (m) => m.ApartadoServicios,
      ),
  },
  {
    path: 'solicitar-presupuesto',
    title: 'Presupuesto de aluminio, PVC y hierro en Córdoba | Castilglass',
    data: {
      description:
        'Pide presupuesto gratis y sin compromiso para tu proyecto de carpintería de aluminio, PVC o hierro en Córdoba.',
    },
    loadComponent: () =>
      import('./components/solicitar-presupuesto/solicitar-presupuesto').then(
        (m) => m.SolicitarPresupuesto,
      ),
  },
  {
    path: 'politica-privacidad',
    title: 'Política de privacidad | Castilglass',
    data: {
      noindex: true,
      description: 'Cómo trata Castilglass los datos personales que recibe a través de su web y formularios.',
    },
    loadComponent: () =>
      import('./components/footerLinks/politica-privacidad/politica-privacidad').then(
        (m) => m.PoliticaPrivacidad,
      ),
  },
  {
    path: 'politica-cookies',
    title: 'Política de cookies | Castilglass',
    data: {
      noindex: true,
      description: 'Cookies y servicios de terceros que utiliza la web de Castilglass.',
    },
    loadComponent: () =>
      import('./components/footerLinks/politica-cookies/politica-cookies').then(
        (m) => m.PoliticaCookies,
      ),
  },
  {
    path: 'aviso-legal',
    title: 'Aviso legal | Castilglass',
    data: {
      noindex: true,
      description: 'Datos identificativos y condiciones de uso de la web de Castilglass.',
    },
    loadComponent: () =>
      import('./components/footerLinks/aviso-legal/aviso-legal').then((m) => m.AvisoLegal),
  },
];
