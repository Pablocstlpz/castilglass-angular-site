import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { RouterLink } from '@angular/router';

type HeaderSection = 'inicio' | 'servicios' | 'proyectos' | 'nosotros' | 'contacto';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  readonly activeSection = signal<HeaderSection>('inicio');

  private readonly destroyRef = inject(DestroyRef);
  private readonly router = inject(Router);
  private observer?: IntersectionObserver;

  constructor() {
    if (typeof window === 'undefined') {
      return;
    }

    const navigationEnd = this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
    );

    const subscription = navigationEnd.subscribe(() => {
      const fragment = this.router.parseUrl(this.router.url).fragment as HeaderSection | null;

      if (fragment) {
        this.activeSection.set(fragment);
        window.setTimeout(() => this.scrollToSectionElement(fragment), 0);
      }
    });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  ngAfterViewInit(): void {
    if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') {
      return;
    }

    const sections: HeaderSection[] = ['inicio', 'servicios', 'proyectos', 'nosotros', 'contacto'];

    this.observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((first, second) => second.intersectionRatio - first.intersectionRatio)[0];

        if (visibleEntry?.target.id) {
          this.activeSection.set(visibleEntry.target.id as HeaderSection);
        }
      },
      {
        root: null,
        threshold: [0.2, 0.4, 0.6, 0.8],
        rootMargin: '-20% 0px -55% 0px',
      },
    );

    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId);

      if (element) {
        this.observer?.observe(element);
      }
    });

    this.destroyRef.onDestroy(() => this.observer?.disconnect());
  }

  scrollToSection(sectionId: HeaderSection): void {
    this.activeSection.set(sectionId);

    if (this.isHomeRoute()) {
      this.scrollToSectionElement(sectionId);
      this.closeMobileMenu();
      return;
    }

    void this.router.navigate(['/'], { fragment: sectionId });
    this.closeMobileMenu();
  }

  goToSolicitarPresupuesto(): void {
    void this.router.navigate(['/solicitar-presupuesto']);
    this.closeMobileMenu();
  }

  private isHomeRoute(): boolean {
    return this.router.url.split('?')[0].split('#')[0] === '/';
  }

  private scrollToSectionElement(sectionId: HeaderSection): void {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  private closeMobileMenu(): void {
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle') as HTMLInputElement | null;

    if (mobileMenuToggle) {
      mobileMenuToggle.checked = false;
    }
  }
}
