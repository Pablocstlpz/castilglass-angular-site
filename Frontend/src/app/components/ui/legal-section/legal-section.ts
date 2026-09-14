import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * Numbered legal clause. Prose styling for projected links, lists and emphasis is set on the
 * wrapper with descendant variants, so page templates stay free of repeated classes.
 */
@Component({
  selector: 'section[appLegalSection]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block border-t border-ink-900 pb-10 pt-6 md:grid md:grid-cols-9 md:gap-x-8' },
  template: `
    <h2
      class="font-headline text-3xl font-bold uppercase leading-none text-ink-900 md:col-span-3 md:text-4xl"
    >
      <span class="mb-2 block font-mono text-xs font-medium tracking-wider text-brand-700">{{ number() }}</span>
      {{ heading() }}
    </h2>
    <div
      class="mt-4 space-y-4 text-base leading-relaxed text-ink-900 md:col-span-6 md:mt-0 [&_a:hover]:text-ink-900 [&_a]:font-medium [&_a]:text-brand-700 [&_a]:underline [&_a]:underline-offset-4 [&_li]:border-b [&_li]:border-ink-200 [&_li]:py-3 [&_strong]:font-semibold [&_ul]:border-t [&_ul]:border-ink-200"
    >
      <ng-content />
    </div>
  `,
})
export class LegalSection {
  readonly number = input.required<string>();
  readonly heading = input.required<string>();
}
