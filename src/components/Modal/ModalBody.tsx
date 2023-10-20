import React from 'react';
import styled from 'styled-components';

interface ModalBodyProps {
  children?: React.ReactNode;
}

const ModalBody = ({ children }: ModalBodyProps) => {
  return <Container>{children}</Container>;
};

const Container = styled.div``;

export default ModalBody;
