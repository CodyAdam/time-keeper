import styles from '../styles/Calendar.module.css';
import { useRef } from 'react';
import React from 'react';
import CalendarTUI from '@toast-ui/react-calendar';

import 'tui-calendar/dist/tui-calendar.css';

export function Calendar() {
  let calendarRef = useRef(null);
  const template = {
    monthDayname: function (dayname: any) {
      return '<span class="calendar-week-dayname-name">' + dayname.label + '</span>';
    },
  };

  return (
    <div className={styles.container}>
      <div>cal</div>
      <CalendarTUI ref={calendarRef} height='1000px' view='week' template={template} />
    </div>
  );
}
