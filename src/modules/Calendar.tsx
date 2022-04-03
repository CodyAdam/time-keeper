import styles from '../styles/Calendar.module.css';
import { useRef } from 'react';
import React from 'react';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';

import 'tui-calendar/dist/tui-calendar.css';

const CalendarTUI = dynamic(() => import('@toast-ui/react-calendar'), { ssr: false });

export const Calendar: NextPage = () => {
  let calendarRef = useRef(null);
  const template = {
    monthDayname: function (dayname: any) {
      return '<span class="calendar-week-dayname-name">' + dayname.label + '</span>';
    },
  };

  return (
    <div className={styles.calendar}>
      <CalendarTUI style={{ width: '100%' }} height='0px' view='week' template={template} />;
    </div>
  );
};
