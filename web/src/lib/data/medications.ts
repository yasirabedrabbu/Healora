export type Medication = {
  id: string;
  prescriptionId?: string; // <-- add this
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