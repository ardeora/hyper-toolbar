import { ThemeType } from 'types/toolbar';
import themeObject from '../../theme';
import { css } from '@emotion/css';

export const getStatComponentStyles = (theme: ThemeType) => {
  const { colors, font } = themeObject;
  // const primary = theme === 'light' ? colors.slate[800] : colors.slate[200];
  const secondary = theme === 'light' ? colors.slate[700] : colors.slate[300];
  // const tertiary = theme === 'light' ? colors.slate[500] : colors.slate[600];

  return {
    statContainer: css`
      display: flex;
      gap: 2px;
      color: ${secondary};
    `,
    statIconContainer: css`
      width: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      & svg {
        width: 16px;
      }
    `,
    statInfoContainer: css`
      width: max-content;
      font-size: ${font.sm};
      display: flex;
      align-items: center;
      line-height: 100%;
      font-variant-numeric: tabular-nums;
    `,
  };
};

// Converts bytes to appropriate GB, KB, MB or bytes
export const bytesToSize = (bytes: number, decimals = 2) => {
  if (bytes === 0) return '0B';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + sizes[i];
};
