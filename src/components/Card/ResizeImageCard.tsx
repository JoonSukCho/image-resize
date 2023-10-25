import React, { useState } from 'react';
import { Button, FileUploadButton } from 'src/components/Button';
import styled from 'styled-components';
import { Card, CardHeader, CardBody } from 'src/components/Card';
import { MdUploadFile } from 'react-icons/md';
import { BsArrowRepeat } from 'react-icons/bs';
import FileItem from 'src/components/FileItem';
import { v4 as uuidv4 } from 'uuid';

interface FileListItem {
  id: string;
  originFile: File;
}

const ResizeImageCard = () => {
  const [fileList, setFileList] = useState<FileListItem[]>([]);

  // const a = [
  //   {
  //     id: 'id',
  //     originFile: new File(),
  //     resizedImageUrl: null,
  //     options: {
  //       width: 300,
  //       height: 300,
  //       toFormat: 'webp',
  //       quality: 85,
  //       isAnimated: false,
  //     },
  //   },
  // ];

  // const setOptions = (id, newOptions) => {
  //   setFileList((prev) =>
  //     prev.map((prevItem) =>
  //       prevItem.id === id
  //         ? {
  //             ...prevItem.options,
  //             ...newOptions,
  //           }
  //         : prevItem
  //     )
  //   );
  // };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);

      selectedFiles.forEach((selectedFile) => {
        setFileList((prev) =>
          prev.concat({
            id: uuidv4(),
            originFile: selectedFile,
          })
        );
      });
    }
  };

  const handleRemoveFile = (id: string) => {
    if (!confirm('삭제하시겠습니까?')) return;

    setFileList((prev) =>
      prev.filter((prevFileItem) => prevFileItem.id !== id)
    );
  };

  return (
    <Card>
      <CardHeader>
        <ActionButtonsContainer>
          <Button color="primary" startIcon={<MdUploadFile />}>
            업로드
          </Button>
          <Button
            color="secondary"
            startIcon={<BsArrowRepeat />}
            disabled={fileList.length === 0}
          >
            변환하기
          </Button>
        </ActionButtonsContainer>
      </CardHeader>
      <CardBody>
        <div>
          <FileUploadButton multiple onChange={handleFileChange} />
        </div>
        <FileList>
          {fileList.map((fileItem, index) => (
            <FileItem
              key={index}
              originFile={fileItem.originFile}
              handleRemoveItem={() => handleRemoveFile(fileItem.id)}
            />
          ))}
        </FileList>
      </CardBody>
    </Card>
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
  gap: 1rem;
`;

export default ResizeImageCard;
