import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { COMPANY } from '../../../data/company';

export type FormStatusValue = 'idle' | 'sending' | 'success' | 'error' | 'not_configured';

/** Always-present live region, so screen readers announce the submit result. */
@Component({
  selector: 'app-form-status',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { role: 'status', class: 'block' },
  template: `
    @switch (status()) {
      @case ('success') {
        <p class="border-l-4 border-brand-700 bg-ink-100 px-4 py-3 text-base font-medium text-ink-900">
          {{ successMessage() }}
        </p>
      }
      @case ('error') {
        <p class="border-l-4 border-red-700 bg-ink-100 px-4 py-3 text-base font-medium text-ink-900">
          No se pudo enviar. Inténtalo de nuevo en unos minutos.
        </p>
      }
      @case ('not_configured') {
        <p class="border-l-4 border-red-700 bg-ink-100 px-4 py-3 text-base font-medium text-ink-900">
          El formulario no está disponible ahora mismo. Llámanos al {{ company.phone }} o escríbenos por
          WhatsApp.
        </p>
      }
    }
  `,
})
export class FormStatus {
  readonly status = input.required<FormStatusValue>();
  readonly successMessage = input.required<string>();

  protected readonly company = COMPANY;
}
