import styled from 'styled-components';
import React from 'react';
import { Button, IconButton } from './Button';
import { IoMdSettings } from 'react-icons/io';
import { AiOutlineClose } from 'react-icons/ai';
import { formatFileSize } from 'src/utils';

interface FileItemProps {
  originFile: File;
  handleRemoveItem: () => void;
}

const FileItem = ({ originFile, handleRemoveItem }: FileItemProps) => {
  const openOriginImageOnNewWindow = (
    e: React.MouseEvent<HTMLAnchorElement>
  ) => {
    e.preventDefault();

    const imageUrl = URL.createObjectURL(originFile);
    window.open(imageUrl, '_blank');
  };

  const openPreviewImageOnNewWindow = () => {
    const base64Image = new Image();
    base64Image.src = '';
    const w = window.open();
    w?.document.write(base64Image.outerHTML);
  };

  return (
    <Container>
      <FileInfo>
        <a className="fileName" onClick={openOriginImageOnNewWindow}>
          {originFile.name}({formatFileSize(originFile.size)})
        </a>
        <div>
          <IconButton>
            <IoMdSettings size={20} />
          </IconButton>
          <IconButton
            color="#f00"
            backgroundColor="#ffffff"
            onClick={handleRemoveItem}
          >
            <AiOutlineClose size={20} />
          </IconButton>
        </div>
      </FileInfo>
      <Utilities>
        <Button>변환하기</Button>
        <Button onClick={openPreviewImageOnNewWindow}>미리보기</Button>
      </Utilities>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;

  position: relative;
  min-height: 80px;
`;

const FileInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 1rem;
  min-width: 50%;
  height: 100%;
  border: 1px solid #b6b6b6;
  border-radius: 8px;
  background-color: rgba(231, 235, 240, 0.3);
  border-color: #7e7d7d;

  & .fileName {
    cursor: pointer;

    font-weight: 600;
    color: ${({ theme }) => theme.color.third};
    text-decoration: underline;
    text-underline-offset: 4px;
  }
`;

const Utilities = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-left: 0.5rem;
`;

export default FileItem;
