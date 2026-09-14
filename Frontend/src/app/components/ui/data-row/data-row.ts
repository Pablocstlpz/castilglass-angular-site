import { booleanAttribute, ChangeDetectionStrategy, Component, input } from '@angular/core';

/** One term/value row of a technical data sheet. Use inside a <dl>; the value is projected. */
@Component({
  selector: 'div[appDataRow]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'grid gap-1 border-b py-3 sm:grid-cols-[10rem_1fr] sm:gap-6',
    '[class.border-ink-200]': '!inverse()',
    '[class.border-ink-700]': 'inverse()',
  },
  template: `
    <dt
      class="font-mono text-xs font-medium uppercase tracking-wider sm:pt-1"
      [class.text-ink-700]="!inverse()"
      [class.text-ink-300]="inverse()"
    >
      {{ term() }}
    </dt>
    <dd class="text-base" [class.text-ink-900]="!inverse()" [class.text-white]="inverse()">
      <ng-content />
    </dd>
  `,
})
export class DataRow {
  readonly term = input.required<string>();
  readonly inverse = input(false, { transform: booleanAttribute });
}
