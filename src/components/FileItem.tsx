import styled from 'styled-components';
import React, { useState } from 'react';
import { Button, IconButton } from './Button';
import { IoMdSettings } from 'react-icons/io';
import { AiOutlineClose } from 'react-icons/ai';
import { formatFileSize } from 'src/utils';
import { resizeImageService } from 'service/imageResizeService';
import ResizeOptionModal from './Modal/ResizeOptionModal';
import useModal from 'hooks/useModal';
import { LinearProgress } from './Progress';

interface FileItemProps {
  originFile: File;
  handleRemoveItem: () => void;
}

const FileItem = ({ originFile, handleRemoveItem }: FileItemProps) => {
  const [progress, setProgress] = useState(0);
  const [resizedImage, setResizedImage] = useState<string | null>(null);
  const [options, setOptions] = useState<ResizeImageOptions>({
    width: 0,
    height: 0,
    toFormat: 'webp',
  });

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
    setProgress(0);

    try {
      const formData = new FormData();
      formData.append('image', originFile);

      const response = await resizeImageService({
        imageFormData: formData,
        options,
        onUploadProgress: (progressEvent) => {
          const _progress = progressEvent.progress;
          console.log('upload', progressEvent);

          if (_progress && _progress > 0) {
            const toFixedProgress = Number(_progress.toFixed(2));
            setProgress(toFixedProgress * 100);
          }
        },
        onDownloadProgress: (progressEvent) => {
          console.log('download', progressEvent);
        },
      });

      if (response.status === 200) {
        const blob = new Blob([response.data], { type: originFile.type });
        console.log(formatFileSize(blob.size));

        const url = URL.createObjectURL(blob);
        setResizedImage(url);
      }
    } catch (error) {
      console.log(error);
      alert('Something went wrong!');
    }
  };

  const handleFileDownload = (file: File, url: string) => {
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.download = `resized_${file.name}`;
    a.href = url;
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <Container>
      <FileInformationWrapper>
        {progress !== 101 && (
          <div>
            <LinearProgress value={progress} />
          </div>
        )}
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
            <Button
              onClick={() => {
                handleFileDownload(originFile, resizedImage);
              }}
            >
              다운로드
            </Button>
          </>
        )}
      </Utilities>

      <ResizeOptionModal
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
