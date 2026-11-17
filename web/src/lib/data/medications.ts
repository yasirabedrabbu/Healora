/** Mock "My medications" list for the prescriptions grid (real DB is still empty). */

export type MedicationStatus = "active" | "paused" | "completed";

export type Medication = {
  id: string;
  prescriptionId?: string;
  name: string;
  brand: string;
  strength: string;
  status: MedicationStatus;
  tabletsLeft: number;
  tabletsTotal: number;
  daysLeft: number;
  doctor: string;
  nextDose: string;
};

export const medications: Medication[] = [
  {
    id: "m1",
    name: "Metformin",
    brand: "Glucophage",
    strength: "500 mg",
    status: "active",
    tabletsLeft: 10,
    tabletsTotal: 30,
    daysLeft: 7,
    doctor: "Dr. Mahmud Rahman",
    nextDose: "17 Nov 2026, 8:00 AM",
  },
  {
    id: "m2",
    name: "Atorvastatin",
    brand: "Lipitor",
    strength: "10 mg",
    status: "active",
    tabletsLeft: 24,
    tabletsTotal: 30,
    daysLeft: 21,
    doctor: "Dr. Sadia Akter",
    nextDose: "17 Nov 2026, 10:00 PM",
  },
  {
    id: "m3",
    name: "Lisinopril",
    brand: "Zestril",
    strength: "10 mg",
    status: "paused",
    tabletsLeft: 18,
    tabletsTotal: 30,
    daysLeft: 15,
    doctor: "Dr. Mahmud Rahman",
    nextDose: "20 Nov 2026, 8:00 AM",
  },
  {
    id: "m4",
    name: "Vitamin D3",
    brand: "D-Rex",
    strength: "60000 IU",
    status: "active",
    tabletsLeft: 4,
    tabletsTotal: 8,
    daysLeft: 3,
    doctor: "Dr. Farhana Karim",
    nextDose: "19 Nov 2026, 12:00 PM",
  },
  {
    id: "m5",
    name: "Amoxicillin",
    brand: "Moxacil",
    strength: "500 mg",
    status: "completed",
    tabletsLeft: 0,
    tabletsTotal: 21,
    daysLeft: 0,
    doctor: "Dr. Sadia Akter",
    nextDose: "02 Nov 2026, 9:00 AM",
  },
];