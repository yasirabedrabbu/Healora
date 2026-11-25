import { z } from "zod";

/**
 * Shared Zod schemas. Every API route validates its input here first,
 * then calls a service - never trusts raw request data.
 */
export const phoneSchema = z
  .string()
  .regex(/^01[3-9]\d{8}$/, "বৈধ বাংলাদেশি ফোন নম্বর দিন");

export const otpRequestSchema = z.object({
  phone: phoneSchema,
});

export const otpVerifySchema = z.object({
  phone: phoneSchema,
  code: z.string().regex(/^\d{6}$/, "৬ ডিজিটের কোড দিন"),
});

export const profileSchema = z.object({
  name: z.string().min(2).max(80),
  bloodGroup: z.enum(["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"]),
  area: z.string().min(2).max(120),
  role: z.enum(["PATIENT", "DOCTOR"]).default("PATIENT"),
});

export const doctorRegisterSchema = z.object({
  name: z.string().min(2).max(120),
  bmdcNo: z.string().min(4).max(20),
  nid: z.string().min(10).max(20),
  specialty: z.string().min(2).max(60),
  degrees: z.string().min(2).max(160),
  fee: z.number().int().min(0).max(100000),
  languages: z.array(z.string()).min(1),
  modes: z.array(z.enum(["video", "audio", "chat", "chamber"])).min(1),
});

export const appointmentSchema = z.object({
  doctorId: z.string().min(1),
  slot: z.string().datetime(),
  mode: z.enum(["video", "audio", "chat", "chamber"]),
});

const timeSchema = z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, "সময় HH:MM ফরম্যাটে দিন");
export const scheduleItemSchema = z.object({
  weekday: z.number().int().min(0).max(6),
  startAt: timeSchema,
  endAt: timeSchema,
  mode: z.enum(["video", "audio", "chat", "chamber"]),
}).refine((item) => item.startAt < item.endAt, {
  message: "শেষ সময় শুরু সময়ের পরে হতে হবে",
  path: ["endAt"],
});

export const scheduleSchema = z.object({
  slots: z.array(scheduleItemSchema).max(50),
});

export const appointmentCancelSchema = z.object({
  reason: z.string().trim().max(300).optional(),
});

export const prescriptionItemSchema = z.object({
  medicineId: z.string().min(1),
  dose: z.string().min(1).max(60),
  duration: z.string().min(1).max(60),
});

export const prescriptionSchema = z.object({
  patientId: z.string().min(1),
  diagnosis: z.string().max(300).optional(),
  items: z.array(prescriptionItemSchema).min(1).max(20),
  validDays: z.number().int().min(1).max(30).default(7),
});

export const bloodRequestSchema = z.object({
  bloodGroup: z.enum(["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"]),
  hospitalId: z.string().optional(),
  urgency: z.enum(["routine", "urgent", "critical"]),
  note: z.string().max(500).optional(),
});

export const bloodDonorSchema = z.object({
  bloodGroup: z.enum(["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"]),
  areaLat: z.number().min(-90).max(90),
  areaLng: z.number().min(-180).max(180),
  lastDonatedAt: z
    .string()
    .min(4)
    .max(40)
    .refine((value) => !Number.isNaN(Date.parse(value)), "সঠিক তারিখ দিন")
    .nullable()
    .optional(),
});

export const aiChatSchema = z.object({
  sessionId: z.string().optional(),
  message: z.string().min(1).max(2000),
});

export const userSettingsSchema = z.object({
  locale: z.enum(["bn", "en"]),
  appointmentAlerts: z.boolean(),
  refillAlerts: z.boolean(),
  reportAlerts: z.boolean(),
  emergencyAlerts: z.boolean(),
  smsAlerts: z.boolean(),
  shareRecords: z.boolean(),
  sharePrescriptions: z.boolean(),
});

export const updateProfileSchema = z.object({
  name: z.string().min(2).max(80),
  bloodGroup: z.enum(["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"]).nullable(),
  area: z.string().min(2).max(120).nullable(),
});

export const notificationReadSchema = z.object({
  ids: z.array(z.string().min(1)).min(1).max(100),
});

/** Parse with a friendly error; returns typed data or throws 400-ready error. */
export function parseOrThrow<T extends z.ZodTypeAny>(schema: T, data: unknown): z.infer<T> {
  const result = schema.safeParse(data);
  if (!result.success) {
    const err = new Error(result.error.issues[0]?.message ?? "অবৈধ ইনপুট") as Error & { status?: number };
    err.status = 400;
    throw err;
  }
  return result.data;
}
