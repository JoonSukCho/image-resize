import React, { useState } from 'react';
import { Button, FileUploadButton } from 'src/components/Button';
import styled from 'styled-components';
import { Card, CardHeader, CardBody } from 'src/components/Card';
import { BsArrowRepeat } from 'react-icons/bs';
import FileItem from 'src/components/FileItem';
import {
  useResizeImageAction,
  useResizeImageValue,
} from 'context/ResizeImageContext';
import { resizeImageService } from 'service/imageResizeService';

const ResizeImageCard = () => {
  const { fileList } = useResizeImageValue();
  const { addFiles, setResizedImage } = useResizeImageAction();

  const [resizedFileCount, setResizedFileCount] = useState(0);
  const isResizing =
    resizedFileCount > 0 && resizedFileCount !== fileList.length;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      addFiles(e.target.files);
    }
  };

  const handleResizeAllFile = async () => {
    setResizedFileCount(0);

    try {
      fileList.forEach(async (fileItem) => {
        const { id, originFile, resizeImageOption } = fileItem;

        const formData = new FormData();
        formData.append('image', originFile);
        formData.append('options', JSON.stringify(resizeImageOption));

        const response = await resizeImageService({
          imageFormData: formData,
          options: resizeImageOption,
        });

        const blob = new Blob([response.data], {
          type: `image/${resizeImageOption.toFormat}`,
        });

        const url = URL.createObjectURL(blob);

        setResizedFileCount((prev) => prev + 1);
        setResizedImage(id, { blob, url });
      });
    } catch (error) {
      console.log(error);
      alert('Something went wrong!');
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <ActionButtonsContainer>
            {/* <Button color="primary" startIcon={<MdUploadFile />}>
              업로드
            </Button> */}
            <Button
              color="secondary"
              startIcon={<BsArrowRepeat />}
              disabled={fileList.length === 0}
              onClick={handleResizeAllFile}
            >
              변환하기
            </Button>
            {isResizing && (
              <div>
                변환중... ({resizedFileCount} / {fileList.length})
              </div>
            )}
          </ActionButtonsContainer>
        </CardHeader>
        <CardBody>
          <div>
            <FileUploadButton multiple onChange={handleFileChange} />
          </div>
          <FileList>
            {fileList.map((fileItem) => (
              <FileItem key={fileItem.id} id={fileItem.id} />
            ))}
          </FileList>
        </CardBody>
      </Card>
    </>
  );
};

const FileList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  margin-top: 16px;
`;

const ActionButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export default ResizeImageCard;
