import styles from '../styles/Default.module.css';
import { NextPage } from 'next';
import moment from 'moment';
import { Calendar as BigCalendar, momentLocalizer, Views } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useEffect, useMemo, useState } from 'react';
import { splitEventOnMidnight } from '../pages/[pid]';

export type Event = {
  id? : string,
  title: string;
  start: Date;
  end: Date;
  multiplier: number;
  cost: number;
  hexColor?: string;
};

function eventStyleGetter(event: Event, start: Date, end: Date, isSelected: boolean) {
  var backgroundColor = event.hexColor ? '#' + event.hexColor : '#00a1ff';
  var style = {
    backgroundColor: backgroundColor,
    opacity: 0.9,
    color: 'white',
  };
  return {
    style: style,
  };
}

export const Calendar: NextPage<{ events: Event[] }> = ({ events }) => {
  const localizer = momentLocalizer(moment); // or globalizeLocalizer
  const views = useMemo(() => ({ week: true, day: true }), []);

  const [localEvents, setLocalEvents] = useState<Event[]>([]);

  useEffect(() => {
    let newEvents : Event[] = [];
    for (const event of events) {
      newEvents = newEvents.concat(splitEventOnMidnight(event));
    }
    setLocalEvents(newEvents);
  }, [events]);


  return (
    <div className={styles.container}>
      <BigCalendar
        localizer={localizer}
        defaultView={Views.DAY}
        defaultDate={new Date()}
        views={views}
        events={localEvents}
        eventPropGetter={eventStyleGetter}
      />
    </div>
  );
};
