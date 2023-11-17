import { GetServerSideProps } from 'next';
import React from 'react';

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: '/resizer',
      permanent: false,
    },
  };
};

const Home = () => {
  return (
    <div>
      
    </div>
  );
};


export default Home;
