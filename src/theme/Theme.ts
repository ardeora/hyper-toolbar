import { Theme } from 'types/toolbar';

export const theme: Theme = {
  dark: {
    colors: {
      main: '#00000033',
      primary: '#e2e8f0',
      secondary: '#cbd5e1',
      tertiary: '#475569',
      green: '#30D158',
      red: '#FF453A',
      yellow: '#FFD60A',
      black: '#000000',
      white: '#ffffff',
      slate: '#94a3b8',
    },
  },
  light: {
    colors: {
      black: '#000000',
      white: '#ffffff',
      main: '#ffffff80',
      primary: '#1e293b',
      secondary: '#334155',
      tertiary: '#64748b',
      green: '#34C759',
      red: '#FF3B30',
      yellow: '#FFCC00',
      slate: '#cbd5e1',
    },
  },
  common: {
    alpha: {
      100: 'ff',
      90: 'e5',
      80: 'cc',
      70: 'b3',
      60: '99',
      50: '80',
      40: '66',
      30: '4d',
      20: '33',
      10: '1a',
      0: '00',
    },
    font: {
      xs: '10px',
      sm: '12px',
      md: '14px',
      lg: '16px',
    },
  },
};
