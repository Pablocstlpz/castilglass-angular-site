import { booleanAttribute, ChangeDetectionStrategy, Component, input } from '@angular/core';

/** Technical label + condensed section title. Extra copy or actions are projected below. */
@Component({
  selector: 'app-section-heading',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
  template: `
    <p
      class="font-mono text-xs font-medium uppercase tracking-wider"
      [class.text-ink-300]="inverse()"
      [class.text-ink-700]="!inverse()"
    >
      {{ kicker() }}
    </p>
    <h2
      class="mt-3 text-balance font-headline text-4xl font-bold uppercase leading-[0.95] sm:text-5xl lg:text-6xl"
      [class.text-white]="inverse()"
      [class.text-ink-900]="!inverse()"
    >
      {{ heading() }}
    </h2>
    <ng-content />
  `,
})
export class SectionHeading {
  readonly kicker = input.required<string>();
  readonly heading = input.required<string>();
  readonly inverse = input(false, { transform: booleanAttribute });
}
