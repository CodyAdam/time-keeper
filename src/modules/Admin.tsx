import styles from '../styles/Modal.module.css';

import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useRef, useState } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import { NextPage } from 'next';
import { addCredits, UserData } from '../pages/[pid]';
import { DocumentData, DocumentReference } from 'firebase/firestore';
import { sha256 } from 'js-sha256';

export const Admin: NextPage<{ userRef: DocumentReference<DocumentData>; data: UserData }> = ({ userRef, data }) => {
  const [show, setShow] = useState(false);
  const [credits, setCredits] = useState<number>(0);
  const [pass, setPass] = useState('');

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sha256(pass) === data.pass) {
      addCredits(credits, userRef);
      setCredits(0);
      setPass('');
      setShow(false);
    } else {
      alert('Mauvais mot de passe');
    }
  }
  return (
    <div className={styles.container}>
      <Button
        onClick={() => {
          setShow(true);
        }}
      >
        Pannel d'administration
      </Button>
      <Modal
        show={show}
        onHide={() => {
          setShow(false);
        }}
      >
        <Form onSubmit={onSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Pannel d'administration</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className='mb-3'>
              <Form.Label>Id d'utilisateur</Form.Label>
              <Form.Control name='user id' value={userRef.id} type='text' readOnly />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Nom d'utilisateur</Form.Label>
              <Form.Control name='username' value={data.name} type='text' readOnly />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>
                Ajout de crédits{credits != 0 ? ` (Nouveau solde : ${Math.max(credits + data.credits, 0)})` : ''}
              </Form.Label>
              <Form.Control
                onChange={(e) => {
                  setCredits(e.target.value ? parseInt(e.target.value) : 0);
                }}
                value={credits}
                name='credits amount'
                type='number'
                autoComplete='new-amount'
              />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Mot de passe</Form.Label>
              <Form.Control
                onChange={(e) => setPass(e.target.value)}
                value={pass}
                type='password'
                placeholder='Mot de passe'
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant='secondary'
              onClick={() => {
                setShow(false);
              }}
            >
              Annuler
            </Button>
            <Button type='submit'>Valider</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};
