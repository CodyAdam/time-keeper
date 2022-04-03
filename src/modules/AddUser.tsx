import styles from '../styles/Modal.module.css';
import { Button, Form } from 'react-bootstrap';
import { sha256 } from 'js-sha256';
import { doc, addDoc, collection } from 'firebase/firestore';
import { db } from '../pages/api/firebase';
import { useState } from 'react';

export function AddUser() {
  const [loading, setLoading] = useState<null | string>(null);

  async function registerUser(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const target: { name: undefined | { value: string }; pass: undefined | { value: string } } = event.target as any;
    try {
      if (!target.name || !target.pass) throw 'Name or Pass not defined';
      console.log(target.name.value);
      console.log(target.pass.value);
      console.log(sha256(target.pass.value));
      setLoading('Enregistrement en cours...');
      await addDoc(collection(db, 'users'), {
        name: target.name.value,
        pass: sha256(target.pass.value),
      }).then(() => {
        setLoading(null);
        location.reload();
      });
    } catch (e) {
      console.log('Error during register ', e);
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
          <Form.Label>Mot de passe</Form.Label>
          <Form.Control type='password' placeholder='Mot de passe' id='pass' required />
        </Form.Group>
        <Form.Group className='mb-3'></Form.Group>
        <Button type='submit'>Créer</Button>
        {loading}
      </Form>
    </div>
  );
}
