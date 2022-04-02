import { onSnapshot, getDoc, runTransaction, doc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';
import { db } from '../pages/api/firebase';
import styles from '../styles/Counter.module.css';

const dataRef = doc(db, 'nikki', 'data');

async function addCredits(amount: number) {
  try {
    await runTransaction(db, async (transaction) => {
      const sfDoc = await transaction.get(dataRef);
      if (!sfDoc.exists()) {
        throw 'Document does not exist!';
      }

      const newCredits = sfDoc.data().credits + amount;
      transaction.update(dataRef, { credits: newCredits });
    });
    console.log('Transaction successfully committed!');
  } catch (e) {
    console.log('Transaction failed: ', e);
  }
}

export function Counter() {
  const [credits, setCredits] = useState(0);

  useEffect(() => {
    const unsub = onSnapshot(dataRef, (doc) => {
      setCredits(doc.data()?.credits);
    });
    async function getCredits() {
      const dataSnap = await getDoc(dataRef);
      if (dataSnap.exists()) return dataSnap.data().credits;
      else return 0;
    }
    getCredits().then((cred) => {
      setCredits(cred);
    });
  }, []);
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Credits : {credits}</h1>
      <ButtonGroup>
        <Button
          onClick={() => {
            addCredits(-10);
          }}
        >
          -
        </Button>
        <Button
          onClick={() => {
            addCredits(10);
          }}
        >
          +
        </Button>
      </ButtonGroup>
    </div>
  );
}
