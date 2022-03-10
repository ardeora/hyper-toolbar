import React, { useContext, useEffect, useState } from 'react';
import { cx } from '@emotion/css';
import { ThemeContext } from '../../HyperToolbar';
import { CgSmartphoneRam } from 'react-icons/cg';
import { getStatComponentStyles, bytesToSize, PLUGIN_NAME } from '../../../utils';
import { Systeminformation } from 'systeminformation';

export const Memory = () => {
  const theme = useContext(ThemeContext);
  const styles = getStatComponentStyles(theme);
  const [memoryUsed, setMemoryUsed] = useState<number | null>(null);
  const [memoryTotal, setMemoryTotal] = useState<number | null>(null);

  useEffect(() => {
    window.rpc.on('ready', () => {
      window.rpc.emit(`${PLUGIN_NAME}:memory:start`);

      window.rpc.on(`${PLUGIN_NAME}:memory:data`, (payload) => {
        const { active, total } = payload.data as Systeminformation.MemData;
        setMemoryUsed(active);
        setMemoryTotal(total);
      });
    });

    return () => {
      window.rpc.emit(`${PLUGIN_NAME}:memory:stop`);
    };
  }, []);

  return (
    <div className={cx(styles.statContainer)}>
      <div className={cx(styles.statIconContainer)}>
        <CgSmartphoneRam />
      </div>
      <div className={cx(styles.statInfoContainer)}>
        {memoryTotal == null || !memoryUsed ? '-' : `${bytesToSize(memoryUsed)} / ${bytesToSize(memoryTotal, 0)}`}
      </div>
    </div>
  );
};
