import React, { FC, useState, useEffect, useContext } from 'react';
import { unstable_batchedUpdates } from 'react-dom';
import { css, cx } from '@emotion/css';
import { NavigatorExtended } from 'types/hyper';
import { secondsToHms } from '../../../utils';
import { BatteryIcon } from './BatteryIcon';
import { ThemeType } from 'types/toolbar';
import { ThemeContext } from '../../HyperToolbar';
import themeObject from '../../../theme';

export const Battery: FC = () => {
  const theme = useContext(ThemeContext);
  const styles = getStyles(theme);
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

const getStyles = (theme: ThemeType) => {
  const { colors, font } = themeObject;
  const levelColor = theme === 'light' ? colors.slate[800] : colors.slate[200];
  const timeColor = theme === 'light' ? colors.slate[700] : colors.slate[300];
  return {
    battery: css`
      font-size: ${font.md};
      display: flex;
      padding: 0px 12px;
      & > * {
        margin-left: 4px;
      }
      & > *:first-child {
        margin-left: 0;
      }
    `,
    batteryTime: css`
      font-weight: 500;
      font-size: ${font.sm};
      display: flex;
      align-items: center;
      color: ${timeColor};
    `,
    batteryLevel: css`
      font-weight: 500;
      display: flex;
      font-size: ${font.md};
      align-items: center;
      line-height: 100%;
      color: ${levelColor};
    `,
    batteryIcon: css`
      display: flex;
      align-items: center;
    `,
  };
};
