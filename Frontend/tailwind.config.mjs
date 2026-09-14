import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        // Azul corporativo principal: acentos, CTAs y estados activos
        brand: {
          50: '#f1f7fc',
          100: '#dceaf5',
          200: '#b9d4eb',
          300: '#88b6db',
          400: '#5191c5',
          500: '#2e74ad',
          600: '#216394',
          700: '#1a5685',
          800: '#164870',
          900: '#143b5c',
          950: '#0c2540',
        },
        // Acento cálido (cobre/bronce) — usar muy puntualmente
        accent: {
          50: '#fbf6f1',
          100: '#f4e7d8',
          200: '#e8ceb1',
          300: '#d8ad81',
          400: '#c8956d',
          500: '#b67a4f',
          600: '#a66544',
          700: '#8a513a',
          800: '#704334',
          900: '#5c382e',
        },
        // Neutros técnicos: blanco, gris de plano y carbón para el 90 % de las superficies
        ink: {
          50: '#fafaf9',
          100: '#f4f3f1',
          200: '#e7e5e2',
          300: '#d2cfca',
          400: '#a8a39c',
          500: '#69645d',
          600: '#5a5650',
          700: '#3f3c37',
          800: '#262421',
          900: '#181715',
        },
      },
      fontFamily: {
        headline: ['"Barlow Condensed"', '"Arial Narrow"', 'sans-serif'],
        body: ['Barlow', 'Arial', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [forms],
};
