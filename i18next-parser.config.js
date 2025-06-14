// const CustomerLexer = require('./src/plugins/i18nextParser/lexers/customer-lexer')
import CustomerLexer from './src/plugins/i18nextParser/lexers/customer-lexer.js'

export default {
  // contextSeparator: '.',
  defaultNamespace: 'common',

  indentation: 4,
  keepRemoved: false,

  lexers: {
    /* js: [
      {
        lexer: 'JavascriptLexer',
        // functions: ['i18next.t', 'i18next.$t', '$t'],
      }
    ] */
    vue: [
      {
        lexer: CustomerLexer,
        functions: ['t', '$t']
      }
    ],

    default: [CustomerLexer]
  },

  locales: ['en-US', 'de-DE', 'es-ES', 'fr-FR', 'it-IT', 'pl-PL', 'pt-BR', 'ja-JP', 'ru-RU', 'zh-CN', 'ko-KR'],

  output: 'public/localization/locales/$LOCALE/$NAMESPACE.json',

  sort: true
}
