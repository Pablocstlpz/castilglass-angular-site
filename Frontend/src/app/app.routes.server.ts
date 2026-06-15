import { RenderMode, ServerRoute } from '@angular/ssr';

const CATEGORIA_SLUGS = [
  'carpinteria-metalica',
  'aluminio-pvc',
  'cristaleria',
  'paneles-composite',
  'ventanas-curvas',
  'motorizaciones',
  'muros-cortina',
];

export const serverRoutes: ServerRoute[] = [
  {
    path: 'galeria-imagenes/:categoria',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => CATEGORIA_SLUGS.map((slug) => ({ categoria: slug })),
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
