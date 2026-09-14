import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { COMPANY } from '../../data/company';
import { SERVICES } from '../../data/services';
import { ContactFormService, FormNotConfiguredError } from '../../services/contact-form.service';
import { Button } from '../ui/button/button';
import { Field } from '../ui/field/field';
import { FormStatus } from '../ui/form-status/form-status';
import { Icon } from '../ui/icon/icon';

@Component({
  selector: 'app-solicitar-presupuesto',
  imports: [RouterLink, Button, Field, FormStatus, Icon],
  templateUrl: './solicitar-presupuesto.html',
})
export class SolicitarPresupuesto {
  readonly status = signal<'idle' | 'sending' | 'success' | 'error' | 'not_configured'>('idle');

  protected readonly company = COMPANY;
  protected readonly projectTypes = [...SERVICES.map((service) => service.name), 'Otros'];

  protected readonly reasons = [
    {
      title: '50+ años',
      text: 'Tercera generación de una empresa familiar con más de 50 años de experiencia en Córdoba.',
    },
    { title: 'Fabricación propia', text: 'Fabricamos a medida en nuestro taller de Córdoba, sin intermediarios.' },
    {
      title: 'Asesoría experta',
      text: 'Te orientamos en la elección de los materiales más adecuados para tu obra, con marcas de primera calidad.',
    },
  ];

  constructor(private readonly contactForm: ContactFormService) {}

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
      await this.contactForm.submit(new FormData(form), 'Nueva solicitud de presupuesto - castilglass.es');
      this.status.set('success');
      form.reset();
    } catch (err) {
      if (err instanceof FormNotConfiguredError) {
        this.status.set('not_configured');
      } else {
        this.status.set('error');
      }
    }
  }
}
