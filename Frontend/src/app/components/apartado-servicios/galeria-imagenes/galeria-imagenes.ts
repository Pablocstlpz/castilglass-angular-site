import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ImagenItem {
  url: string;
  alt: string;
}

interface Categoria {
  slug: string;
  nombre: string;
  imagenes: ImagenItem[];
}

interface ImagenFlatItem {
  url: string;
  alt: string;
  slug: string;
}

const CATEGORIAS: Categoria[] = [
  {
    slug: 'carpinteria-metalica',
    nombre: 'Carpintería Metálica',
    imagenes: [
      // { url: 'assets/galeria/carpinteria-metalica/imagen-1.jpg', alt: 'Carpintería metálica' },
    ],
  },
  {
    slug: 'aluminio-pvc',
    nombre: 'Aluminio y PVC',
    imagenes: [
      // { url: 'assets/galeria/aluminio-pvc/imagen-1.jpg', alt: 'Aluminio y PVC' },
    ],
  },
  {
    slug: 'cristaleria',
    nombre: 'Cristalería',
    imagenes: [
      // { url: 'assets/galeria/cristaleria/imagen-1.jpg', alt: 'Cristalería' },
    ],
  },
  {
    slug: 'paneles-composite',
    nombre: 'Paneles Composite',
    imagenes: [
      // { url: 'assets/galeria/paneles-composite/imagen-1.jpg', alt: 'Paneles composite' },
    ],
  },
  {
    slug: 'ventanas-curvas',
    nombre: 'Ventanas Curvas',
    imagenes: [
      // { url: 'assets/galeria/ventanas-curvas/imagen-1.jpg', alt: 'Ventanas curvas' },
    ],
  },
  {
    slug: 'motorizaciones',
    nombre: 'Motorizaciones',
    imagenes: [
      // { url: 'assets/galeria/motorizaciones/imagen-1.jpg', alt: 'Motorizaciones' },
    ],
  },
  {
    slug: 'muros-cortina',
    nombre: 'Muros Cortina',
    imagenes: [
      // { url: 'assets/galeria/muros-cortina/imagen-1.jpg', alt: 'Muros cortina' },
    ],
  },
];

@Component({
  selector: 'app-galeria-imagenes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './galeria-imagenes.html',
  styleUrl: './galeria-imagenes.css',
})
export class GaleriaImagenes {
  readonly categorias = signal<Categoria[]>(CATEGORIAS);
  readonly categoriaActiva = signal<string>('todos');
  readonly lightboxAbierto = signal(false);
  readonly lightboxIndex = signal(0);

  get todasLasImagenes(): ImagenFlatItem[] {
    return this.categorias().flatMap((cat) =>
      cat.imagenes.map((img) => ({
        url: img.url,
        alt: img.alt,
        slug: cat.slug,
      })),
    );
  }

  get imagenesFiltradas(): ImagenFlatItem[] {
    const activa = this.categoriaActiva();
    if (activa === 'todos') return this.todasLasImagenes;
    return this.todasLasImagenes.filter((i) => i.slug === activa);
  }

  get categoriasFiltro(): { slug: string; nombre: string }[] {
    return [
      { slug: 'todos', nombre: 'Todos' },
      ...this.categorias().filter((c) => c.imagenes.length > 0),
    ];
  }

  get itemActual(): ImagenFlatItem {
    return this.imagenesFiltradas[this.lightboxIndex()];
  }

  setCategoriaActiva(slug: string): void {
    this.categoriaActiva.set(slug);
    this.lightboxIndex.set(0);
    this.lightboxAbierto.set(false);
  }

  abrirLightbox(index: number): void {
    this.lightboxIndex.set(index);
    this.lightboxAbierto.set(true);
  }

  cerrarLightbox(): void {
    this.lightboxAbierto.set(false);
  }

  anterior(): void {
    const total = this.imagenesFiltradas.length;
    this.lightboxIndex.set((this.lightboxIndex() - 1 + total) % total);
  }

  siguiente(): void {
    const total = this.imagenesFiltradas.length;
    this.lightboxIndex.set((this.lightboxIndex() + 1) % total);
  }
}
