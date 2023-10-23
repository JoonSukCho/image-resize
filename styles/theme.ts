import { CustomTheme } from './Theme.types';

const theme: CustomTheme = {
  color: {
    primary: '#5E48EC',
    secondary: '#344767',
    third: '#212229',
    warning: '#ff2c2c',
    textPrimary: '#3b3b3b',
  },
  breakpoints: {
    xs: '@media (max-width: 0px)',
    sm: '@media (max-width: 600px)',
    md: '@media (max-width: 900px)',
    lg: '@media (max-width: 1200px)',
    xl: '@media (max-width: 1536px)',
  },
};

export default theme;
