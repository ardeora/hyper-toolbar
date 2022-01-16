import React, { useContext, useEffect } from 'react';
import { getTimeZoneList } from './util';
import { ThemeType } from 'types/toolbar';
import { ThemeContext } from '../../HyperToolbar';
import themeObject from '../../../theme';
import { css, cx } from '@emotion/css';
import { IoSearch } from 'react-icons/io5';

export interface TimezoneSearchProps {
  isOpen: boolean;
  onSelect: React.Dispatch<React.SetStateAction<string>>;
  onFocusOut: React.Dispatch<React.SetStateAction<boolean>>;
  triggerButtonRef: React.RefObject<HTMLDivElement>;
}

const timeZonesList = getTimeZoneList();

export const TimezoneSearch: React.FC<TimezoneSearchProps> = ({ isOpen, onSelect, onFocusOut, triggerButtonRef }) => {
  const theme = useContext(ThemeContext);
  const styles = getStyles(theme);
  const [timezoneSearch, setTimezoneSearch] = React.useState('');
  const componentRef = React.useRef<HTMLDivElement>(null);
  const searchInputRef = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    const clickHandler = (e: MouseEvent) => {
      const node = e.target as Node;
      if (node && !componentRef.current?.contains(node) && !triggerButtonRef.current?.contains(node)) {
        onFocusOut(false);
      }
    };

    window.addEventListener('mousedown', clickHandler);

    if (isOpen) {
      searchInputRef.current?.focus();
    }

    return () => {
      window.removeEventListener('mousedown', clickHandler);
    };
  }, [isOpen]);

  return (
    <div
      ref={componentRef}
      style={{
        visibility: isOpen ? 'visible' : 'hidden',
        pointerEvents: isOpen ? 'auto' : 'none',
      }}
      className={cx(styles.timeDropdownContent)}
    >
      <div className={cx(styles.timezoneSearch)}>
        <div className={cx(styles.timezoneSearchContainer)}>
          <div className={cx(styles.searchIconContainer)}>
            <IoSearch />
          </div>
          <input
            ref={searchInputRef}
            value={timezoneSearch}
            onChange={(e) => setTimezoneSearch(e.target.value)}
            placeholder="Search Timezone"
            className={cx(styles.timezoneSearchInput)}
            type="text"
          />
        </div>
      </div>

      <div className={cx(styles.timezoneList)}>
        {timeZonesList
          .filter((timezone) => timezone.toLowerCase().includes(timezoneSearch.toLowerCase()))
          .map((timeZone) => {
            return (
              <div
                key={timeZone}
                className={cx(styles.timezoneItem)}
                onClick={() => {
                  onSelect(timeZone);
                  searchInputRef.current?.focus();
                }}
              >
                {timeZone}
              </div>
            );
          })}
      </div>
    </div>
  );
};

const getStyles = (theme: ThemeType) => {
  const colorMode = themeObject[theme];
  return {
    timeDropdownContent: css`
      width: 175px;
      height: 200px;
      background: ${theme == 'light' ? `rgba(255, 255, 255, 0.5)` : 'rgba(0, 0, 0, 0.5)'};
      border-radius: 8px;
      display: grid;
      grid-template-rows: 40px auto;
      grid-gap: 4px;
      &::before {
        content: '';
        position: absolute;
        border-radius: 8px;
        width: 175px;
        height: 200px;
        z-index: -1;
        -webkit-backdrop-filter: blur(8px);
        backdrop-filter: blur(8px);
      }
    `,
    timezoneSearch: css`
      padding: 8px 12px;
    `,
    timezoneSearchContainer: css`
      height: 100%;
      display: grid;
      grid-template-columns: 23px auto;
    `,
    timezoneSearchInput: css`
      width: 100%;
      background: none;
      outline: none;
      border: none;
      border-bottom: 1px solid ${colorMode.colors.tertiary};
      font-size: ${themeObject.common.font.sm};
      color: ${colorMode.colors.primary};
      &::placeholder {
        color: ${colorMode.colors.secondary};
      }
    `,
    searchIconContainer: css`
      display: flex;
      align-items: center;
      opacity: 0.6;
      color: ${colorMode.colors.secondary};
    `,
    timezoneList: css`
      overflow-y: auto;
      padding: 0px 8px;
    `,
    timezoneItem: css`
      padding: 12px 12px;
      cursor: pointer;
      border-radius: 4px;
      background: ${theme == 'light' ? `rgba(255, 255, 255, 0.8)` : '#94a3b869'};
      font-size: 12px;
      margin-bottom: 8px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      text-align: center;
      color: ${colorMode.colors.primary};
      &:hover {
        background: ${theme == 'light' ? `rgba(255, 255, 255, 0.4)` : '#94a3b899'};
      }
    `,
  };
};
