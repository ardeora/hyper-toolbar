export type ThemeType = 'light' | 'dark';

export type AlphaType = '100' | '90' | '80' | '70' | '60' | '50' | '40' | '30' | '20' | '10' | '0';
export type FontSizesType = 'xs' | 'sm' | 'md' | 'lg';

export interface ThemeConfig {
  colors: {
    main: string;
    primary: string;
    secondary: string;
    tertiary: string;
    green: string;
    red: string;
    yellow: string;
    black: string;
    white: string;
    slate: string;
  };
}

export interface Theme {
  dark: ThemeConfig;
  light: ThemeConfig;
  common: {
    alpha: {
      [key in AlphaType]: string;
    };
    font: {
      [key in FontSizesType]: string;
    };
  };
}
