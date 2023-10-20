export interface CustomTheme {
  color: Record<ColorType, string>;
  breakpoints: Record<BreakPointType, string>;
}

export type ColorType = 'primary' | 'secondary' | 'third' | 'textPrimary';
export type BreakPointType = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
