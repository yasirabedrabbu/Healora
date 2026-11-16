export type DashboardNavItem = {
  label: string;
  href: string;
};

export const patientNav: DashboardNavItem[] = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Medical record", href: "/records" },
  { label: "Prescription", href: "/prescriptions" },
  { label: "Blood", href: "/blood" },
  { label: "Family", href: "/family" },
];