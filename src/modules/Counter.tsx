import { NextPage } from 'next';
import styles from '../styles/Counter.module.css';

export const Counter: NextPage<{ credits: number }> = ({ credits }) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Credits : {credits}</h1>
    </div>
  );
};
