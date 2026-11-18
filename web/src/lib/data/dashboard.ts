/**
 * Mock dashboard-home data for the patient portal (real DB is still empty).
 * Only values live here; every visible label comes from the copy modules.
 */

export type DoseState = "taken" | "missed" | "upcoming";

export type AppointmentKind = "checkup" | "followUp";

export type Appointment = {
  id: string;
  kind: AppointmentKind;
  doctor: string;
  when: string;
};

export type RefillItem = {
  id: string;
  name: string;
  daysLeft: number;
};

export type ScheduleDose = {
  id: string;
  name: string;
  dose: string;
  hour: number;
  state: DoseState;
  inHours?: number;
};

/** Doses already taken / scheduled for today. */
export const dosesToday = { taken: 2, total: 5, next: { name: "Metformin", time: "13:00" } };

/** Weekly adherence as percentages, Sunday to Saturday. */
export const adherenceWeek = [80, 100, 60, 100, 40, 90, 70];

/** Index of today inside the week strip (0 = Sunday). */
export const todayIndex = 2;

export const appointments: Appointment[] = [
  { id: "a1", kind: "checkup", doctor: "Dr. Mahmud Rahman", when: "2026-11-18T18:30:00+06:00" },
  { id: "a2", kind: "followUp", doctor: "Dr. Sadia Akter", when: "2026-11-20T11:00:00+06:00" },
];

export const refills: RefillItem[] = [
  { id: "rf1", name: "Vitamin D3", daysLeft: 3 },
  { id: "rf2", name: "Metformin", daysLeft: 7 },
  { id: "rf3", name: "Lisinopril", daysLeft: 15 },
];

export const scheduleDoses: ScheduleDose[] = [
  { id: "sd1", name: "Amoxicillin", dose: "500 mg", hour: 9, state: "missed" },
  { id: "sd2", name: "Metformin", dose: "500 mg", hour: 13, state: "taken" },
  { id: "sd3", name: "Lisinopril", dose: "10 mg", hour: 17, state: "upcoming", inHours: 3 },
  { id: "sd4", name: "Atorvastatin", dose: "10 mg", hour: 21, state: "upcoming", inHours: 8 },
];

/** Current hour used to place the "now" marker on the timeline. */
export const currentHour = 14;
