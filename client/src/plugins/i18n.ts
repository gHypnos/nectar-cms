import Vue from 'vue';
import VueI18n from 'vue-i18n';
import { Config } from '../../config';
import messages from '../translations';

Vue.use(VueI18n);
export const i18n = new VueI18n({
  locale: Config.language,
  fallbackLocale: 'en',
  messages
});
