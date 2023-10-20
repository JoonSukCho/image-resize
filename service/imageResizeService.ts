import axios, { AxiosProgressEvent } from 'axios';

interface ResizeImageRequestParams {
  imageFormData: FormData;
  options: ResizeImageOptions;
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void;
  onDownloadProgress?: (progressEvent: AxiosProgressEvent) => void;
}

export const resizeImageService = async ({
  imageFormData,
  options,
  onUploadProgress,
  onDownloadProgress,
}: ResizeImageRequestParams) => {
  return await axios.post('/api/resize-image', imageFormData, {
    responseType: 'blob',
    onUploadProgress,
    onDownloadProgress,
    params: options,
  });
};
