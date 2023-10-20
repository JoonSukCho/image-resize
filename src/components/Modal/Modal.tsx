import React from 'react';
import styled from 'styled-components';
import { Portal } from '../Portal';
import { BackDrop } from '../BackDrop';
import { ModalProps } from './Modal.types';

const Modal = ({
  children,
  open,
  onClose,
  disableBackDropClick,
}: ModalProps) => {
  return (
    <Portal>
      {open && (
        <Container tabIndex={-1}>
          <BackDrop onClick={disableBackDropClick ? undefined : onClose} />
          <Wrapper>{children}</Wrapper>
        </Container>
      )}
    </Portal>
  );
};

const Container = styled.div`
  position: fixed;
  inset: 0;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  width: 600px;
  padding: 1.5rem;
  border-radius: 0.375rem;
  background-color: #ffffff;
`;

export default Modal;
