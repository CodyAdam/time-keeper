import styles from '../styles/Modal.module.css';
import { Button, Form } from 'react-bootstrap';
import { sha256 } from 'js-sha256';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../pages/api/firebase';
import { useEffect, useState } from 'react';

const defaultUser = {};

export function AddUser() {
  const [loading, setLoading] = useState<null | string>(null);

  async function registerUser(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const target: { name: undefined | { value: string }; pass: undefined | { value: string } } = event.target as any;
    try {
      if (!target.name || !target.pass) throw 'Name or Pass not defined';
      setLoading('Enregistrement en cours...');
      await addDoc(collection(db, 'users'), {
        ...defaultUser,
        name: target.name.value,
        pass: sha256(target.pass.value),
      }).then(() => {
        setLoading(null);
      });
    } catch (e) {
      setLoading("Une erreur c'est produite");
      console.log('Error during registration : ', e);
    }
  }

  return (
    <div>
      <Form onSubmit={registerUser}>
        <Form.Group className='mb-3'>
          <Form.Label>Nom</Form.Label>
          <Form.Control type='htmlSize' id='name' required />
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Control type='password' placeholder='Mot de passe' id='pass' required />
        </Form.Group>
        <div className={styles.submitContainer}>
          <Button type='submit' disabled={loading != null}>
            Créer
          </Button>
          <Form.Label>{loading}</Form.Label>
        </div>
      </Form>
    </div>
  );
}
