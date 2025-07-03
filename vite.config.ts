import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

//https://alekseikutukov.github.io/NeoflexProject/
export default defineConfig({
  plugins: [react()],
  base: '/NeoflexProject/',
});
