import React from 'react';
import styled from 'styled-components';

interface ModalFooterProps {
  children?: React.ReactNode;
}

const ModalFooter = ({ children }: ModalFooterProps) => {
  return <Container>{children}</Container>;
};

const Container = styled.div`
  padding-top: 2rem;
`;

export default ModalFooter;
