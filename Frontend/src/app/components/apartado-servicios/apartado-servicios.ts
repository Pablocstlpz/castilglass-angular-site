import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { COMPANY } from '../../data/company';
import { SERVICES } from '../../data/services';
import { Button } from '../ui/button/button';
import { Icon } from '../ui/icon/icon';
import { PadPipe } from '../ui/pad.pipe';
import { SectionHeading } from '../ui/section-heading/section-heading';

@Component({
  selector: 'app-apartado-servicios',
  imports: [RouterLink, Button, Icon, PadPipe, SectionHeading],
  templateUrl: './apartado-servicios.html',
})
export class ApartadoServicios {
  protected readonly company = COMPANY;
  protected readonly services = SERVICES;

  protected readonly process = [
    {
      title: 'Asesoramiento',
      text: 'Consultoría técnica para definir la mejor solución según el proyecto arquitectónico.',
    },
    { title: 'Medición', text: 'Toma de datos digital con precisión milimétrica en obra para un ajuste perfecto.' },
    { title: 'Fabricación', text: 'Fabricación propia a medida en nuestro taller de Córdoba.' },
    {
      title: 'Instalación',
      text: 'Montaje especializado por técnicos cualificados asegurando estanqueidad y acabado.',
    },
  ];

  protected readonly materials = [
    'Vidrios laminados y de control solar',
    'Perfiles de aluminio y PVC',
    'Amplia gama de colores y modelos',
  ];

  protected readonly gallery = [
    {
      caption: 'Perfiles',
      alt: 'Perfiles de aluminio cepillado',
      src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCPoEek8cIcugQOxBRDoq3ELIjplT7OZmlzC-Q53y92qmniPtYf_ForaEVnwL0gWkZEBUUFdInHzai8HaxYrs24b2Up4TmZ0eHDWakKKyfNhDAmZ7rStm7sMFHs_wAk44WZiGpjx4rGKUkGGziUtw_iTMGgxMNn7JWD2Wu29xHyohD2LQ8n1UDx8uqgvtcpRjiQBRWbXCSnidLiR3Hz8uFsP7IFbnAtz26_8IGl3ksIHn2s5jAOoVwu80X9kc9hfh5oBs1mzUFMuwU',
    },
    {
      caption: 'Cristales',
      alt: 'Cantos de vidrio templado',
      src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBeD8-7EV6WX4nlbTyhBwTrxyGToeg6ujXh1bZo17GffO0U0OzqmkgWEsLqmstM6hCYYKKbF0SmKjoIfrCsjaVDvZumuCgT0Xv5kzsNpagqVlUD97Kqm7qyJUU3M_M5hx0Ps-SG5MHgMUBtpXiLpv4APJctal4q3dqz0E9oaVyPsLU9RqNxkp4w7dWrzHJySoZ33s8H41sg1RFTNA-dp9Y_-OewjtwEzWIMStWvLF9nmS4IVd1EdRT933JH-g5Qxc7knvUK1O4J-rk',
    },
    {
      caption: 'Herrajes',
      alt: 'Herrajes en acero inoxidable',
      src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAo31IudZChC_u5xE6s8J7anIJSoStDHNrNofdqAJmLsLB0qcbvnZmvsTaGo1ouVJB9QqH_EDxc1yjHOApQzFvCVOpD3Cmz1889Qf9YwPO7a7N1L8rJ0I33L08BsbG5rErZHxjuS7apvnqCGhsQGDWF-ijPxbZU4xIRkdHYfl-wYBD1fz9Ba1MwAC1SrH2kYWB0u6Y5u97pDEaQ9oKybEHm_zc1nd-NMz15Dfgj5ueAjx3hl9S9xriH3fOgzmL1abeemEapWuqDXzY',
    },
    {
      caption: 'Acabados composite',
      alt: 'Acabados composite antracita',
      src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBGLNcAA3sqlZXLaydENaeoEPDA2vbbSdDkX_cTgjcJbj__evDcwwB7moRifhVUNTja0ptVqIdvmHg4brQiO_hnbNWI_lJ82-paBXC5PrsTPrHETZXhgO5kmP0e01S-I9jiHalGw5zglwrhJQ8vqZfgO5ubSSFC9kThTOusnIhzU2UZcdfyHyXw4xwFRcxtwzDheVl-n1bwjOxjcFznDDnI2rddEtiDQuNTUHyOWYLnmPzTmU_EjTqX26KQsRvu23gKGQceJNHQciM',
    },
  ];
}
