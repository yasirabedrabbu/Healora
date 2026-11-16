import type { Doctor } from "@/types/doctor";

export const doctors: Doctor[] = [
  {
    id: "dr-rahman-01",
    name: "Dr. Mahmud Rahman",
    specialty: "Medicine",
    degrees: "MBBS, BCS (Health)",
    bmdcNo: "A-00000",
    fee: 500,
    languages: ["Bangla", "English"],
    modes: ["video", "audio", "chamber"],
    rating: 4.8,
    verified: true,
    nextSlot: "??, ?:?? PM",
  },
  {
    id: "dr-akter-02",
    name: "Dr. Sadia Akter",
    specialty: "Gynecology",
    degrees: "MBBS, FCPS",
    bmdcNo: "A-00001",
    fee: 800,
    languages: ["Bangla"],
    modes: ["video", "chat", "chamber"],
    rating: 4.9,
    verified: true,
    nextSlot: "???, ??:?? AM",
  },
];