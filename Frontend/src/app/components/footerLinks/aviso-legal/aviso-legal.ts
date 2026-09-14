import { Component } from '@angular/core';
import { COMPANY } from '../../../data/company';
import { DataRow } from '../../ui/data-row/data-row';
import { LegalIndexItem, LegalPage } from '../../ui/legal-page/legal-page';
import { LegalSection } from '../../ui/legal-section/legal-section';

@Component({
  selector: 'app-aviso-legal',
  imports: [DataRow, LegalPage, LegalSection],
  templateUrl: './aviso-legal.html',
})
export class AvisoLegal {
  protected readonly company = COMPANY;

  protected readonly index: LegalIndexItem[] = [
    { id: 'titular', label: 'Identificación del titular' },
    { id: 'acceso', label: 'Condiciones de acceso' },
    { id: 'propiedad', label: 'Propiedad intelectual' },
    { id: 'responsabilidad', label: 'Limitación de responsabilidad' },
    { id: 'documento', label: 'Datos del documento' },
  ];
}
