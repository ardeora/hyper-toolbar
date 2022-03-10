import React, { useContext, useState, useEffect } from 'react';
import { cx } from '@emotion/css';
import { ThemeContext } from '../../HyperToolbar';
import { HiSwitchVertical } from 'react-icons/hi';
import { bytesToSize, getStatComponentStyles, PLUGIN_NAME } from '../../../utils';
import { Systeminformation } from 'systeminformation';

export const Network = () => {
  const theme = useContext(ThemeContext);
  const styles = getStatComponentStyles(theme);

  const [download, setDownload] = useState<number | null>(null);
  const [upload, setUpload] = useState<number | null>(null);

  useEffect(() => {
    window.rpc.on('ready', () => {
      window.rpc.emit(`${PLUGIN_NAME}:network:start`);

      window.rpc.on(`${PLUGIN_NAME}:network:data`, (payload) => {
        const data = payload.data as Systeminformation.NetworkStatsData;
        setDownload(data[0].rx_sec);
        setUpload(data[0].tx_sec);
      });
    });

    return () => {
      window.rpc.emit(`${PLUGIN_NAME}:network:stop`);
    };
  }, []);

  return (
    <div className={cx(styles.statContainer)}>
      <div className={cx(styles.statIconContainer)}>
        <HiSwitchVertical />
      </div>
      <div className={cx(styles.statInfoContainer)}>
        {upload == null || upload < 0 ? '-' : `${bytesToSize(upload, 0)}/s`}{' '}
        {download == null || download < 0 ? '-' : `${bytesToSize(download, 0)}/s`}
      </div>
    </div>
  );
};
