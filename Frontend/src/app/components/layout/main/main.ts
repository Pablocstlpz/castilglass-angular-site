import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { COMPANY } from '../../../data/company';
import { SERVICES } from '../../../data/services';
import { ContactFormService, FormNotConfiguredError } from '../../../services/contact-form.service';
import { Button } from '../../ui/button/button';
import { DataRow } from '../../ui/data-row/data-row';
import { Field } from '../../ui/field/field';
import { FormStatus } from '../../ui/form-status/form-status';
import { Icon } from '../../ui/icon/icon';
import { PadPipe } from '../../ui/pad.pipe';
import { SectionHeading } from '../../ui/section-heading/section-heading';

@Component({
  selector: 'app-main',
  imports: [RouterLink, Button, DataRow, Field, FormStatus, Icon, PadPipe, SectionHeading],
  templateUrl: './main.html',
})
export class Main {
  readonly contactStatus = signal<'idle' | 'sending' | 'success' | 'error' | 'not_configured'>('idle');

  protected readonly company = COMPANY;
  protected readonly services = SERVICES;

  /** The five trades a visitor must recognise at a glance, each linked to its catalogue entry. */
  protected readonly pillars = [
    { name: 'Carpintería metálica', serviceId: 'carpinteria-metalica' },
    { name: 'Aluminio', serviceId: 'aluminio-pvc' },
    { name: 'PVC', serviceId: 'aluminio-pvc' },
    { name: 'Hierro', serviceId: 'carpinteria-metalica' },
    { name: 'Cristalería', serviceId: 'cristaleria' },
  ];

  protected readonly steps = [
    {
      title: 'Asesoramiento técnico directo',
      text: 'No somos comerciales, somos técnicos. Te orientamos sobre qué perfilería y vidrio se ajusta mejor a tu presupuesto.',
    },
    {
      title: 'Fabricación propia a medida',
      text: 'Fabricamos a medida en nuestro propio taller de Córdoba para garantizar un ajuste perfecto.',
    },
    {
      title: 'Montaje de precisión',
      text: 'Nuestro propio equipo de montaje asegura que el rendimiento térmico prometido sea el real.',
    },
  ];

  protected readonly benefits = [
    { title: 'Máxima seguridad', text: 'Cerramientos reforzados y vidrios de seguridad para tu tranquilidad.' },
    {
      title: 'Aislamiento eficiente',
      text: 'Rotura de puente térmico y doble o triple acristalamiento para máximo ahorro energético y confort.',
    },
    {
      title: 'Acabados modernos',
      text: 'Estética minimalista con perfiles ocultos y una amplia gama de texturas industriales.',
    },
    {
      title: 'Instalación experta',
      text: 'Montaje realizado por personal propio altamente cualificado para un ajuste perfecto.',
    },
  ];

  protected readonly figures = [
    { value: '50+', label: 'Años de experiencia' },
    { value: '3ª', label: 'Generación familiar' },
    { value: '100%', label: 'Fabricación a medida' },
    { value: '1.500+', label: 'Proyectos entregados' },
  ];

  protected readonly projectTypes = ['Vivienda unifamiliar', 'Local comercial', 'Mantenimiento industrial', 'Otros'];

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
