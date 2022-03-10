import React, { FC } from 'react';
import { SystemInfoConfig } from 'types/toolbar';
import { CPU } from './CPU';
import { Memory } from './Memory';
import { Network } from './Network';
import { Temperature } from './Temperature';
import { css, cx } from '@emotion/css';

export const SystemInfo: FC<SystemInfoConfig> = ({ stats }) => {
  const styles = getStyles();

  const getStatComponents = () => {
    if (!stats) return [];

    const statComponents = stats.map((stat) => {
      switch (stat) {
        case 'cpu':
          return <CPU key={stat} />;
        case 'memory':
          return <Memory key={stat} />;
        case 'network':
          return <Network key={stat} />;
        case 'temperature':
          return <Temperature key={stat} />;
        default:
          return null;
      }
    });
    return statComponents;
  };

  return <div className={cx(styles.systemInfoContainer)}>{getStatComponents()}</div>;
};

const getStyles = () => {
  return {
    systemInfoContainer: css`
      display: flex;
      flex-flow: row-reverse;
      padding: 0px 12px;
      gap: 8px;
    `,
  };
};
