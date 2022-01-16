import React, { useState, useEffect, useRef, useContext } from 'react';
import moment from 'moment-timezone';
import { css, cx } from '@emotion/css';
import { usePopper } from 'react-popper';
import { ThemeType } from 'types/toolbar';
import { ThemeContext } from '../../HyperToolbar';
import themeObject from '../../../theme';
import { TimezoneSearch } from './TimezoneSearch';

export const Time = () => {
  const theme = useContext(ThemeContext);
  const componentStyles = getStyles(theme);
  const [time, setTime] = useState(Date.now());

  const [timeZone, setTimeZone] = useState(moment.tz.guess());
  const [timezoneListOpen, setTimezoneListOpen] = useState(false);

  const buttonRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);

  const { styles, attributes, update } = usePopper(buttonRef.current, popupRef.current, {
    placement: 'top',
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 10],
        },
      },
      { name: 'arrow', options: { element: arrowRef.current } },
    ],
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(Date.now());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <div style={{ position: 'relative' }}>
        <div
          onClick={() => {
            update?.();
            setTimezoneListOpen(!timezoneListOpen);
          }}
          ref={buttonRef}
          className={cx(componentStyles.buttonHitArea)}
        ></div>
        <div className={cx(componentStyles.time)}>{moment(time).tz(timeZone).format('HH:mm:ss z')}</div>
      </div>

      <div
        id="tooltip"
        ref={popupRef}
        style={styles.popper}
        {...attributes.popper}
        className={cx(componentStyles.timeDropdown)}
      >
        <div
          className={cx(componentStyles.arrow)}
          ref={arrowRef}
          style={{
            ...styles.arrow,
            visibility: timezoneListOpen ? 'visible' : 'hidden',
            pointerEvents: timezoneListOpen ? 'auto' : 'none',
          }}
        />
        <TimezoneSearch
          triggerButtonRef={buttonRef}
          onFocusOut={setTimezoneListOpen}
          isOpen={timezoneListOpen}
          onSelect={setTimeZone}
        />
      </div>
    </>
  );
};

const getStyles = (theme: ThemeType) => {
  const colorMode = themeObject[theme];
  return {
    time: css`
      color: ${colorMode.colors.secondary};
      font-size: ${themeObject.common.font.md};
      display: flex;
      padding: 0px 12px;
      align-items: center;
      line-height: 100%;
      height: 100%;
      cursor: pointer;
      pointer-events: none;
      position: relative;
    `,
    timeDropdown: css`
      border: none;
    `,
    arrow: css`
      position: absolute;
      width: 0;
      height: 0;
      border-left: 8px solid transparent;
      border-right: 8px solid transparent;
      border-top: 8px solid ${theme == 'light' ? `rgba(255, 255, 255, 0.5)` : 'rgba(0, 0, 0, 0.5)'};
      top: 100%;
    `,
    buttonHitArea: css`
      position: absolute;
      left: 2px;
      top: -6px;
      width: calc(100% - 4px);
      height: 32px;
      border-radius: 4px;
      cursor: pointer;
      &:hover {
        background-color: ${theme == 'light' ? `rgba(0, 0, 0, 0.1)` : '#ffffff1a'};
      }
    `,
  };
};
