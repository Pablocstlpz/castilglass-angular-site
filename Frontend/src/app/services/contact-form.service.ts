import { Injectable } from '@angular/core';

// Web3Forms (plan gratuito): consigue la clave en https://web3forms.com con el email que recibirá los mensajes.
// La clave es pública por diseño: solo permite enviar a ese email.
const WEB3FORMS_ACCESS_KEY = '';

export class FormNotConfiguredError extends Error {}

@Injectable({ providedIn: 'root' })
export class ContactFormService {
  async submit(formData: FormData, subject: string): Promise<void> {
    if (!WEB3FORMS_ACCESS_KEY) {
      throw new FormNotConfiguredError(
        'Formulario no configurado. Rellena WEB3FORMS_ACCESS_KEY en src/app/services/contact-form.service.ts',
      );
    }

    formData.delete('_gotcha');
    formData.set('access_key', WEB3FORMS_ACCESS_KEY);
    formData.set('subject', subject);
    formData.set('from_name', 'Web castilglass.es');

    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: formData,
    });
    const result = await response.json().catch(() => null);

    if (!response.ok || !result?.success) {
      throw new Error(`Error enviando formulario (status ${response.status})`);
    }
  }
}
