import React, { useContext, useEffect, useState } from 'react';
import { cx } from '@emotion/css';
import { ThemeContext } from '../../HyperToolbar';
import { FaThermometerHalf } from 'react-icons/fa';
import { getStatComponentStyles, PLUGIN_NAME } from '../../../utils';
import { Systeminformation } from 'systeminformation';

export const Temperature = () => {
  const theme = useContext(ThemeContext);
  const styles = getStatComponentStyles(theme);
  const [temperature, setTemperature] = useState<number | null>(null);

  useEffect(() => {
    window.rpc.on('ready', () => {
      window.rpc.emit(`${PLUGIN_NAME}:temperature:start`);

      window.rpc.on(`${PLUGIN_NAME}:temperature:data`, (payload) => {
        console.log(payload);
        const data = payload.data as Systeminformation.CpuTemperatureData;
        setTemperature(data.main);
      });
    });

    return () => {
      window.rpc.emit(`${PLUGIN_NAME}:temperature:stop`);
    };
  }, []);

  return (
    <div className={cx(styles.statContainer)}>
      <div className={cx(styles.statIconContainer)}>
        <FaThermometerHalf />
      </div>
      <div className={cx(styles.statInfoContainer)}>{temperature == null ? '-' : `${temperature.toFixed(0)}°C`}</div>
    </div>
  );
};
