import LocalizedStrings from 'react-localization'
import en from './languages/en.json'
import vi from './languages/vi.json'

const localizedStrings = new LocalizedStrings({
  default: en,
  en,
  vi,
})

export default localizedStrings
