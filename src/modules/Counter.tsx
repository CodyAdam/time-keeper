import { NextPage } from 'next';
import styles from '../styles/Counter.module.css';

export const Counter: NextPage<{ credits: number, freeCredits:number }> = ({ credits, freeCredits }) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Free Credits : {freeCredits}</h1>
      <h1 className={styles.title}>Credits : {credits}</h1>
    </div>
  );
};
