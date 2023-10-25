import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import { Button, IconButton } from './Button';
import { IoMdSettings } from 'react-icons/io';
import { AiOutlineClose } from 'react-icons/ai';
import { fileDownload, formatFileSize } from 'src/utils';
import { resizeImageService } from 'service/imageResizeService';
import ResizeOptionModal from './Modal/ResizeOptionModal';
import useModal from 'hooks/useModal';

interface FileItemProps {
  originFile: File;
  handleRemoveItem: () => void;
}

const INITIAL_OPTIONS: ResizeImageOptions = {
  width: 300,
  height: 300,
  toFormat: 'webp',
  quality: 85,
  isAnimated: false,
};

const FileItem = ({ originFile, handleRemoveItem }: FileItemProps) => {
  const [resizedImage, setResizedImage] = useState<string | null>(null);
  const [resizedImageSize, setResizedImageSize] = useState<string | null>(null);
  const [options, setOptions] = useState<ResizeImageOptions>(INITIAL_OPTIONS);

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

  const handleResize = async () => {
    try {
      const formData = new FormData();
      formData.append('image', originFile);
      formData.append('options', JSON.stringify(options));

      const response = await resizeImageService({
        imageFormData: formData,
        options,
      });

      if (response.status === 200) {
        const blob = new Blob([response.data], {
          type: `image/${options.toFormat}`,
        });

        const url = URL.createObjectURL(blob);

        setResizedImage(url);
        setResizedImageSize(formatFileSize(blob.size));
      }
    } catch (error) {
      console.log(error);
      alert('Something went wrong!');
    }
  };

  const handleFileDownload = () => {
    const splitedOriginFileName = originFile.name.split('.');
    splitedOriginFileName.pop(); // 확장자 제거
    const originFileName = splitedOriginFileName.join('');

    if (resizedImage) {
      fileDownload(resizedImage, `${originFileName}.${options.toFormat}`);
    }
  };

  // 원본 이미지 사이즈로 옵션 설정
  useEffect(() => {
    const img = new Image();
    img.src = URL.createObjectURL(originFile);

    img.onload = () => {
      setOptions((prev) => ({ ...prev, width: img.width, height: img.height }));
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
            <IconButton color="third" onClick={handleRemoveItem}>
              <AiOutlineClose size={20} />
            </IconButton>
          </Utilities>
        </FileInformation>
      </FileInformationWrapper>
      <Utilities>
        <Button onClick={handleResize}>변환하기</Button>
        {resizedImage && (
          <>
            <Button
              onClick={() => {
                openPreviewImageOnNewWindow(resizedImage);
              }}
            >
              미리보기
            </Button>
            <Button color="primary" onClick={handleFileDownload}>
              다운로드 {resizedImageSize && `(${resizedImageSize})`}
            </Button>
          </>
        )}
      </Utilities>

      <ResizeOptionModal
        open={isOpenResizeOptionModal}
        onClose={closeResizeOptionModal}
        options={options}
        setOptions={setOptions}
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
