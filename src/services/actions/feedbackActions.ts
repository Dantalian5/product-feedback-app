"use server";
import prisma from "@/lib/prismaDB";
import { getUser } from "@/services/auth";
import type { NewFeedback, Feedback, Comment } from "@/types/global";

export async function getAllFeedbacks() {
  try {
    const feedbacks = await prisma.feedbacks.findMany({
      include: {
        comments: true,
      },
    });

    if (!feedbacks) return [];

    const data: Feedback[] = feedbacks.map((feedback: any) => ({
      id: Number(feedback.id),
      title: feedback.title,
      description: feedback.description,
      category: feedback.category,
      status: feedback.status,
      upvotes: Number(feedback.upvotes),
      userId: Number(feedback.user_id),
      commentsCount: feedback.comments.length,
    }));

    return data;
  } catch (error) {
    throw new Error("Error fetching feedback from the database");
  }
}

//Get feedback by id, populate with comments & users (validate is user can edit)
export async function getFeedbackById(
  id: number,
  includeComments: boolean = false,
) {
  const user = await getUser();
  try {
    const feedback = await prisma.feedbacks.findUnique({
      where: { id },
      include: {
        comments: {
          include: {
            users: {
              select: {
                id: true,
                name: true,
                username: true,
                image: true,
              },
            },
          },
        },
      },
    });

    if (!feedback) throw new Error("Feedback not found");

    const data: Feedback = {
      id: Number(feedback.id),
      title: feedback.title as string,
      description: feedback.description as string,
      category: feedback.category as string,
      status: feedback.status as string,
      upvotes: Number(feedback.upvotes),
      userId: Number(feedback.user_id),
      commentsCount: Number(feedback.comments?.length),
      isEditable: Number(feedback.user_id) === Number(user?.id),
    };

    if (includeComments) {
      data.comments = feedback.comments.map((comment: any) => ({
        id: comment.id,
        content: comment.content,
        feedbackId: comment.feedback_id,
        parentId: comment.replying_to,
        user: {
          id: comment.users.id,
          name: comment.users.name,
          username: comment.users.username,
          image: comment.users.image,
        },
      }));
    }

    return data;
  } catch (error) {
    throw new Error("Error fetching feedback from the database");
  }
}
// Add feedback to db
export async function addFeedback(feedback: NewFeedback) {
  const user = await getUser();
  if (!user) throw new Error("Error validating user");
  try {
    const user = await getUser();
    const result = await prisma.feedbacks.create({
      data: {
        title: feedback.title,
        category: feedback.category,
        upvotes: 0,
        status: "suggestion",
        description: feedback.description,
        user_id: Number(user?.id),
      },
    });

    return result;
  } catch (error) {
    throw new Error("Oops, something went wrong. Try again later");
  }
}
// Edit feedback from db
export async function editFeedback(feedback: Feedback) {
  const user = await getUser();
  if (!user) throw new Error("Error validating user");
  try {
    const user = await getUser();
    if (Number(feedback.userId) !== Number(user?.id)) {
      throw new Error("Error updating feedback");
    }
    const result = await prisma.feedbacks.update({
      where: { id: feedback.id },
      data: {
        title: feedback.title,
        category: feedback.category,
        status: feedback.status,
        description: feedback.description,
      },
    });

    return result;
  } catch (error) {
    throw new Error("Oops, something went wrong. Try again later");
  }
}
// Delete feedback from db
export async function deleteFeedback(id: number) {
  const user = await getUser();
  if (!user) throw new Error("Error validating user");
  try {
    const user = await getUser();
    const result = await prisma.feedbacks.deleteMany({
      where: {
        id: id,
        user_id: Number(user?.id),
      },
    });

    if (result.count === 0) {
      throw new Error(
        "Oops! Error validating user. It seems you are not the owner",
      );
    }
    return result;
  } catch (error) {
    throw new Error("Oops, something went wrong. Try again later");
  }
}

// Upvote feedback
export async function upVoteFeedback(feedbackId: number) {
  const user = await getUser();
  if (!user)
    throw new Error("Oops, you must be logged in to upvote a feedback.");
  try {
    const result = await prisma.feedbacks.update({
      where: { id: feedbackId },
      data: {
        upvotes: {
          increment: 1,
        },
      },
    });

    return result;
  } catch (error) {
    throw new Error("Oops, something went wrong. Try again later");
  }
}
