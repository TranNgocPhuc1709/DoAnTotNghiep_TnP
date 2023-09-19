import { createApp } from 'vue';
import router from './router';
import App from './App.vue';
import store from './stores';
import "@library-src/styles/qlch_styles/theme/DefaultTheme.scss";
import "@library-src/styles/qlch_styles/theme/DarkTheme.scss";
import "@library-src/styles/qlch_styles/Main.scss";
import "@library-src/styles/qlch_styles/Layout.scss";
import "@library-src/styles/qlch_styles/Icon.scss";
import { ClickOutEvent, MouseUpOutEvent } from "@library-src/utilities/commons/Event";

const app = createApp(App);
app.directive('clickOut', ClickOutEvent);
app.directive('mouseUpOut', MouseUpOutEvent);
app.use(router);
app.use(store);
app.mount('#app');
