import styles from '../styles/Default.module.css';
import { NextPage } from 'next';
import moment from 'moment';
import { Calendar as Cal, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

export const Calendar: NextPage = () => {
  const localizer = momentLocalizer(moment); // or globalizeLocalizer

  return (
    <div className={styles.container}>
      <Cal localizer={localizer} startAccessor='start' endAccessor='end' />
    </div>
  );
};
