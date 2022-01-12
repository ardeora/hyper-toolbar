import React, { FC } from 'react';
import { css, cx, injectGlobal } from '@emotion/css';
import { ThemeType } from 'types/toolbar';

import Battery from './plugins/Battery';

injectGlobal`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500;600;700;800&display=swap');
`;

export const ThemeContext = React.createContext<ThemeType>('light');

export const HyperToolbar: FC = () => {
  return (
    <ThemeContext.Provider value="light">
      <div className={cx(statusBarStyle)}>
        <Battery />
      </div>
    </ThemeContext.Provider>
  );
};

const statusBarStyle = css`
  position: absolute;
  bottom: 0;
  height: 36px;
  background-color: rgba(0, 0, 0, 0.2);
  width: 100%;
  display: flex;
  flex-flow: row-reverse;
  padding: 8px 12px;
  & > * {
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    padding: 0px 12px;
    border-left: 1px solid #94a3b830;
  }
  & > *:first-child {
    padding-right: 0px;
  }
`;
