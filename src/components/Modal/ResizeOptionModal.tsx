import React, { SetStateAction, useEffect } from 'react';
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
import { useForm, Controller } from 'react-hook-form';
import { Switch } from '../Switch';
import {
  useResizeImageAction,
  useResizeImageValue,
} from 'context/ResizeImageContext';

interface ResizeOptionModalProps extends ModalProps {
  id: string;
}

type ToFormatOption = { label: ToFormatTypes; value: ToFormatTypes };

const ResizeOptionModal = ({ id, open, onClose }: ResizeOptionModalProps) => {
  const { setResizeFileOption } = useResizeImageAction();
  const { fileList } = useResizeImageValue();
  const { resizeImageOption } = fileList.filter((v) => v.id === id)[0];

  const toFormatOptions: ToFormatOption[] = [
    {
      label: 'webp',
      value: 'webp',
    },
    {
      label: 'png',
      value: 'png',
    },
    {
      label: 'gif',
      value: 'gif',
    },
    {
      label: 'jpeg',
      value: 'jpeg',
    },
  ];

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { isDirty, errors },
  } = useForm<ResizeImageOption>();

  const widthRegister = register('width', {
    min: 0,
    required: true,
    valueAsNumber: true,
  });

  const heightRegister = register('height', {
    min: 0,
    required: true,
    valueAsNumber: true,
  });

  const qualityRegister = register('quality', {
    min: 0,
    max: 100,
    required: true,
    valueAsNumber: true,
  });

  const isAnimatedRegister = register('isAnimated');

  const handleRegister = (data: ResizeImageOption) => {
    setResizeFileOption(id, data);

    if (onClose) {
      onClose();
    }
  };

  const handleClose = (e: React.MouseEvent) => {
    e.preventDefault();

    if (isDirty) {
      reset(resizeImageOption);
    }

    if (onClose) {
      onClose();
    }
  };

  // set defaultValues
  useEffect(() => {
    if (open) {
      reset(resizeImageOption);
    }
  }, [open, resizeImageOption]);

  return (
    <Modal open={open} onClose={onClose} disableBackDropClick>
      <ModalHeader>OPTIONS</ModalHeader>
      <form onSubmit={handleSubmit(handleRegister)}>
        <ModalBody>
          <Rows>
            <Row>
              <Input label="Width" type="number" {...widthRegister} />
              <Input label="Height" type="number" {...heightRegister} />
            </Row>
            <Row>
              <Input label="Quality" type="number" {...qualityRegister} />
              <Controller
                name="toFormat"
                control={control}
                render={({ field: { onChange, name, value, ref } }) => (
                  <Select
                    inputId="toFormat"
                    label="Format"
                    name={name}
                    options={toFormatOptions}
                    ref={ref}
                    value={toFormatOptions.find(
                      (option) => option.value === value
                    )}
                    onChange={(option: any) => {
                      onChange(option.value);
                    }}
                  />
                )}
              />
            </Row>
            <Row>
              <Switch label="Animate" {...isAnimatedRegister} />
            </Row>
          </Rows>
          {Object.keys(errors).length > 0 && (
            <ErrorMessage>Validated</ErrorMessage>
          )}
        </ModalBody>
        <ModalFooter>
          <ButtonContainer>
            <Button color="third" onClick={handleClose}>
              닫기
            </Button>
            <Button type="submit">적용</Button>
          </ButtonContainer>
        </ModalFooter>
      </form>
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

const ErrorMessage = styled.p`
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.color.warning};
`;

export default ResizeOptionModal;
