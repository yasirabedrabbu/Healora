export interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

export interface TabsProps {
  items: TabItem[];
  value: string;
  onChange: (id: string) => void;
  /** Pill style for mobile scroll rails. */
  variant?: "underline" | "pill";
  className?: string;
  ariaLabel: string;
}