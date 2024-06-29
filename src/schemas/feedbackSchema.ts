import { z } from "zod";

export const feedbackSchema = z.object({
  title: z.string().min(1, { message: "Can't be empty" }),
  category: z.enum(["Feature", "UI", "UX", "Enhancement", "Bug"]),
  status: z.enum(["suggestion", "planned", "in-progress", "live"]).optional(),
  description: z.string().min(1, { message: "Can't be empty" }),
});
