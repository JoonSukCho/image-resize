import styled from 'styled-components';
import React from 'react';

interface CardProps {
  children: React.ReactNode;
}

const Card = ({ children }: CardProps) => {
  return <Container>{children}</Container>;
};

const Container = styled.div`
  background: #ffffff;
  border-radius: 1rem;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 1px 1px -1px;
`;

export default Card;
