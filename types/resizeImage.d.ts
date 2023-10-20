interface ResizeImageOptions {
  width: number;
  height: number;
  toFormat: 'png' | 'jpeg' | 'gif' | 'webp';
  quality?: number;
}
