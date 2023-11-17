import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import { Button, IconButton } from './Button';
import { IoMdSettings } from 'react-icons/io';
import { AiOutlineClose } from 'react-icons/ai';
import { fileDownload, formatFileSize } from 'src/utils';
import { resizeImageService } from 'service/imageResizeService';
import ResizeOptionModal from './Modal/ResizeOptionModal';
import useModal from 'hooks/useModal';
import {
  useResizeImageAction,
  useResizeImageValue,
} from 'context/ResizeImageContext';

interface FileItemProps {
  id: string;
}

const FileItem = ({ id }: FileItemProps) => {
  const { removeFile, setResizeFileOption } = useResizeImageAction();
  const { fileList } = useResizeImageValue();
  const { originFile, resizedImageFile, resizeImageOption } = fileList.filter(
    (v) => v.id === id
  )[0];

  const [
    isOpenResizeOptionModal,
    openResizeOptionModal,
    closeResizeOptionModal,
  ] = useModal();

  const openOriginImageOnNewWindow = (
    e: React.MouseEvent<HTMLAnchorElement>
  ) => {
    e.preventDefault();

    const imageUrl = URL.createObjectURL(originFile);
    window.open(imageUrl, '_blank');
  };

  const openPreviewImageOnNewWindow = (previewImageSrc: string) => {
    const newTab = window.open(previewImageSrc);
    newTab?.focus();
  };

  const handleRemoveFile = () => {
    removeFile(id);
  };

  const handleFileDownload = () => {
    const splitedOriginFileName = originFile.name.split('.');
    splitedOriginFileName.pop(); // 확장자 제거
    const originFileName = splitedOriginFileName.join('');

    if (resizedImageFile) {
      fileDownload(
        resizedImageFile.url,
        `${originFileName}.${resizeImageOption.toFormat}`
      );
    }
  };

  // 원본 이미지 사이즈로 옵션 설정
  useEffect(() => {
    const img = new Image();
    img.src = URL.createObjectURL(originFile);

    img.onload = () => {
      setResizeFileOption(id, {
        width: img.width,
        height: img.height,
      });
    };
  }, [originFile]);

  return (
    <Container>
      <FileInformationWrapper>
        <FileInformation>
          <FileNameAnchor onClick={openOriginImageOnNewWindow}>
            {originFile.name}({formatFileSize(originFile.size)})
          </FileNameAnchor>
          <Utilities>
            <IconButton color="secondary" onClick={openResizeOptionModal}>
              <IoMdSettings size={20} />
            </IconButton>
            <IconButton color="third" onClick={handleRemoveFile}>
              <AiOutlineClose size={20} />
            </IconButton>
          </Utilities>
        </FileInformation>
      </FileInformationWrapper>
      <Utilities>
        {/* <Button onClick={handleResize}>변환하기</Button> */}
        {resizedImageFile && (
          <>
            <Button
              onClick={() => {
                openPreviewImageOnNewWindow(resizedImageFile.url);
              }}
            >
              미리보기
            </Button>
            <Button color="primary" onClick={handleFileDownload}>
              다운로드{' '}
              {resizedImageFile &&
                `(${formatFileSize(resizedImageFile.blob.size)})`}
            </Button>
          </>
        )}
      </Utilities>

      <ResizeOptionModal
        id={id}
        open={isOpenResizeOptionModal}
        onClose={closeResizeOptionModal}
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;

  position: relative;
  min-height: 80px;
`;

const FileInformationWrapper = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;

  width: calc(50% - 2rem);
  border: 1px solid #b6b6b6;
  border-radius: 4px;
  background-color: rgba(231, 235, 240, 0.3);
  border-color: #7e7d7d;
`;

const FileInformation = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 1rem;
  height: 100%;
`;

const FileNameAnchor = styled.a`
  cursor: pointer;

  font-weight: 600;
  color: ${({ theme }) => theme.color.third};
  text-decoration: underline;
  text-underline-offset: 4px;
`;

const Utilities = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-left: 0.5rem;
`;

export default FileItem;
