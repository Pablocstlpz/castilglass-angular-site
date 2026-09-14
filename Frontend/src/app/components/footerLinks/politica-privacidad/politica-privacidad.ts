import { Component } from '@angular/core';
import { COMPANY } from '../../../data/company';
import { DataRow } from '../../ui/data-row/data-row';
import { LegalIndexItem, LegalPage } from '../../ui/legal-page/legal-page';
import { LegalSection } from '../../ui/legal-section/legal-section';

@Component({
  selector: 'app-politica-privacidad',
  imports: [DataRow, LegalPage, LegalSection],
  templateUrl: './politica-privacidad.html',
})
export class PoliticaPrivacidad {
  protected readonly company = COMPANY;

  protected readonly index: LegalIndexItem[] = [
    { id: 'responsable', label: 'Responsable' },
    { id: 'datos', label: 'Datos recopilados' },
    { id: 'finalidad', label: 'Finalidad' },
    { id: 'base', label: 'Base jurídica' },
    { id: 'conservacion', label: 'Conservación' },
    { id: 'destinatarios', label: 'Destinatarios' },
    { id: 'derechos', label: 'Sus derechos' },
    { id: 'seguridad', label: 'Seguridad' },
  ];

  protected readonly rights = [
    { name: 'Acceso', text: 'Saber qué datos tratamos sobre usted.' },
    { name: 'Rectificación', text: 'Corregir datos inexactos.' },
    { name: 'Supresión', text: 'Solicitar la eliminación.' },
    { name: 'Oposición', text: 'Oponerse al tratamiento.' },
    { name: 'Portabilidad', text: 'Recibir datos en formato digital.' },
    { name: 'Limitación', text: 'Restringir el tratamiento.' },
  ];
}
