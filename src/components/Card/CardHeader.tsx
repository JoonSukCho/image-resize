import styled from '@emotion/styled';
import React from 'react';

interface CardHeaderProps {
  children: React.ReactNode;
}

const CardHeader = ({ children }: CardHeaderProps) => {
  return <Container>{children}</Container>;
};

const Container = styled.div`
  padding: 1rem 1rem 0 1rem;
`;

export default CardHeader;
