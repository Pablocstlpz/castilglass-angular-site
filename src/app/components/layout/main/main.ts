import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormspreeService } from '../../../services/formspree.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './main.html',
  styleUrl: './main.css',
})
export class Main {
  readonly contactStatus = signal<'idle' | 'sending' | 'success' | 'error' | 'not_configured'>('idle');

  constructor(private readonly formspree: FormspreeService) {}

  async onSubmitContacto(event: SubmitEvent): Promise<void> {
    event.preventDefault();

    const form = event.target as HTMLFormElement | null;
    if (!form) return;

    // Honeypot: si lo rellenan, ignoramos silenciosamente.
    const botField = new FormData(form).get('_gotcha');
    if (typeof botField === 'string' && botField.trim().length > 0) {
      this.contactStatus.set('success');
      form.reset();
      return;
    }

    this.contactStatus.set('sending');

    try {
      await this.formspree.submit(new FormData(form));
      this.contactStatus.set('success');
      form.reset();
    } catch (err) {
      if (String(err).includes('Formspree no está configurado')) {
        this.contactStatus.set('not_configured');
      } else {
        this.contactStatus.set('error');
      }
    }
  }
}
