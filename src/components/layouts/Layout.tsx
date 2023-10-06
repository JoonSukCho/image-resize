import React from 'react';
import Aside from '../Aside';
import styled from 'styled-components';
import Header from '../Header';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Header />
      <Aside />
      <Main>
        <Navbar />
        <Container>{children}</Container>
      </Main>
    </>
  );
};

const Main = styled.main`
  margin-left: 17.125rem;
`;

const Navbar = styled.nav`
  min-height: 75px;
`;

const Container = styled.div`
  padding: 1.5rem;
`;

export default Layout;
