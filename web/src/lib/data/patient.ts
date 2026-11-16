export const patientProfile = {
  name: "Rahim Uddin",
  bloodGroup: "B+",
  nextAppointment: "Aaj, 6:30 PM · Dr. Mahmud Rahman",
};

export const records = [
  { id: "r1", title: "Blood test report", date: "10 Nov 2026", type: "Lab", shared: false },
  { id: "r2", title: "X-ray chest", date: "02 Nov 2026", type: "Imaging", shared: true },
];

export const prescriptions = [
  {
    id: "p1",
    doctor: "Dr. Mahmud Rahman",
    regNo: "A-00000",
    date: "16 Nov 2026",
    validUntil: "16 Dec 2026",
    status: "valid" as const,
    medicines: [
      { name: "Paracetamol 500mg", dose: "1+1+1", duration: "5 din" },
      { name: "ORS", dose: "Pani-r sathe", duration: "3 din" },
    ],
  },
  {
    id: "p2",
    doctor: "Dr. Sadia Akter",
    regNo: "A-00001",
    date: "02 Oct 2026",
    validUntil: "02 Nov 2026",
    status: "expired" as const,
    medicines: [{ name: "Vitamin D3", dose: "1 ta/din", duration: "30 din" }],
  },
];

export const bloodRequests = [
  { id: "b1", group: "B+", area: "Dhanmondi", status: "open" as const, urgency: "Urgent" },
];

export const familyMembers = [
  { id: "f1", name: "Rahima Uddin", relation: "Stri", bloodGroup: "O+" },
  { id: "f2", name: "Karim Uddin", relation: "Chele", bloodGroup: "B+" },
];