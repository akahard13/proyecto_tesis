import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                factor: {
                    red: '#A4161A',      // rojo oscuro
                    dark: '#121212',     // casi negro
                    gray: '#3A3A3A',     // gris neutro
                    light: '#F5F5F5',    // fondo claro
                    accent: '#F77F00',   // acento naranja
                    white: '#FFFFFF',    // blanco puro
                    yellow: {
                        100: '#FFF8E1',
                        200: '#FDECB2',
                        300: '#FCD972',
                        400: '#FBD249',
                        500: '#F6CB3F', // base
                        600: '#D5AC2F',
                        700: '#B88E23',
                        800: '#99731D',
                        900: '#7C5B17',
                        950: '#4A350C',
                    },
                    primary: '#334155',
                    secundary: '#cbd5e1',
                },
            },
        },
    },

    plugins: [forms],
};
