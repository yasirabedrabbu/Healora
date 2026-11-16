export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  /** max-width class, default max-w-md */
  size?: "sm" | "md" | "lg";
}
