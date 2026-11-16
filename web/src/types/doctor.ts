export type Doctor = {
  id: string;
  name: string;
  specialty: string;
  degrees: string;
  bmdcNo: string;
  fee: number;
  languages: string[];
  modes: ("video" | "audio" | "chat" | "chamber")[];
  rating: number;
  verified: boolean;
  nextSlot: string;
};