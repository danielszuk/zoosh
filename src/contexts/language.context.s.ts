import React from 'react';
import Languages from '../models/languages.enum';

const LanguageContext = React.createContext<Languages>(Languages.en);
export default LanguageContext;
