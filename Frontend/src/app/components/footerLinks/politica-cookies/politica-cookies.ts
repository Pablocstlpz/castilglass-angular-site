import { Component } from '@angular/core';
import { DataRow } from '../../ui/data-row/data-row';
import { LegalIndexItem, LegalPage } from '../../ui/legal-page/legal-page';
import { LegalSection } from '../../ui/legal-section/legal-section';

@Component({
  selector: 'app-politica-cookies',
  imports: [DataRow, LegalPage, LegalSection],
  templateUrl: './politica-cookies.html',
})
export class PoliticaCookies {
  protected readonly index: LegalIndexItem[] = [
    { id: 'objeto', label: 'Objeto' },
    { id: 'definicion', label: '¿Qué son las cookies?' },
    { id: 'terceros', label: 'Cookies de terceros' },
    { id: 'gestion', label: 'Cómo rechazar' },
    { id: 'actualizaciones', label: 'Actualizaciones' },
  ];

  protected readonly browsers = [
    { name: 'Chrome', href: 'https://support.google.com/chrome/answer/95647' },
    {
      name: 'Firefox',
      href: 'https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias',
    },
    { name: 'Safari', href: 'https://support.apple.com/es-es/guide/safari/sfri11471/mac' },
    { name: 'Edge', href: 'https://support.microsoft.com/es-es/microsoft-edge' },
    { name: 'Opera', href: 'https://help.opera.com/es/latest/web-preferences/' },
  ];
}
