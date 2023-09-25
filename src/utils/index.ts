export const formatFileSize = (fileSizeInBytes: number): string => {
  if (fileSizeInBytes < 1024 ** 2) {
    return (fileSizeInBytes / 1024).toFixed(1) + 'KB';
  }

  if (fileSizeInBytes < 1024 ** 3) {
    return (fileSizeInBytes / 1024 ** 2).toFixed(1) + 'MB';
  }

  if (fileSizeInBytes < 1024 ** 4) {
    return (fileSizeInBytes / 1024 ** 3).toFixed(1) + 'GB';
  }

  return fileSizeInBytes + 'Bytes';
};
