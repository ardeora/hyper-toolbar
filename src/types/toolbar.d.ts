export type ThemeType = 'light' | 'dark';

export type AlphaType = '100' | '90' | '80' | '70' | '60' | '50' | '40' | '30' | '20' | '10' | '0';
export type FontSizesType = 'xs' | 'sm' | 'md' | 'lg';
export type colorFlavors = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

export type ColorGroup = {
  [key in colorFlavors]: string;
};

interface Colors {
  inherit: string;
  current: string;
  transparent: string;
  black: string;
  white: string;
  slate: ColorGroup;
  gray: ColorGroup;
  zinc: ColorGroup;
  neutral: ColorGroup;
  stone: ColorGroup;
  red: ColorGroup;
  orange: ColorGroup;
  amber: ColorGroup;
  yellow: ColorGroup;
  lime: ColorGroup;
  green: ColorGroup;
  emerald: ColorGroup;
  teal: ColorGroup;
  cyan: ColorGroup;
  sky: ColorGroup;
  blue: ColorGroup;
  indigo: ColorGroup;
  violet: ColorGroup;
  purple: ColorGroup;
  fuchsia: ColorGroup;
  pink: ColorGroup;
  rose: ColorGroup;
}

export interface Theme {
  colors: Colors;
  alpha: {
    [key in AlphaType]: string;
  };
  font: {
    [key in FontSizesType]: string;
  };
}

export type PluginType = 'battery' | 'time' | 'systeminfo';

export interface PluginConfig {
  name: PluginType;
}

export type SystemInfoMeasurementType = 'cpu' | 'memory' | 'network' | 'temperature';
export interface SystemInfoConfig extends PluginConfig {
  name: 'systeminfo';
  stats?: SystemInfoMeasurementType[];
}

export interface ToolbarConfig {
  theme: ThemeType;
  plugins: PluginConfig[];
}

export interface HOCProps {
  toolbar: ToolbarConfig;
}
