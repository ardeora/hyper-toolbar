import React, { FC, useEffect, useState } from 'react';
import { css, cx, injectGlobal } from '@emotion/css';
import { SystemInfoConfig, ThemeType, ToolbarConfig } from 'types/toolbar';
import themeObject from '../theme';

import Battery from './plugins/Battery';
import Time from './plugins/Time';

injectGlobal`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500;600;700;800&display=swap');
`;

export interface HyperToolbarProps {
  config: ToolbarConfig;
}

export const ThemeContext = React.createContext<ThemeType>('light');

export const HyperToolbar: FC<HyperToolbarProps> = ({ config }) => {
  const [theme, setTheme] = useState<ThemeType>(config.theme);
  const styles = getStyles(theme);

  useEffect(() => {
    setTheme(config.theme);
  }, [config.theme]);

  const getPlugins = () => {
    const plugins = config.plugins.map((plugin) => {
      switch (plugin.name) {
        case 'battery':
          return <Battery key={plugin.name} />;
        case 'time':
          return <Time key={plugin.name} />;
        default:
          return null;
      }
    });
    return plugins;
  };

  return (
    <ThemeContext.Provider value={theme}>
      <div className={cx(styles.statusBarStyle)}>{getPlugins()}</div>
    </ThemeContext.Provider>
  );
};

const getStyles = (theme: ThemeType) => {
  return {
    statusBarStyle: css`
      position: absolute;
      bottom: 0;
      height: 36px;
      background-color: ${themeObject[theme].colors.main};
      width: 100%;
      display: flex;
      z-index: 1;
      flex-flow: row-reverse;
      padding: 8px 12px;
      & > * {
        font-family: 'Inter', sans-serif;
        border-left: 1px solid ${themeObject[theme].colors.tertiary};
      }
      & > *:first-child {
        padding-right: 0px;
      }
      &::before {
        content: '';
        position: absolute;
        border-radius: 8px;
        width: 100vw;
        height: 36px;
        top: 0;
        left: 0;
        z-index: -1;
        -webkit-backdrop-filter: blur(8px);
        backdrop-filter: blur(8px);
      }
    `,
  };
};
