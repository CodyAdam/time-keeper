import { onSnapshot, runTransaction, DocumentReference, DocumentData } from 'firebase/firestore';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';
import { db } from '../pages/api/firebase';
import styles from '../styles/Counter.module.css';

export async function addCredits(amount: number, userRef: DocumentReference<DocumentData>) {
  try {
    await runTransaction(db, async (transaction) => {
      const docSnap = await transaction.get(userRef);
      if (!docSnap.exists()) {
        throw 'Document does not exist!';
      }
      const credits = docSnap.data().credits;
      const newCredits = (credits ? credits : 0) + amount;
      transaction.update(userRef, { credits: newCredits });
    });
  } catch (e) {
    console.error('Transaction failed: ', e);
  }
}

export const Counter: NextPage<{ userRef: DocumentReference<DocumentData> }> = ({ userRef }) => {
  const [credits, setCredits] = useState(0);

  useEffect(() => {
    addCredits(0, userRef);
    const unsub = onSnapshot(userRef, (docSnap) => {
      if (docSnap.exists()) {
        setCredits(docSnap.data().credits);
      } else console.error('Doc not found :', userRef);
    });
    return () => {
      unsub();
    };
  }, []);
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Credits : {credits}</h1>
    </div>
  );
};
