import {defineConfig} from 'vite';
import {resolve} from 'node:path';
export default defineConfig({build:{rollupOptions:{input:{main:resolve('index.html'),privacidad:resolve('privacidad/index.html'),avisoLegal:resolve('aviso-legal/index.html'),cookies:resolve('cookies/index.html')}}}});
