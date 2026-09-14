export interface Service {
  /** Anchor id on /nuestros-servicios. */
  id: string;
  name: string;
  description: string;
}

export const SERVICES: readonly Service[] = [
  {
    id: 'carpinteria-metalica',
    name: 'Carpintería metálica',
    description:
      'Fabricación de rejas, puertas, balcones, barandas y pérgolas. Estructuras de hierro, acero inoxidable y forja artística a medida para viviendas y negocios.',
  },
  {
    id: 'aluminio-pvc',
    name: 'Aluminio y PVC',
    description:
      'Fabricación de cierres, ventanas y puertas, con rotura de puente térmico para un mejor aislamiento.',
  },
  {
    id: 'cristaleria',
    name: 'Cristalería',
    description:
      'Instalación de vidrios, doble y triple acristalamiento, barandas, sistemas de seguridad antirrobo, divisiones de oficinas, techos, instalaciones comerciales y cortinas de cristal.',
  },
  {
    id: 'panel-composite',
    name: 'Panel composite',
    description:
      'Revestimiento de fachadas y decoración. Soluciones modernas y duraderas para transformar cualquier espacio.',
  },
  {
    id: 'ventanas-curvas',
    name: 'Ventanas curvas',
    description:
      'Curvamos perfiles de aluminio y hierro para fabricar ventanas curvas a medida e invernaderos.',
  },
  {
    id: 'motorizaciones',
    name: 'Motorizaciones',
    description:
      'Motorización para portones de cochera, puertas seccionales, puertas rápidas y persianas de seguridad.',
  },
  {
    id: 'muros-cortina',
    name: 'Muros cortina',
    description:
      'Fabricación e instalación de muros cortina, con vidrio o paneles. Amplia gama de colores y modelos.',
  },
];
