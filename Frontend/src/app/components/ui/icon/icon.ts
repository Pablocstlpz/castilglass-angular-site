import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type IconName = 'arrow-right' | 'arrow-up-right' | 'phone' | 'menu' | 'close';

/** Inline stroke icons sized to the surrounding text: no icon-font request, square caps to match the UI. */
@Component({
  selector: 'app-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'inline-block size-[1.25em] shrink-0', 'aria-hidden': 'true' },
  template: `
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="square"
      class="size-full"
    >
      @switch (name()) {
        @case ('arrow-right') {
          <svg:path d="M3 12h17M14 6l6 6-6 6" />
        }
        @case ('arrow-up-right') {
          <svg:path d="M6 18L17 7M8 6h10v10" />
        }
        @case ('phone') {
          <svg:path
            d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2z"
          />
        }
        @case ('menu') {
          <svg:path d="M3 7h18M3 17h18" />
        }
        @case ('close') {
          <svg:path d="M5 5l14 14M19 5L5 19" />
        }
      }
    </svg>
  `,
})
export class Icon {
  readonly name = input.required<IconName>();
}
