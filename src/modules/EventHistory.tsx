import { NextPage } from 'next';
import styles from '../styles/Cards.module.css';
import { Event } from './Calendar';
import { Card } from 'react-bootstrap';
import moment from 'moment';

export const EventHistory: NextPage<{ events: Event[] }> = ({ events }) => {
  const cards = events.map((e: Event) => {
    const date: string = moment(e.start).format('MMMM Do');
    const time : string = moment(e.start).format('H:mm');
    return (
      <Card style={{ margin: '1rem' }} key={e.start.toISOString()}>
        <Card.Body>
          <Card.Title>{e.title}</Card.Title>
          <div className={styles.leftright}>
            {e.cost == 0 ? 'Free' : `${e.cost} credits`}
            <div>{date}</div>
          </div>
          <div className={styles.leftright}>
            Multiplier : x{e.multiplier}
            <div>{time}</div>
          </div>
        </Card.Body>
      </Card>
    );
  });

  return (
    <div className={styles.container}>
      <Card className={styles.main}>
        <Card.Header>History{cards.length > 0 ? ` (${cards.length})` : ''}</Card.Header>
        <Card.Body className={styles.vScroll}>{cards}</Card.Body>
      </Card>
    </div>
  );
};
