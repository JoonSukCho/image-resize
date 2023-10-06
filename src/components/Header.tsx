import styled from 'styled-components';
import React from 'react';

const Header = () => {
  return <Container></Container>;
};

const Container = styled.div`
  position: absolute;
  width: 100%;
  min-height: 75px;

  background-color: ${({ theme }) => theme.color.primary};
`;

export default Header;
