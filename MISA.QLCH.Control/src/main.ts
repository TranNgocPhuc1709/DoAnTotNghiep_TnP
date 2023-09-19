import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import i18n  from './resource'
import "@library-src/styles/qlch_styles/theme/DefaultTheme.scss";
import "@library-src/styles/qlch_styles/theme/DarkTheme.scss";
import "@library-src/styles/qlch_styles/Main.scss";
import "@library-src/styles/qlch_styles/Layout.scss";
import "@library-src/styles/qlch_styles/Icon.scss";

// Lưu ý: Tất cả cấu hình ở đây sẽ không có tác dụng đối với remote federation
 
createApp(App).use(router).use(i18n).mount('#app')
