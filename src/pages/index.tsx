import type { NextPage } from 'next';
import Head from 'next/head';
import { Button, ButtonGroup } from 'react-bootstrap';
import { AddUser } from '../modules/AddUser';
import styles from '../styles/Home.module.css';
import { db } from './api/firebase';
import { doc, collection, query, getDocs } from 'firebase/firestore';
import { useState } from 'react';
import { useRouter } from 'next/router';

async function getUsers() {
  const q = query(collection(db, 'users'));
  const querySnapshot = await getDocs(q);

  const users: { id: string; data: any }[] = [];
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    users.push({ id: doc.id, data: doc.data() });
  });
  return users;
}

const Home: NextPage = () => {
  const router = useRouter();
  const [users, setUsers] = useState<{ id: string; data: any }[]>([]);
  getUsers().then((u) => {
    setUsers(u);
  });
  const usersList = users.map(({ id, data }) => (
    <Button key={id} onClick={() => router.push('/' + id)}>
      {data.name}
    </Button>
  ));

  return (
    <div className={styles.container}>
      <Head>
        <title>The time trader</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className={styles.main}>
        <div className={styles.title}>The time trader</div>
        <div className={styles.grid}>
          <div className={styles.card}>
            <h2>Selectionnez un utilisateur existant</h2>
            <div className={styles.buttonGroup}>{usersList.length ? usersList : 'Aucun existant'}</div>
          </div>
          <div className={styles.card}>
            <h2>Ou créer un nouvel utilisateur</h2>
            <AddUser />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
