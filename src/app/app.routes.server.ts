import { RenderMode, ServerRoute } from '@angular/ssr';
import { readFileSync } from 'fs';
import { join } from 'path';

function getCategoriaSlugs(): Array<Record<string, string>> {
  try {
    const jsonPath = join(process.cwd(), 'public', 'data', 'galerias.json');
    const data = JSON.parse(readFileSync(jsonPath, 'utf-8')) as Record<string, { slug: string }>;
    return Object.keys(data).map((slug) => ({ categoria: slug }));
  } catch {
    return [];
  }
}

export const serverRoutes: ServerRoute[] = [
  {
    path: 'galeria-imagenes/:categoria',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => getCategoriaSlugs(),
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
