export interface AccordionItemData {
  id: string;
  question: string;
  answer: string;
}

export type AccordionProps = {
  items: AccordionItemData[];
  /** Controlled open id; omit for uncontrolled. */
  openId?: string | null;
  onOpenChange?: (id: string | null) => void;
  className?: string;
};
