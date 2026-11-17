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

export const aiChatSchema = z.object({
  sessionId: z.string().optional(),
  message: z.string().min(1).max(2000),
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
