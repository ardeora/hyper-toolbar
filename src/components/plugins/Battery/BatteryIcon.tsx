import React, { useEffect, useContext } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { ThemeContext } from '../../HyperToolbar';
import themeObject from '../../../theme';

interface BatteryIconProps {
  batteryLevel: number;
  charging: boolean;
}

export const BatteryIcon: React.FC<BatteryIconProps> = ({ batteryLevel, charging }) => {
  const theme = useContext(ThemeContext);
  const control = useAnimation();

  useEffect(() => {
    if (charging) {
      control.start({
        rotate: [10, -10, 20, -15, 10, -5, 0],
        transition: {
          duration: 0.5,
        },
      });
    }
  }, [charging, control]);

  const minWidth = 15;
  const { colors, alpha } = themeObject;
  const levels = {
    critical: theme === 'light' ? colors.red[500] : colors.red[400],
    low: theme === 'light' ? colors.yellow[500] : colors.yellow[400],
    ok: theme === 'light' ? colors.green[500] : colors.green[400],
  };
  const xPos = 29.4 + (100 - (batteryLevel * 100 > minWidth ? batteryLevel * 100 : minWidth));
  const width = batteryLevel * 100 > minWidth ? batteryLevel * 100 : minWidth;
  const batteryColor = batteryLevel > 0.5 ? levels.ok : batteryLevel > 0.25 ? levels.low : levels.critical;
  const caseColorThemed = theme === 'light' ? colors.slate[700] : colors.slate[300];
  const caseColor = batteryLevel > 0.15 ? caseColorThemed : `${levels.critical}${alpha[80]}`;
  const boltColor = theme === 'light' ? colors.slate[800] : colors.slate[200];
  const viewBox = `0 0 ${charging ? '214.1' : '144'} 98.5`;

  return (
    <motion.svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox={viewBox}
      x="0px"
      y="0px"
      xmlSpace="preserve"
      onClick={() => {
        control.start({
          rotate: [10, -10, 20, -15, 10, -5, 0],
          transition: {
            duration: 0.7,
          },
        });
      }}
    >
      <g style={{ transform: 'translateY(10px)' }}>
        {charging ? (
          <path
            fill={boltColor}
            id="bolt"
            d="M167.3,42.7l33.2-41.9c0.3-0.4,0.6-0.7,1-0.8s0.7-0.1,1,0.1
          c0.3,0.2,0.5,0.4,0.6,0.7c0.1,0.3,0.1,0.8-0.2,1.3l-11.4,31h21.4c0.4,0,0.8,0.1,0.9,0.3c0.2,0.2,0.3,0.5,0.3,0.7
          c0,0.4-0.2,0.9-0.6,1.5l-33.1,41.9c-0.3,0.4-0.7,0.7-1.1,0.8s-0.7,0.1-1-0.1c-0.3-0.1-0.5-0.4-0.6-0.7c-0.1-0.3-0.1-0.8,0.1-1.3
          l11.5-31.1h-21.4c-0.4,0-0.7-0.1-0.9-0.3c-0.2-0.2-0.3-0.5-0.3-0.7C166.7,43.8,166.9,43.3,167.3,42.7z"
          />
        ) : null}

        <motion.g animate={control}>
          <g id="case" fill={caseColor}>
            <path
              d="M123,13.2c7.4,0,13.4,6,13.4,13.4v25.3c0,7.4-6,13.4-13.4,13.4H35.5c-7.4,0-13.4-6-13.4-13.4V26.6c0-7.4,6-13.4,13.4-13.4
            H123 M123,6.2H35.5c-11.3,0-20.4,9.1-20.4,20.4v25.3c0,11.3,9.1,20.4,20.4,20.4H123c11.3,0,20.4-9.1,20.4-20.4V26.6
            C143.3,15.3,134.2,6.2,123,6.2L123,6.2z"
            />
          </g>
          <rect x={`${xPos}`} y="20" width={`${width}`} height="38.4338" fill={batteryColor} rx="5" />
          <path
            id="cap"
            fill={caseColor}
            d="M8.7,52.4V26.1C3.4,28.3,0,33.5,0,39.2
            C0,45,3.4,50.1,8.7,52.4"
          />
        </motion.g>
      </g>
    </motion.svg>
  );
};
