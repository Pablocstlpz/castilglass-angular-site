import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs';

type HeaderSection = 'inicio' | 'servicios' | 'nosotros' | 'contacto';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '(document:keydown.escape)': 'menuOpen.set(false)' },
})
export class Header {
  readonly sections: { id: HeaderSection; label: string }[] = [
    { id: 'inicio', label: 'Inicio' },
    { id: 'servicios', label: 'Servicios' },
    { id: 'nosotros', label: 'Sobre nosotros' },
    { id: 'contacto', label: 'Contacto' },
  ];

  readonly activeSection = signal<HeaderSection>('inicio');
  readonly isHome = signal(true);
  readonly menuOpen = signal(false);

  private readonly router = inject(Router);
  private observer?: IntersectionObserver;

  constructor() {
    if (typeof window === 'undefined') {
      return;
    }

    const subscription = this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe(() => {
        this.menuOpen.set(false);
        this.isHome.set(this.router.url.split(/[?#]/)[0] === '/');

        const fragment = this.router.parseUrl(this.router.url).fragment as HeaderSection | null;
        if (fragment) {
          this.activeSection.set(fragment);
        }

        // Home sections are re-created on every visit, so observe them again after render.
        window.setTimeout(() => {
          if (fragment) this.scrollToSectionElement(fragment);
          this.observeSections();
        }, 0);
      });

    inject(DestroyRef).onDestroy(() => {
      subscription.unsubscribe();
      this.observer?.disconnect();
    });
  }

  isActive(sectionId: HeaderSection): boolean {
    return this.isHome() && this.activeSection() === sectionId;
  }

  // routerLink handles navigation; this covers re-clicking the current fragment, which the router ignores.
  goToSection(sectionId: HeaderSection): void {
    this.menuOpen.set(false);
    if (this.isHome()) {
      this.activeSection.set(sectionId);
      this.scrollToSectionElement(sectionId);
    }
  }

  private observeSections(): void {
    this.observer?.disconnect();
    if (!this.isHome() || typeof IntersectionObserver === 'undefined') {
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((first, second) => second.intersectionRatio - first.intersectionRatio)[0];

        if (visibleEntry?.target.id) {
          this.activeSection.set(visibleEntry.target.id as HeaderSection);
        }
      },
      { threshold: [0.2, 0.4, 0.6, 0.8], rootMargin: '-20% 0px -55% 0px' },
    );

    for (const { id } of this.sections) {
      const element = document.getElementById(id);
      if (element) this.observer.observe(element);
    }
  }

  private scrollToSectionElement(sectionId: HeaderSection): void {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
