import { Injectable } from '@angular/core';

const FORMSPREE_FORM_ID = '';

function getFormspreeEndpoint(): string {
  if (!FORMSPREE_FORM_ID) {
    throw new Error(
      'Formspree no está configurado. Rellena FORMSPREE_FORM_ID en src/app/services/formspree.service.ts',
    );
  }

  return `https://formspree.io/f/${FORMSPREE_FORM_ID}`;
}

@Injectable({ providedIn: 'root' })
export class FormspreeService {
  async submit(formData: FormData): Promise<void> {
    const endpoint = getFormspreeEndpoint();

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Error enviando formulario (status ${response.status})`);
    }
  }
}

