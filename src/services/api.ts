"use server";
import prisma from "@/lib/prismaDB";
import { getUser } from "@/services/auth";
// import type { Feedback, Comment } from "@/types/global";
import type { DBFeedback } from "@/types/prisma";

interface User {
  id: number;
  name: string;
  username: string;
  image: string;
}
interface Feedback {
  id: number;
  title: string;
  description: string;
  category: string;
  status: string;
  upvotes: number;
  userId: number;
  commentsCount: number;
  isEditable?: boolean;
  comments?: Comment[];
}
interface Comment {
  id: number;
  content: string;
  feedbackId: number;
  parentId: number | null;
  user: User;
}

// API logic using server actions

// Get User from db by email
export async function getUserByEmail(email: string) {
  try {
    const user = await prisma.users.findUnique({
      where: {
        email: email,
      },
    });
    return user;
  } catch (error) {
    throw new Error("Error fetching user from db");
  }
}

//Get all feedback from db
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
  try {
    const feedback: any = await prisma.feedbacks.findUnique({
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
      title: feedback.title,
      description: feedback.description,
      category: feedback.category,
      status: feedback.status,
      upvotes: Number(feedback.upvotes),
      userId: Number(feedback.user_id),
      commentsCount: Number(feedback.comments?.length),
      isEditable: Number(feedback.user_id) === Number((await getUser()).id),
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
export async function addFeedback(feedback: {
  title: string;
  description: string;
  category: string;
}) {
  const user = await getUser();
  try {
    const result = await prisma.feedbacks.create({
      data: {
        title: feedback.title,
        category: feedback.category,
        upvotes: 0,
        status: "suggestion",
        description: feedback.description,
        user_id: Number(user.id),
      },
    });

    return result;
  } catch (error) {
    throw new Error("Ups, something went wrong. Try again later");
  }
}
// Edit feedback from db
export async function editFeedback(feedback: Feedback) {
  const user = await getUser();

  if (Number(feedback.userId) !== Number(user.id)) {
    throw new Error("Error updating feedback");
  }

  try {
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
    throw new Error("Ups, something went wrong. Try again later");
  }
}
// Delete feedback from db
export async function deleteFeedback(id: number) {
  const user = await getUser();
  try {
    // Asegúrate de que el feedback pertenece al usuario antes de eliminarlo
    const result = await prisma.feedbacks.deleteMany({
      where: {
        id: id,
        user_id: Number(user.id),
      },
    });

    if (result.count === 0) {
      throw new Error(
        "Ups! Error validating user. It seems you are not the owner",
      );
    }

    return result;
  } catch (error) {
    throw new Error("Ups, something went wrong. Try again later");
  }
}
// Add comment to db
export async function addComment(comment: {
  feedbackId: number;
  parentId: number | null;
  content: string;
}) {
  const user = await getUser();

  try {
    const result = await prisma.comments.create({
      data: {
        user_id: Number(user.id),
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
