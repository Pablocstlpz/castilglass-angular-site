import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  numberAttribute,
} from '@angular/core';

export type FieldType = 'text' | 'email' | 'tel' | 'textarea' | 'select';

/**
 * Label + native control. Controls stay plain DOM elements inside the host <form>,
 * so the existing FormData-based submit handlers keep working unchanged.
 */
@Component({
  selector: 'app-field',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
  template: `
    <label
      [attr.for]="id()"
      class="flex items-baseline justify-between gap-4 pb-2 font-mono text-xs font-medium uppercase tracking-wider text-ink-900"
    >
      <span>
        {{ label() }}
        @if (required()) {
          <span class="text-brand-700" aria-hidden="true">*</span>
        }
      </span>
      @if (optional()) {
        <span class="normal-case tracking-normal text-ink-700">Opcional</span>
      }
    </label>
    @switch (type()) {
      @case ('textarea') {
        <textarea
          [id]="id()"
          [name]="name()"
          [rows]="rows()"
          [required]="required()"
          [attr.placeholder]="placeholder()"
          [attr.autocomplete]="autocomplete()"
          [class]="controlClass + ' resize-y'"
        ></textarea>
      }
      @case ('select') {
        <select [id]="id()" [name]="name()" [required]="required()" [class]="controlClass + ' pr-10'">
          @for (option of options(); track option) {
            <option>{{ option }}</option>
          }
        </select>
      }
      @default {
        <input
          [id]="id()"
          [name]="name()"
          [type]="type()"
          [required]="required()"
          [attr.placeholder]="placeholder()"
          [attr.autocomplete]="autocomplete()"
          [class]="controlClass"
        />
      }
    }
  `,
})
export class Field {
  readonly label = input.required<string>();
  readonly name = input.required<string>();
  readonly type = input<FieldType>('text');
  readonly required = input(false, { transform: booleanAttribute });
  readonly optional = input(false, { transform: booleanAttribute });
  readonly autocomplete = input<string>();
  readonly placeholder = input<string>();
  readonly rows = input(5, { transform: numberAttribute });
  readonly options = input<readonly string[]>([]);

  protected readonly id = computed(() => `campo-${this.name()}`);
  protected readonly controlClass =
    'block min-h-12 w-full rounded-none border border-ink-500 bg-white px-3 py-3 text-base text-ink-900 placeholder:text-ink-500 transition-colors duration-150 ease-out hover:border-ink-900 focus:border-ink-900 focus:ring-0';
}
