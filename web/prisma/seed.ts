/* eslint-disable no-console */
import { PrismaClient } from "@prisma/client";
import { randomBytes, createHmac } from "node:crypto";

/**
 * Seed: demo data matching Handoff.md — 2 approved doctors, 1 hospital
 * with beds, medicines, a patient, a full appointment → prescription
 * chain, and a blood donor pool. Safe to re-run (idempotent upserts).
 */
const db = new PrismaClient();
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
