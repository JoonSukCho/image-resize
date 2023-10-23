export interface ModalProps {
  children?: React.ReactNode;
  open: boolean;
  onClose?: () => void;
  disableBackDropClick?: boolean;
  keepMount?: boolean;
}
