import React, { useState, useMemo, useContext, createContext } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface ResizeImageProviderProps {
  children: React.ReactNode;
}

interface ResizeImageValueContext {
  fileList: FileListItem[];
}

export const ResizeImageValueContext = createContext<
  ResizeImageValueContext | undefined
>(undefined);

export const ResizeImageActionContext = createContext<
  ResizeImageActions | undefined
>(undefined);

export const useResizeImageValue = () => {
  const value = useContext(ResizeImageValueContext);

  if (value === undefined) {
    throw new Error(
      'useResizeImageValue should be used within ResizeImageProvider'
    );
  }

  return value;
};

export const useResizeImageAction = () => {
  const value = useContext(ResizeImageActionContext);

  if (value === undefined) {
    throw new Error(
      'useResizeImageAction should be used within ResizeImageProvider'
    );
  }

  return value;
};

export const ResizeImageProvider = ({ children }: ResizeImageProviderProps) => {
  const INITIAL_OPTIONS: ResizeImageOption = {
    width: 300,
    height: 300,
    toFormat: 'webp',
    quality: 85,
    isAnimated: false,
  };

  const [fileList, setFileList] = useState<FileListItem[]>([]);

  const actions = useMemo<ResizeImageActions>(
    () => ({
      addFiles(files) {
        const selectedFiles = Array.from(files);

        selectedFiles.forEach((selectedFile) => {
          setFileList((prev) =>
            prev.concat({
              id: uuidv4(),
              originFile: selectedFile,
              resizedImageFile: null,
              resizeImageOption: INITIAL_OPTIONS,
            })
          );
        });
      },
      removeFile(id) {
        if (!confirm('삭제하시겠습니까?')) return;

        setFileList((prev) => prev.filter((prevValue) => prevValue.id !== id));
      },
      setResizeFileOption(id, option) {
        setFileList((prev) =>
          prev.map((prevFileListItem) =>
            prevFileListItem.id === id
              ? {
                  ...prevFileListItem,
                  resizeImageOption: {
                    ...prevFileListItem.resizeImageOption,
                    ...option,
                  },
                }
              : prevFileListItem
          )
        );
      },
      setResizedImage(id, resizedImageFile) {
        setFileList((prev) =>
          prev.map((prevFileListItem) =>
            prevFileListItem.id === id
              ? {
                  ...prevFileListItem,
                  resizedImageFile,
                }
              : prevFileListItem
          )
        );
      },
    }),
    []
  );

  return (
    <ResizeImageActionContext.Provider value={actions}>
      <ResizeImageValueContext.Provider value={{ fileList }}>
        {children}
      </ResizeImageValueContext.Provider>
    </ResizeImageActionContext.Provider>
  );
};
