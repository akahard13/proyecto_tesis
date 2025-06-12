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
                    yellow: '#F6CB3F',
                    fondo: '#181818',
                },
            },
        },
    },

    plugins: [forms],
};
