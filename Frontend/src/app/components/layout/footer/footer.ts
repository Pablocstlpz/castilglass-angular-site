import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { COMPANY } from '../../../data/company';
import { Icon } from '../../ui/icon/icon';

@Component({
  selector: 'app-footer',
  imports: [RouterLink, Icon],
  templateUrl: './footer.html',
})
export class Footer {
  protected readonly company = COMPANY;

  protected readonly contactLinks = [
    { label: COMPANY.phone, href: COMPANY.phoneHref, external: false },
    { label: 'WhatsApp', href: COMPANY.whatsappHref, external: true },
    { label: COMPANY.email, href: COMPANY.emailHref, external: false },
  ];

  protected readonly legalLinks = [
    { label: 'Aviso legal', path: '/aviso-legal' },
    { label: 'Política de privacidad', path: '/politica-privacidad' },
    { label: 'Política de cookies', path: '/politica-cookies' },
  ];
}
