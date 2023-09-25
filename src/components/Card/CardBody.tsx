import styled from '@emotion/styled';
import React from 'react';

interface CardBodyProps {
  children: React.ReactNode;
}

const CardBody = ({ children }: CardBodyProps) => {
  return <Container>{children}</Container>;
};

const Container = styled.div`
  padding: 1rem;
`;

export default CardBody;
