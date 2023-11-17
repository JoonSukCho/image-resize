import type { NextPage } from 'next';
import React from 'react';
import styled from 'styled-components';
import ResizeImageCard from 'src/components/Card/ResizeImageCard';
import Head from 'next/head';
import { ResizeImageProvider } from 'context/ResizeImageContext';

// reference
// https://falsy.me/nextjs-api-routes%EB%A5%BC-%ED%86%B5%ED%95%B4-api-%EC%84%9C%EB%B2%84%EB%A1%9C-%ED%8C%8C%EC%9D%BC-%EB%B3%B4%EB%82%B4%EA%B8%B0/

const Resizer: NextPage = () => {
  return (
    <>
      <Head>
        <title>Image Resizer</title>
        <meta name="description" content="Image Resizer" />
      </Head>
      <ResizeImageProvider>
        <Container>
          <ResizeImageCard />
        </Container>
      </ResizeImageProvider>
    </>
  );
};

const Container = styled.div``;

export default Resizer;
