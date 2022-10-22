import '!style-loader!css-loader!sass-loader!./storybook-styles.scss';
import '!style-loader!css-loader!sass-loader!../src/styles.scss';

import i18n from './i18next.js';

export const parameters = {
  options: {
    storySort: (a, b) =>
      a[1].kind === b[1].kind ? 0 : a[1].id.localeCompare(b[1].id, undefined, { numeric: true }),
  },
  locale: 'en',
  locales: {
    en: 'English',
    fr: 'Français',
    ja: '日本語',
  },
  i18n,
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}
