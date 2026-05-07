import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

interface ImagenItem {
  id: string;
  url: string;
  public_id: string;
  subidaEn: string;
}

interface Categoria {
  slug: string;
  nombre: string;
  descripcion: string;
  icono: string;
  imagenes: ImagenItem[];
}

interface GaleriaData {
  [slug: string]: Categoria;
}

interface ImagenFlatItem {
  url: string;
  urlOriginal: string;
  alt: string;
  slug: string;
}

@Component({
  selector: 'app-galeria-imagenes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './galeria-imagenes.html',
  styleUrl: './galeria-imagenes.css',
})
export class GaleriaImagenes implements OnInit {
  private readonly http = inject(HttpClient);

  readonly categorias = signal<Categoria[]>([]);
  readonly categoriaActiva = signal<string>('todos');
  readonly lightboxAbierto = signal(false);
  readonly lightboxIndex = signal(0);

  private optimizarUrl(url: string, ancho: number): string {
    return url.replace('/upload/', `/upload/w_${ancho},c_limit,q_auto,f_auto/`);
  }

  get todasLasImagenes(): ImagenFlatItem[] {
    return this.categorias().flatMap((cat) =>
      cat.imagenes.map((img) => ({
        url: this.optimizarUrl(img.url, 800),
        urlOriginal: this.optimizarUrl(img.url, 1600),
        alt: cat.nombre,
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

  ngOnInit(): void {
    this.http.get<GaleriaData>('data/galerias.json').subscribe({
      next: (data) => this.categorias.set(Object.values(data)),
      error: (err) => console.error('Error cargando galería:', err),
    });
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
