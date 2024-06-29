import { z } from "zod";
export const commentSchema = z.object({
  content: z
    .string({ required_error: "Can't be empty" })
    .min(1, { message: "Can't be empty" })
    .max(250, { message: "Content must be at most 250 characters long" }),
});
export type CommentSchema = z.infer<typeof commentSchema>;
