import styled from 'styled-components';
import React, { InputHTMLAttributes } from 'react';
import { BsPlusSquare } from 'react-icons/bs';

interface FileUploadButtonProps extends InputHTMLAttributes<HTMLInputElement> {}

const FileUploadButton = ({ ...rest }: FileUploadButtonProps) => {
  return (
    <Container>
      <FileInput type="file" id="file-upload" accept="image/*" {...rest} />
      <FileLabel htmlFor="file-upload">
        <LabelContent>
          <BsPlusSquare size={24} />
          <p className="labelText">ADD FILE</p>
        </LabelContent>
      </FileLabel>
    </Container>
  );
};

const Container = styled.div`
  position: relative;

  width: 100%;
  height: 100%;
  min-height: 80px;

  border: 1px dashed #b6b6b6;
  border-radius: 8px;
  color: #b6b6b6;

  background-color: rgba(231, 235, 240, 0.3);
  border-color: #7e7d7d;
`;

const FileInput = styled.input`
  display: none;
`;

const FileLabel = styled.label`
  cursor: pointer;
  position: absolute;
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
`;

const LabelContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;

  text-align: center;

  & .labelText {
  }
`;

export default FileUploadButton;
