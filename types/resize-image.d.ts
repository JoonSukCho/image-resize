type ToFormatTypes = 'png' | 'jpeg' | 'gif' | 'webp';

interface ResizeImageOption {
  width: number;
  height: number;
  toFormat: ToFormatTypes;
  quality: number;
  isAnimated: boolean;
}

interface FileListItem {
  id: string;
  originFile: File;
  resizedImageFile: null | {
    blob: Blob;
    url: string;
  };
  resizeImageOption: ResizeImageOption;
}

interface ResizeImageActions {
  addFiles: (files: FileList) => void;
  removeFile: (id: string) => void;
  setResizeFileOption: (id: string, option: Partial<ResizeImageOption>) => void;
  setResizedImage: (
    id: string,
    resizedImageFile: { blob: Blob; url: string }
  ) => void;
}
