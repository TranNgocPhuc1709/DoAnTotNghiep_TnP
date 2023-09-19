import enUS from './en-US';
import viVN from './vi-VN';
import { createI18n} from 'vue-i18n'

export default createI18n ({
  locale: 'vi-VN',
  fallbackLocale: 'en-US', // set fallback locale
  messages: {
    'en-US': enUS,
    'vi-VN':viVN
  }
});
