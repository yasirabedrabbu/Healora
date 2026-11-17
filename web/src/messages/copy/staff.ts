/**
 * Aggregated UI copy for staff-facing pages (doctor / hospital / admin),
 * per locale. Split across staff-doctor / staff-hospital / staff-admin
 * to keep every file under the 200-line limit.
 */

import { staffDoctorCopy } from "./staff-doctor";
import { patientHomeCopy, type PatientHomeCopy } from "./staff-patient";
import { staffClinicalCopy } from "./staff-clinical";
import { staffHospitalCopy } from "./staff-hospital";
import { staffAdminCopy } from "./staff-admin";

export type StaffCopy = import("./staff-patient").PatientHomeCopy &
  import("./staff-doctor").StaffDoctorCopy &
  import("./staff-clinical").StaffClinicalCopy &
  import("./staff-hospital").StaffHospitalCopy &
  import("./staff-admin").StaffAdminCopy;

type StaffPageCopy = { [K in keyof StaffCopy]: { bn: StaffCopy[K]; en: StaffCopy[K] } };

const bn = {
  ...patientHomeCopy.bn,
  ...staffDoctorCopy.bn,
  ...staffClinicalCopy.bn,
  ...staffHospitalCopy.bn,
  ...staffAdminCopy.bn,
};
const en = {
  ...patientHomeCopy.en,
  ...staffDoctorCopy.en,
  ...staffClinicalCopy.en,
  ...staffHospitalCopy.en,
  ...staffAdminCopy.en,
};

export const copy: StaffPageCopy = {
  dashboardHome: { bn: bn.dashboardHome, en: en.dashboardHome },
  doctorDashboard: { bn: bn.doctorDashboard, en: en.doctorDashboard },
  doctorPatients: { bn: bn.doctorPatients, en: en.doctorPatients },
  doctorPrescribe: { bn: bn.doctorPrescribe, en: en.doctorPrescribe },
  doctorSchedule: { bn: bn.doctorSchedule, en: en.doctorSchedule },
  doctorEarnings: { bn: bn.doctorEarnings, en: en.doctorEarnings },
  hospitalDashboard: { bn: bn.hospitalDashboard, en: en.hospitalDashboard },
  hospitalQueue: { bn: bn.hospitalQueue, en: en.hospitalQueue },
  hospitalBeds: { bn: bn.hospitalBeds, en: en.hospitalBeds },
  hospitalRoster: { bn: bn.hospitalRoster, en: en.hospitalRoster },
  adminVerification: { bn: bn.adminVerification, en: en.adminVerification },
  adminPayments: { bn: bn.adminPayments, en: en.adminPayments },
};
