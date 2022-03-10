import React, { useContext, useState, useEffect } from 'react';
import { cx } from '@emotion/css';
import { ThemeContext } from '../../HyperToolbar';
import { getStatComponentStyles } from '../../../utils';
import { PLUGIN_NAME } from '../../../utils';
import { Systeminformation } from 'systeminformation';

const CPUIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
      <rect x="9" y="9" width="6" height="6"></rect>
      <line x1="9" y1="1" x2="9" y2="4"></line>
      <line x1="15" y1="1" x2="15" y2="4"></line>
      <line x1="9" y1="20" x2="9" y2="23"></line>
      <line x1="15" y1="20" x2="15" y2="23"></line>
      <line x1="20" y1="9" x2="23" y2="9"></line>
      <line x1="20" y1="14" x2="23" y2="14"></line>
      <line x1="1" y1="9" x2="4" y2="9"></line>
      <line x1="1" y1="14" x2="4" y2="14"></line>
    </svg>
  );
};

export const CPU = () => {
  const theme = useContext(ThemeContext);
  const styles = getStatComponentStyles(theme);

  const [load, setLoad] = useState<number | null>(0);

  useEffect(() => {
    window.rpc.on('ready', () => {
      window.rpc.emit(`${PLUGIN_NAME}:cpu:start`);

      window.rpc.on(`${PLUGIN_NAME}:cpu:data`, (payload) => {
        const { currentLoad } = payload.data as Systeminformation.CurrentLoadData;
        setLoad(currentLoad);
      });
    });

    return () => {
      window.rpc.on('ready', () => {
        window.rpc.emit(`${PLUGIN_NAME}:cpu:stop`);
      });
    };
  }, []);

  return (
    <div className={cx(styles.statContainer)}>
      <div className={cx(styles.statIconContainer)}>
        <CPUIcon />
      </div>
      <div className={cx(styles.statInfoContainer)}>{load == null || load < 0 ? '-' : load.toFixed(1)}</div>
    </div>
  );
};
