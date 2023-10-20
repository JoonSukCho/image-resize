import React from 'react';
import { ModalProps } from './Modal.types';
import { Button } from '../Button';
import { Input } from '../Input';
import {
  ModalBody,
  ModalHeader,
  ModalFooter,
  Modal,
} from 'src/components/Modal';
import styled from 'styled-components';
import { Select } from '../Select';

interface ResizeOptionModalProps extends ModalProps {}

const ResizeOptionModal = ({ open, onClose }: ResizeOptionModalProps) => {
  return (
    <Modal open={open} onClose={onClose}>
      <ModalHeader>OPTIONS</ModalHeader>
      <ModalBody>
        <Rows>
          <Row>
            <Input label="Width" type="number" />
            <Input label="Height" type="number" />
          </Row>
          <Row>
            <Input label="Quality" type="number" />
            <Select />
          </Row>
        </Rows>
      </ModalBody>
      <ModalFooter>
        <ButtonContainer>
          <Button color="third" onClick={onClose}>
            닫기
          </Button>
          <Button onClick={() => {}}>적용</Button>
        </ButtonContainer>
      </ModalFooter>
    </Modal>
  );
};

const Rows = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Row = styled.div`
  display: flex;
  gap: 1rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
`;

export default ResizeOptionModal;
