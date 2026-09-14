import { booleanAttribute, ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/** `*-dark` variants sit on carbon surfaces; `light` sits on the brand-blue band. */
export type ButtonVariant = 'primary' | 'primary-dark' | 'outline' | 'outline-dark' | 'light';

const BASE =
  'inline-flex min-h-14 items-center justify-between gap-6 px-5 font-headline text-lg font-semibold uppercase tracking-wide transition-colors duration-150 ease-out disabled:pointer-events-none disabled:opacity-60';

const VARIANTS: Record<ButtonVariant, string> = {
  primary: 'bg-brand-700 text-white hover:bg-ink-900',
  'primary-dark': 'bg-brand-700 text-white hover:bg-white hover:text-ink-900',
  outline: 'border-2 border-ink-900 text-ink-900 hover:bg-ink-900 hover:text-white',
  'outline-dark': 'border-2 border-white text-white hover:bg-white hover:text-ink-900',
  light: 'bg-white text-ink-900 hover:bg-ink-900 hover:text-white',
};

/** Solid block CTA applied to a native <a> or <button>, so routerLink, href and form semantics stay native. */
@Component({
  selector: 'a[appButton], button[appButton]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class]': 'classes()' },
  template: '<ng-content />',
})
export class Button {
  readonly variant = input<ButtonVariant>('primary');
  /** Full width at every breakpoint; by default buttons shrink to content from `sm` up. */
  readonly block = input(false, { transform: booleanAttribute });

  protected readonly classes = computed(
    () => `${BASE} ${VARIANTS[this.variant()]} ${this.block() ? 'w-full' : 'w-full sm:w-auto'}`,
  );
}
