import { NextPage } from 'next';
import styles from '../styles/Cards.module.css';
import { Event } from './Calendar';
import { Card } from 'react-bootstrap';
import moment from 'moment';

export const EventHistory: NextPage<{ events: Event[] }> = ({ events }) => {
  const cards = events.map((e: Event) => (
    <Card style={{ margin: '1rem' }} key={e.start.toISOString()}>
      <Card.Body>
        <Card.Title>{e.title}</Card.Title>
        <Card.Text>{e.start.toISOString()}</Card.Text>
        <Card.Text>
          {e.start.toLocaleString()} - {e.end.toLocaleString()}
        </Card.Text>
      </Card.Body>
    </Card>
  ));

  return (
    <div className={styles.container}>
      <Card className={styles.main}>
        <Card.Header>Historique{cards.length > 0 ? ` (${cards.length})` : ''}</Card.Header>
        <Card.Body className={styles.vScroll}>{cards}</Card.Body>
      </Card>
    </div>
  );
};
