import React, { FC, useState, useEffect } from 'react';
import { unstable_batchedUpdates } from 'react-dom';
import { css, cx } from '@emotion/css';
import { NavigatorExtended } from 'types/hyper';
import { secondsToHms } from './util';
import { BatteryIcon } from './BatteryIcon';

export const Battery: FC = () => {
  const styles = getStyles();
  const [level, setLevel] = useState<number | undefined>();
  const [charging, setCharging] = useState<boolean | undefined>();
  const [chargingTime, setChargingTime] = useState<number | undefined>();
  const [dischargingTime, setDischargingTime] = useState<number | undefined>();

  useEffect(() => {
    const getBattery = () => {
      return (navigator as NavigatorExtended).getBattery().then((battery) => {
        battery.addEventListener('chargingchange', () => {
          setCharging(battery.charging);
        });
        battery.addEventListener('levelchange', () => {
          setLevel(battery.level);
        });
        battery.addEventListener('chargingtimechange', () => {
          setChargingTime(battery.chargingTime);
        });
        battery.addEventListener('dischargingtimechange', () => {
          setDischargingTime(battery.dischargingTime);
        });

        unstable_batchedUpdates(() => {
          setCharging(battery.charging);
          setLevel(battery.level);
          setChargingTime(battery.chargingTime);
          setDischargingTime(battery.dischargingTime);
        });
      });
    };

    getBattery();
  }, []);

  return (
    <div className={cx(styles.battery)}>
      {chargingTime && isFinite(chargingTime) ? (
        <span className={cx(styles.batteryTime)}>{secondsToHms(chargingTime)}</span>
      ) : null}
      {dischargingTime && isFinite(dischargingTime) ? (
        <span className={cx(styles.batteryTime)}>{secondsToHms(dischargingTime)}</span>
      ) : null}
      <span style={{ width: charging ? '40px' : '28px' }} className={cx(styles.batteryIcon)}>
        <BatteryIcon
          batteryLevel={level == undefined ? 0 : level}
          charging={charging == undefined ? false : charging}
        />
      </span>
      <span className={cx(styles.batteryLevel)}>{level ? Number((level * 100).toFixed(2)) : level}%</span>
    </div>
  );
};

const getStyles = () => {
  return {
    battery: css`
      color: #f1f5f9;
      font-size: 14px;
      display: flex;
      & > * {
        margin-left: 4px;
      }
      & > *:first-child {
        margin-left: 0;
      }
    `,
    batteryTime: css`
      font-weight: 500;
      font-size: 12px;
      display: flex;
      align-items: center;
      opacity: 0.6;
    `,
    batteryLevel: css`
      font-weight: 500;
      opacity: 0.8;
      display: flex;
      align-items: center;
      line-height: 100%;
    `,
    batteryIcon: css`
      display: flex;
      align-items: center;
    `,
  };
};
