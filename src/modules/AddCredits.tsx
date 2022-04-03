import styles from '../styles/Modal.module.css';

import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';

export function AddCredits() {
  const [show, setShow] = useState(false);

  return (
    <div className={styles.container}>
      <Button
        onClick={() => {
          setShow(true);
        }}
      >
        Add credits
      </Button>
      <Modal
        show={show}
        onHide={() => {
          setShow(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Ajouter des crédits</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className='mb-3'>
              <Form.Label>Montant</Form.Label>
              <Form.Control type='htmlSize' />
            </Form.Group>

            <Form.Group className='mb-3'>
              <Form.Label>Password</Form.Label>
              <Form.Control type='password' placeholder='Password' />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Check type='checkbox' label='Check me out' />
            </Form.Group>
          </Form>
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
          <Button
            variant='primary'
            onClick={() => {
              setShow(false);
            }}
          >
            Ajouter
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
