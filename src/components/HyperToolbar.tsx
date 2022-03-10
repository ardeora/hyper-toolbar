import React, { FC, useEffect, useState } from 'react';
import { css, cx, injectGlobal } from '@emotion/css';
import { SystemInfoConfig, ThemeType, ToolbarConfig } from 'types/toolbar';
import themeObject from '../theme';

import Battery from './plugins/Battery';
import Time from './plugins/Time';
import SystemInfo from './plugins/SystemInfo';

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
        case 'systeminfo':
          const systemInfoConfig = plugin as SystemInfoConfig;
          return <SystemInfo key={plugin.name} {...systemInfoConfig} />;
        default:
          return null;
      }
    });
    return plugins;
  };

  return (
    <ThemeContext.Provider value={theme}>
      <div className={cx(styles.statusBarWrapper)}>
        <div className={cx(styles.statusBarStyle)}>{getPlugins()}</div>
      </div>
    </ThemeContext.Provider>
  );
};

const getStyles = (theme: ThemeType) => {
  const { colors, alpha } = themeObject;
  const mainColor = theme === 'light' ? `${colors.white}${alpha[50]}` : `${colors.black}${alpha[20]}`;
  const borderColor = theme === 'light' ? colors.slate[500] : colors.slate[600];
  return {
    statusBarWrapper: css`
      position: absolute;
      bottom: 0;
      height: 36px;
      z-index: 1;
      width: 100%;
    `,
    statusBarStyle: css`
      height: 36px;
      background-color: ${mainColor};
      width: 100%;
      display: flex;
      flex-flow: row-reverse;
      overflow-x: auto;
      overflow-y: visible;
      padding: 8px 12px;
      & > * {
        font-family: 'Inter', sans-serif;
        border-left: 1px solid ${borderColor};
      }
      & > *:first-child {
        padding-right: 0px;
      }
      &::-webkit-scrollbar {
        width: 0px !important;
        height: 0px !important;
      }
      &::before {
        content: '';
        position: absolute;
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
