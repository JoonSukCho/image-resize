import React from 'react';
import styled from 'styled-components';

interface ModalHeaderProps {
  children?: React.ReactNode;
}

const ModalHeader = ({ children }: ModalHeaderProps) => {
  return (
    <Container>
      <Title>{children}</Title>
    </Container>
  );
};

const Container = styled.div`
  padding-bottom: 2rem;
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.color.textPrimary};
  font-weight: 800;
`;

export default ModalHeader;
