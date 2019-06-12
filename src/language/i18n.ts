import * as RNLocalize from 'react-native-localize'
import i18next from 'i18next'
import * as en from './locale/en.json'
import * as de from './locale/de.json'

const bestLang = getBestLang()

i18next.init({
  lng: getBestLang(),
  debug: true,
  resources: {
    en: { translation: en },
    de: { translation: de },
  },
})

function getBestLang() {
  const bestLang = RNLocalize.findBestAvailableLanguage([
    'en', 'de',
  ])
  return bestLang && bestLang.languageTag || 'en'
}

RNLocalize.addEventListener('change', () => {
  i18next.changeLanguage(getBestLang())
})

export const i18n = i18next
