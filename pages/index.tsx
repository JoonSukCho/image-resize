import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

// reference
// https://falsy.me/nextjs-api-routes%EB%A5%BC-%ED%86%B5%ED%95%B4-api-%EC%84%9C%EB%B2%84%EB%A1%9C-%ED%8C%8C%EC%9D%BC-%EB%B3%B4%EB%82%B4%EA%B8%B0/

const Home: NextPage = () => {
  const handleChangeFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.currentTarget;
    const formData = new FormData();

    if (files && files.length > 0) {
      const file = files[0];

      formData.append('file', file);

      const res = await axios.post('/api/image', {
        image: formData,
      });

      console.log(res);
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <label htmlFor="file-upload">이미지 업로드</label>
        <input id="file-upload" type="file" onChange={handleChangeFile} />
      </main>
    </div>
  );
};

export default Home;