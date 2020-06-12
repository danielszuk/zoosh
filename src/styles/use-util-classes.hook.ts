import { makeStyles } from '@material-ui/core/styles';
import { useCallback } from 'react';
import spaces from './spaces.const';
import fontSizes from './font-sizes.const';

const useClasses = makeStyles({
  // fonts
  textXs: {
    'font-size': `${fontSizes[0]}px`,
  },
  textLg: {
    'font-size': `${fontSizes[2]}px`,
  },

  // paddings
  pR2: {
    paddingRight: `${spaces[1]}px`,
  },
  pY4: {
    paddingTop: `${spaces[3]}px`,
    paddingBottom: `${spaces[3]}px`,
  },

  // margins
  m4: {
    margin: `${spaces[3]}px`,
  },
  mB4: {
    marginBottom: `${spaces[3]}px`,
  },
  'first:mT0': {
    '&:first-child': {
      'margin-top': 0,
    },
  },
  // flex
  flex: {
    display: 'flex',
  },
  itemsCenter: {
    alignItems: 'center',
  },
  contentCenter: {
    justifyContent: 'center',
  },
});

export default function useUtilClasses() {
  const classes = useClasses();

  return useCallback(
    (keys: Array<keyof typeof classes>) => {
      return keys.map((key) => classes[key]).join(' ');
    },
    [classes]
  );
}
