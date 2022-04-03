import styles from '../styles/Default.module.css';
import { useRouter } from 'next/router';
import { Counter } from '../modules/Counter';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const Calendar = dynamic(() => import('@toast-ui/react-calendar'), { ssr: false });

export default function User() {
  const router = useRouter();
  const { pid } = router.query;

  return (
    <div className={styles.container}>
      <Head>
        <title>Page {pid}</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div>Page : {pid}</div>
      <div>calendar : {typeof Calendar}</div>
      <Counter />
      <Calendar height='900px' view='day' />
    </div>
  );
}
