import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormspreeService } from '../../services/formspree.service';

@Component({
  selector: 'app-solicitar-presupuesto',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './solicitar-presupuesto.html',
  styleUrl: './solicitar-presupuesto.css',
})
export class SolicitarPresupuesto {
  readonly status = signal<'idle' | 'sending' | 'success' | 'error' | 'not_configured'>('idle');

  constructor(private readonly formspree: FormspreeService) {}

  async onSubmitPresupuesto(event: SubmitEvent): Promise<void> {
    event.preventDefault();

    const form = event.target as HTMLFormElement | null;
    if (!form) return;

    const botField = new FormData(form).get('_gotcha');
    if (typeof botField === 'string' && botField.trim().length > 0) {
      this.status.set('success');
      form.reset();
      return;
    }

    this.status.set('sending');

    try {
      await this.formspree.submit(new FormData(form));
      this.status.set('success');
      form.reset();
    } catch (err) {
      if (String(err).includes('Formspree no está configurado')) {
        this.status.set('not_configured');
      } else {
        this.status.set('error');
      }
    }
  }
}
