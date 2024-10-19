import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';

export default defineConfig({
  plugins: [
    laravel({
      input: [
        'resources/css/app.css',
        'resources/js/app.js',
        'resources/js/livros/livros.js',
        'resources/js/livros/ajaxForm.js',
        'resources/js/assuntos/assuntos.js',
        'resources/js/assuntos/ajaxForm.js',
        'resources/js/autores/autores.js',
        'resources/js/autores/ajaxForm.js'
      ],
      refresh: true,
    }),
  ],
});
