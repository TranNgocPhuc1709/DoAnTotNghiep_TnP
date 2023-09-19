import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import "@library-src/styles/qlch_styles/theme/DefaultTheme.scss";
import "@library-src/styles/qlch_styles/theme/DarkTheme.scss";
import "@library-src/styles/qlch_styles/Main.scss";
import "@library-src/styles/qlch_styles/Layout.scss";
import "@library-src/styles/qlch_styles/Icon.scss";
createApp(App).use(router).mount('#app')
