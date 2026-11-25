import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { randomBytes, createHmac } from "node:crypto";

/**
 * Seed: demo data matching Handoff.md - 2 approved doctors, 1 hospital
 * with beds, medicines, a patient, a full appointment → prescription
 * chain, and a blood donor pool. Safe to re-run (idempotent upserts).
 */
const db = new PrismaClient({
  adapter: new PrismaPg({
    connectionString:
      process.env.DATABASE_URL ?? "postgresql://localhost:5432/healora",
  }),
});
const SECRET = process.env.AUTH_SECRET ?? "dev-only-secret-change-me";
const hash = (s: string) => createHmac("sha256", SECRET).update(s).digest("hex");

async function main() {
  const patient = await db.user.upsert({
    where: { phone: "01711111111" },
    create: { phone: "01711111111", name: "রাহিম উদ্দিন", role: "PATIENT", bloodGroup: "O+", area: "ধানমন্ডি, ঢাকা" },
    update: {},
  });

  const drRahman = await db.user.upsert({
    where: { phone: "01722222222" },
    create: { phone: "01722222222", name: "ডা. মাহমুদ রহমান", role: "DOCTOR" },
    update: {},
  });
  const drAkter = await db.user.upsert({
    where: { phone: "01733333333" },
    create: { phone: "01733333333", name: "ডা. সাদিয়া আক্তার", role: "DOCTOR" },
    update: {},
  });

  await db.doctor.upsert({
    where: { bmdcNo: "A-00000" },
    create: {
      userId: drRahman.id, bmdcNo: "A-00000", specialty: "মেডিসিন",
      degrees: "MBBS, BCS (Health)", fee: 500,
      languages: ["বাংলা", "English"], modes: ["video", "audio", "chamber"],
      verifiedStatus: "APPROVED", verifiedAt: new Date(), rating: 4.8,
    },
    update: {},
  });
  await db.doctor.upsert({
    where: { bmdcNo: "A-00001" },
    create: {
      userId: drAkter.id, bmdcNo: "A-00001", specialty: "গাইনি",
      degrees: "MBBS, FCPS", fee: 800,
      languages: ["বাংলা"], modes: ["video", "chat", "chamber"],
      verifiedStatus: "APPROVED", verifiedAt: new Date(), rating: 4.9,
    },
    update: {},
  });

  const hospital = await db.hospital.upsert({
    where: { licenseNo: "DH-12345" },
    create: {
      name: "হিলোরা জেনারেল হসপিটাল", address: "মিরপুর রোড, ঢাকা",
      lat: 23.7806, lng: 90.4193, licenseNo: "DH-12345", verifiedStatus: "APPROVED",
      beds: {
        create: [
          { type: "general", total: 50, available: 12 },
          { type: "icu", total: 10, available: 2 },
          { type: "oxygen", total: 8, available: 5 },
        ],
      },
    },
    update: {},
  });

  const hospitalOwner = await db.user.upsert({
    where: { phone: "01744444444" },
    create: { phone: "01744444444", name: "হাসপাতাল অ্যাডমিন", role: "HOSPITAL" },
    update: { role: "HOSPITAL" },
  });
  await db.hospital.update({
    where: { licenseNo: "DH-12345" },
    data: { ownerId: hospitalOwner.id },
  });

  await db.ambulance.upsert({
    where: { vehicleNumber: "DM-11-1234" },
    create: {
      hospitalId: hospital.id, vehicleNumber: "DM-11-1234", type: "BLS",
      driverName: "করিম মিয়া", driverPhone: "01755555555",
      currentLat: 23.7806, currentLng: 90.4193,
    },
    update: {},
  });

  const labOwner = await db.user.upsert({
    where: { phone: "01766666666" },
    create: { phone: "01766666666", name: "ল্যাব অ্যাডমিন", role: "LAB" },
    update: { role: "LAB" },
  });
  const lab = await db.lab.upsert({
    where: { licenseNo: "LAB-001" },
    create: {
      name: "হিলোরা ডায়াগনস্টিক", address: "ধানমন্ডি, ঢাকা",
      lat: 23.7461, lng: 90.3742, licenseNo: "LAB-001",
      verifiedStatus: "APPROVED", ownerId: labOwner.id,
    },
    update: { ownerId: labOwner.id },
  });
  for (const test of [
    { id: "test-cbc", name: "CBC (রক্তের সাধারণ পরীক্ষা)", price: 400, duration: "15 min" },
    { id: "test-sugar", name: "রক্তের সুগার (ফাস্টিং)", price: 200, duration: "10 min" },
    { id: "test-lipid", name: "লিপিড প্রোফাইল", price: 900, duration: "20 min" },
  ]) {
    await db.labTest.upsert({
      where: { id: test.id },
      create: {
        id: test.id, labId: lab.id, name: test.name, price: test.price,
        duration: test.duration, requiresFasting: test.id === "test-sugar",
      },
      update: { labId: lab.id },
    });
  }

  const pharmacyOwner = await db.user.upsert({
    where: { phone: "01777777777" },
    create: { phone: "01777777777", name: "ফার্মেসি অ্যাডমিন", role: "PHARMACY" },
    update: { role: "PHARMACY" },
  });
  await db.pharmacy.upsert({
    where: { dgdaNo: "DGDA-001" },
    create: {
      name: "হিলোরা ফার্মেসি", address: "মিরপুর রোড, ঢাকা",
      lat: 23.7806, lng: 90.4193, dgdaNo: "DGDA-001",
      verifiedStatus: "APPROVED", ownerId: pharmacyOwner.id,
    },
    update: { ownerId: pharmacyOwner.id },
  });

  const medicines = await Promise.all(
    [
      ["নাপা এক্সট্রা", "Paracetamol + Caffeine", "500mg+65mg", "tablet"],
      ["সেক্সোফেন", "Cetirizine", "10mg", "tablet"],
      ["আলাট্রল", "Alatrol", "10mg", "tablet"],
    ].map(([brandName, genericName, strength, form]) =>
      db.medicine.upsert({
        where: { id: `med-${brandName}` },
        create: { id: `med-${brandName}`, brandName, genericName, strength, form },
        update: {},
      })
    )
  );

  // Demo prescription chain (approved doctor → patient).
  const doctor = await db.doctor.findUnique({ where: { bmdcNo: "A-00000" } });
  if (doctor) {
    const qrToken = randomBytes(16).toString("hex");
    const exists = await db.prescription.findUnique({ where: { qrToken } });
    if (!exists) {
      await db.prescription.create({
        data: {
          doctorId: doctor.userId,
          patientId: patient.id,
          hash: hash(qrToken),
          qrToken,
          validUntil: new Date(Date.now() + 7 * 86_400_000),
          items: {
            create: [
              { medicineId: medicines[0].id, dose: "১+০+১", duration: "৫ দিন" },
              { medicineId: medicines[1].id, dose: "০+০+১", duration: "৭ দিন" },
            ],
          },
        },
      });
    }
  }

  await db.bloodDonor.upsert({
    where: { userId: patient.id },
    create: {
      userId: patient.id, bloodGroup: "O+",
      areaLat: 23.7806, areaLng: 90.4193,
      lastDonatedAt: new Date("2026-08-01"), verified: true,
    },
    update: {},
  });

  console.info("Seed complete:", { patient: patient.phone, hospital: hospital.name });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
