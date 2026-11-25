import { z } from "zod";

/**
 * Care-domain schemas: family profiles, labs, pharmacy, ambulance,
 * hospital queue, consultation chat, refills, push tokens, contact.
 */
export const bloodGroupSchema = z.enum([
  "A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-",
]);

const latSchema = z.number().min(-90).max(90);
const lngSchema = z.number().min(-180).max(180);

/** Accepts a date-only input or an ISO timestamp; must parse to a real date. */
const dateSchema = z
  .string()
  .min(4)
  .max(40)
  .refine((value) => !Number.isNaN(Date.parse(value)), "সঠিক তারিখ দিন");

/* ── Family profiles ─────────────────────────────────────────────── */
export const familyMemberSchema = z.object({
  name: z.string().trim().min(2).max(80),
  bloodGroup: bloodGroupSchema.nullable().optional(),
  dateOfBirth: dateSchema.nullable().optional(),
  relationship: z.enum(["spouse", "child", "parent", "other"]),
  hasOwnLogin: z.boolean().default(false),
  linkedUserId: z.string().min(1).nullable().optional(),
});

export const familyMemberUpdateSchema = familyMemberSchema.partial();

/* ── Labs ────────────────────────────────────────────────────────── */
export const labTestSchema = z.object({
  labId: z.string().min(1),
  name: z.string().trim().min(2).max(120),
  description: z.string().trim().max(600).optional(),
  price: z.number().int().min(0).max(100000),
  duration: z.string().trim().min(1).max(40),
  requiresFasting: z.boolean().default(false),
});

export const labBookingSchema = z
  .object({
    labId: z.string().min(1),
    testIds: z.array(z.string().min(1)).min(1).max(20),
    slot: z.string().datetime(),
    homeCollection: z.boolean().default(false),
    address: z.string().trim().min(5).max(300).optional(),
    lat: latSchema.optional(),
    lng: lngSchema.optional(),
  })
  .refine((data) => !data.homeCollection || Boolean(data.address), {
    message: "হোম কালেকশনের জন্য ঠিকানা দিন",
    path: ["address"],
  });

export const labBookingStatusSchema = z.object({
  status: z.enum(["SAMPLE_COLLECTED", "PROCESSING", "COMPLETED", "CANCELLED"]),
});

export const labReportSchema = z.object({
  bookingId: z.string().min(1),
  fileUrl: z.string().min(1).max(500),
  aiSummary: z.string().max(2000).optional(),
});

/* ── Pharmacy ────────────────────────────────────────────────────── */
export const pharmacyOrderSchema = z.object({
  prescriptionId: z.string().min(1),
  pharmacyId: z.string().min(1),
  notes: z.string().trim().max(500).optional(),
});

export const pharmacyOrderStatusSchema = z.object({
  status: z.enum(["VERIFIED", "PREPARING", "READY_FOR_PICKUP", "CANCELLED"]),
});

export const pharmacyDispenseSchema = z.object({
  items: z
    .array(
      z.object({
        itemId: z.string().min(1),
        quantity: z.number().int().min(1).max(20),
      })
    )
    .min(1)
    .max(20),
});

/* ── Ambulance ───────────────────────────────────────────────────── */
export const ambulanceSchema = z.object({
  hospitalId: z.string().min(1),
  vehicleNumber: z.string().trim().min(4).max(24),
  type: z.enum(["BLS", "ALS", "ICU"]),
  driverName: z.string().trim().min(2).max(80).optional(),
  driverPhone: z.string().trim().max(20).optional(),
  currentLat: z.number().min(-90).max(90).optional(),
  currentLng: z.number().min(-180).max(180).optional(),
});

export const ambulanceBookingSchema = z.object({
  ambulanceId: z.string().min(1).optional(),
  pickupLat: latSchema,
  pickupLng: lngSchema,
  dropoffLat: latSchema,
  dropoffLng: lngSchema,
  pickupAddress: z.string().trim().min(3).max(300),
  dropoffAddress: z.string().trim().min(3).max(300),
  urgency: z.enum(["routine", "urgent", "critical"]),
});

export const ambulanceBookingStatusSchema = z.object({
  status: z.enum([
    "ASSIGNED", "EN_ROUTE_PICKUP", "PICKED_UP",
    "EN_ROUTE_DROPOFF", "COMPLETED", "CANCELLED",
  ]),
});

/* ── Hospital queue ──────────────────────────────────────────────── */
export const queueTicketSchema = z.object({
  doctorId: z.string().min(1).optional(),
});

export const queueStatusSchema = z.object({
  status: z.enum(["CALLED", "IN_PROGRESS", "COMPLETED", "NO_SHOW", "CANCELLED"]),
});

/* ── Consultation chat ───────────────────────────────────────────── */
export const consultationMessageSchema = z.object({
  content: z.string().trim().min(1).max(2000),
  type: z.enum(["text", "image", "file"]).default("text"),
});

/* ── Prescription refills ────────────────────────────────────────── */
export const refillRequestSchema = z.object({
  pharmacyId: z.string().min(1).optional(),
  notes: z.string().trim().max(500).optional(),
});

export const refillStatusSchema = z.object({
  status: z.enum(["APPROVED", "REJECTED", "FULFILLED"]),
});

/* ── Reviews & reports ───────────────────────────────────────────── */
export const reviewSchema = z.object({
  appointmentId: z.string().min(1),
  rating: z.number().int().min(1).max(5),
  text: z.string().trim().max(600).optional(),
});

export const reportSchema = z.object({
  targetType: z.enum(["doctor", "pharmacy", "user"]),
  targetId: z.string().min(1),
  reason: z.string().trim().min(10).max(1000),
});

export const reportDecisionSchema = z.object({
  reportId: z.string().min(1),
  status: z.enum(["reviewed", "dismissed"]),
});

/* ── Facility self-registration ──────────────────────────────────── */
export const facilityRegisterSchema = z.object({
  kind: z.enum(["HOSPITAL", "LAB", "PHARMACY"]),
  name: z.string().trim().min(2).max(160),
  address: z.string().trim().min(5).max(300),
  lat: z.number().min(-90).max(90),
  lng: z.number().min(-180).max(180),
  licenseNo: z.string().trim().min(4).max(40),
});

export const facilityDecisionSchema = z.object({
  kind: z.enum(["HOSPITAL", "LAB", "PHARMACY"]),
  facilityId: z.string().min(1),
  decision: z.enum(["APPROVED", "REJECTED"]),
  note: z.string().trim().max(300).optional(),
});

/* ── Push tokens & contact ───────────────────────────────────────── */export const pushTokenSchema = z.object({
  token: z.string().min(10).max(4096),
  platform: z.enum(["ios", "android", "web"]),
});

export const contactMessageSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(160),
  subject: z.string().trim().min(3).max(120),
  message: z.string().trim().min(10).max(3000),
});
