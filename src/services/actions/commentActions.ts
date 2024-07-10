"use server";
import prisma from "@/lib/prismaDB";
import { getUser } from "@/services/auth";
import type { NewComment } from "@/types/global";

// Add comment to db
export async function addComment(comment: NewComment) {
  const user = await getUser();
  if (!user) throw new Error("Error validating user");
  try {
    const user = await getUser();
    const result = await prisma.comments.create({
      data: {
        user_id: Number(user?.id),
        feedback_id: comment.feedbackId,
        replying_to: comment.parentId,
        content: comment.content,
      },
    });

    return result;
  } catch (error) {
    throw new Error("Ups, something went wrong. Try again later");
  }
}
