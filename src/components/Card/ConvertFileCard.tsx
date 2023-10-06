import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, FileUploadButton, IconButton } from 'src/components/Button';
import styled from 'styled-components';
import { Card, CardHeader, CardBody } from 'src/components/Card';
import { TbArrowsExchange } from 'react-icons/tb';
import FileItem from 'src/components/FileItem';
import { v4 as uuidv4 } from 'uuid';

interface FileListItem {
  id: string;
  originFile: File;
  options: {
    foo: string;
    bar: number;
  };
}

const ConvertFileCard = () => {
  const [fileList, setFileList] = useState<FileListItem[]>([]);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const formData = new FormData();
      formData.append('image', file);

      const options = {
        width: 300,
        height: 300,
      };

      formData.append('options', JSON.stringify(options));

      try {
        const response = await axios.post('/api/resize-image', formData, {
          responseType: 'blob',
          onUploadProgress: (progressEvent) => {
            const { progress } = progressEvent;
            console.log('progressEvent', progressEvent);

            if (progress && progress > 0) {
              console.log(Math.round(progress * 100));
            }
          },
        });

        if (response.status === 200) {
          // 리사이징 된 이미지를 표시
          const blob = new Blob([response.data], { type: file.type });
          const url = URL.createObjectURL(blob);

          // 변환 파일 미리보기
          window.open(url, '_blank');

          //   파일 다운로드
          //   const a = document.createElement('a');
          //   document.body.appendChild(a);
          //   a.download = `converted_${file.name}`;
          //   a.href = url;
          //   a.click();
          //   document.body.removeChild(a);
          //   window.URL.revokeObjectURL(url);
        } else {
          console.error('API 호출 실패:', response.statusText);
        }
      } catch (error) {
        console.error('API 호출 중 오류 발생:', error);
      }
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      console.log('?');

      selectedFiles.forEach((selectedFile) => {
        setFileList((prev) =>
          prev.concat({
            id: uuidv4(),
            originFile: selectedFile,
            options: {
              foo: '',
              bar: 0,
            },
          })
        );
      });
    }
  };

  const handleRemoveFile = (id: string) => {
    setFileList((prev) =>
      prev.filter((prevFileItem) => prevFileItem.id !== id)
    );
  };

  return (
    <Card>
      <CardHeader>
        <Button startIcon={<TbArrowsExchange />}>CONVERT ALL</Button>
      </CardHeader>

      <CardBody>
        <FileList>
          {fileList.map((fileItem, index) => (
            <FileItem
              key={index}
              originFile={fileItem.originFile}
              handleRemoveItem={() => handleRemoveFile(fileItem.id)}
            />
          ))}
        </FileList>
        <FileUploadButtonWrapper>
          <FileUploadButton multiple onChange={handleImageChange} />
          {/* <FileUploadButton multiple onChange={handleFileChange} /> */}
        </FileUploadButtonWrapper>
      </CardBody>
    </Card>
  );
};

const FileList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  margin-bottom: 16px;
`;

const FileUploadButtonWrapper = styled.div`
  max-width: 50%;
`;

export default ConvertFileCard;
