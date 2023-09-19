import { fileURLToPath, URL } from 'url';
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
// vite.config.js
import federation from "@originjs/vite-plugin-federation";



// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [
      federation({
        name: 'misa-qlch-web-support',
        remotes: {
          qlch_control: env.QLCH_Control_Url ?? "ERROR: QLCH Control Not Found!",
          qlch_base: env.QLCH_Base_Url ?? "ERROR: QLCH Control Not Found!",
        },
        shared: ['vue']
      }),
      vue()
    ],
    resolve: {
      alias: {
        '@src': fileURLToPath(new URL('./src', import.meta.url)),
        '@library-src': fileURLToPath(new URL('../common/MISA.QLCH.Library/src', import.meta.url)),
        '@store-src': fileURLToPath(new URL('../common/MISA.QLCH.CommonStores/src', import.meta.url)),
      },
    },
    envPrefix: "QLCH_",
    build: {
      target: 'esnext'
    }
  }
})
