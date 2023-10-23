import React, { useState } from 'react';
import { Button, FileUploadButton } from 'src/components/Button';
import styled from 'styled-components';
import { Card, CardHeader, CardBody } from 'src/components/Card';
import { TbArrowsExchange } from 'react-icons/tb';
import FileItem from 'src/components/FileItem';
import { v4 as uuidv4 } from 'uuid';

interface FileListItem {
  id: string;
  originFile: File;
}

const ResizeImageCard = () => {
  const [fileList, setFileList] = useState<FileListItem[]>([]);

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
        <Title>RESIZER</Title>
      </CardHeader>
      <CardBody>
        <FileUploadButtonWrapper>
          <FileUploadButton multiple onChange={handleFileChange} />
        </FileUploadButtonWrapper>
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

const FileUploadButtonWrapper = styled.div``;

const Title = styled.h1`
  padding: 1rem 0;
  font-size: 1.25rem;
`;

export default ResizeImageCard;
