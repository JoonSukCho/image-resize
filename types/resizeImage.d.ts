type ToFormatTypes = 'png' | 'jpeg' | 'gif' | 'webp';

interface ResizeImageOptions {
  width: number;
  height: number;
  toFormat: ToFormatTypes;
  quality: number;
}
