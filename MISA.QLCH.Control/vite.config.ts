import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import federation from "@originjs/vite-plugin-federation";
import { fileURLToPath, URL } from 'url';

export default defineConfig(({ command, mode }) => {
  // const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [
      vue(),
      federation({
        name: 'remote-app',
        filename: 'qlch-control.js',
        exposes: {
          './EButton': './src/components/qlch_button/EButton.vue',
          './ECheckbox': './src/components/qlch_checkbox/ECheckbox.vue',
          './ECombobox': './src/components/qlch_combobox/ECombobox.vue',
          './EDate': './src/components/qlch_date/EDate.vue',
          './EDropDownMenu': './src/components/qlch_date/EDate.vue',
          './EGrid': './src/components/qlch_grid/EGrid.vue',
          './ENumber': './src/components/qlch_number/ENumber.vue',
          './ETextBox': './src/components/qlch_text_box/ETextBox.vue',
          './EPopup':'./src/components/qlch_popup/EPopup.vue',
          './ENotification':'./src/components/qlch_notification/ENotification.vue',
          './MisaCopyright':'./src/components/misa_copyright/MisaCopyright.vue'
        },
        shared: ['vue']
      })
    ],
    resolve: {
      alias: {
        '@src': fileURLToPath(new URL('./src', import.meta.url)),
        '@library-src': fileURLToPath(new URL('../common/MISA.QLCH.Library/src', import.meta.url))
      }
    },
    envPrefix: "QLCH_",
    build: {
      target: 'esnext'
    }
  }
})

