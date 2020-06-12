import { useCallback, useContext } from 'react';
import LanguageContext from '../contexts/language.context.s';
import Texts from '../models/texts/texts.interface';
import texts from '../models/texts/texts.const';

export default function useText() {
  const language = useContext(LanguageContext);

  return useCallback((key: keyof Texts) => texts[language][key], [language]);
}
