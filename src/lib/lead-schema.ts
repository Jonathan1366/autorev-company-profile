import { z } from "zod";

export const leadTypes = ["rental", "driver", "business", "system", "partner", "strategic"] as const;
export type LeadType = (typeof leadTypes)[number];

const requiredText = z.string().trim().min(2).max(300);
const optionalText = z.string().trim().max(500).optional().or(z.literal(""));

export const leadSchema = z.object({
  type: z.enum(leadTypes),
  locale: z.enum(["id", "en"]),
  name: requiredText,
  email: z.string().trim().email().max(200).optional().or(z.literal("")),
  phone: z.string().trim().min(8).max(24),
  organization: optionalText,
  city: optionalText,
  vehicleCount: optionalText,
  vehicleType: optionalText,
  serviceDate: optionalText,
  specialization: optionalText,
  capacity: optionalText,
  need: requiredText,
  details: z.string().trim().min(5).max(1500),
  consent: z.boolean().refine(Boolean, { message: "Consent is required" }),
  website: z.string().max(100).optional(),
}).superRefine((value, context) => {
  if (value.type !== "rental" && value.type !== "driver" && !value.organization) {
    context.addIssue({
      code: "custom",
      path: ["organization"],
      message: "Organization is required",
    });
  }
});

export type LeadInput = z.infer<typeof leadSchema>;
