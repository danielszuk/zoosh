import { makeStyles } from '@material-ui/core/styles';
import { useCallback } from 'react';
import spaces from './spaces.const';

const useClasses = makeStyles({
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
  // paddings
  pY3: {
    paddingTop: `${spaces[2]}px`,
    paddingBottom: `${spaces[2]}px`,
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
