import Languages from '../languages.enum';
import textsEn from './texts-en.const';
import Texts from './texts.interface';

const texts: {
  [Key in Languages]: Texts;
} = {
  [Languages.en]: textsEn,
};

export default texts;
