import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PadPipe } from '../pad.pipe';

export interface LegalIndexItem {
  id: string;
  label: string;
}

/** Shared shell for the legal pages: title block, section index and projected sections. */
@Component({
  selector: 'app-legal-page',
  imports: [RouterLink, PadPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main id="contenido" tabindex="-1">
      <header class="border-b border-ink-900">
        <div class="mx-auto max-w-7xl px-4 pb-8 pt-10 sm:px-6 md:pt-16 lg:px-8 lg:pt-20">
          <p class="font-mono text-xs font-medium uppercase tracking-wider text-ink-700">
            Información legal
          </p>
          <h1
            class="mt-3 text-balance font-headline text-5xl font-bold uppercase leading-[0.9] text-ink-900 sm:text-6xl lg:text-8xl"
          >
            {{ heading() }}
          </h1>
          <p class="mt-6 font-mono text-xs uppercase tracking-wider text-ink-700">
            Última actualización: {{ updated() }}
          </p>
        </div>
      </header>

      <div
        class="mx-auto grid max-w-7xl grid-cols-1 gap-y-10 px-4 py-10 sm:px-6 md:py-16 lg:grid-cols-12 lg:gap-x-8 lg:px-8"
      >
        <nav aria-label="Índice" class="lg:col-span-3">
          <div class="lg:sticky lg:top-24">
            <p class="font-mono text-xs font-medium uppercase tracking-wider text-ink-700">Índice</p>
            <ol class="mt-3 border-t border-ink-900">
              @for (item of index(); track item.id; let i = $index) {
                <li class="border-b border-ink-200">
                  <a
                    [routerLink]="[]"
                    [fragment]="item.id"
                    class="flex min-h-11 items-center gap-3 py-2 text-base text-ink-900 transition-colors duration-150 ease-out hover:text-brand-700"
                  >
                    <span class="font-mono text-xs text-ink-700">{{ i + 1 | pad }}</span>
                    {{ item.label }}
                  </a>
                </li>
              }
            </ol>
          </div>
        </nav>

        <div class="lg:col-span-9">
          <ng-content />
        </div>
      </div>
    </main>
  `,
})
export class LegalPage {
  readonly heading = input.required<string>();
  readonly updated = input.required<string>();
  readonly index = input.required<readonly LegalIndexItem[]>();
}
