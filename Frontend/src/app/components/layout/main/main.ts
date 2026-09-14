import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContactFormService, FormNotConfiguredError } from '../../../services/contact-form.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './main.html',
  styleUrl: './main.css',
})
export class Main {
  readonly contactStatus = signal<'idle' | 'sending' | 'success' | 'error' | 'not_configured'>('idle');

  constructor(private readonly contactForm: ContactFormService) {}

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
      await this.contactForm.submit(new FormData(form), 'Nuevo mensaje de contacto - castilglass.es');
      this.contactStatus.set('success');
      form.reset();
    } catch (err) {
      if (err instanceof FormNotConfiguredError) {
        this.contactStatus.set('not_configured');
      } else {
        this.contactStatus.set('error');
      }
    }
  }
}
