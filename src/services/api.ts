"use server";
import client from "@/lib/db";
import { auth } from "@/auth";
import type {
  TypeComment,
  TypeFeedback,
  TypeFeedbackBase,
} from "@/types/dataTypes";

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function validateOwner(tableName: string, id: number) {
  // This function check if the current user is the owner of the object
  // is a secure validation function for better security
  const session = await auth(); // fetch session
  const user: any = session?.user; // fetch user from session
  // no user -> error
  if (!user) {
    throw new Error("Error auth user");
  }
  const query = `
    SELECT user_id
    FROM ${tableName}
    WHERE id = $1
  `;
  try {
    const result = await client.query(query, [id]); // fetch object from database
    // no object -> error
    if (result.rows.length === 0) {
      throw new Error(`${tableName} not found`);
    }
    const ownerId = result.rows[0].user_id; // take the user_id
    // check if user is the owner
    if (Number(ownerId) !== Number(user.id)) {
      throw new Error("Error auth user");
    }
  } catch (error) {
    console.error("Error validating owner:", error);
    throw new Error("Error validating owner");
  }
}
export async function getFeedbacks(id?: number) {
  const query = `SELECT 
  feedbacks.id,
  feedbacks.title, 
  feedbacks.category, 
  feedbacks.upvotes, 
  feedbacks.status, 
  feedbacks.description,
  feedbacks.user_id,
  CAST(COUNT(comments.id) AS INTEGER) AS comments_count
  FROM feedbacks 
  LEFT JOIN comments ON feedbacks.id = comments.feedback_id
  GROUP BY feedbacks.id`;

  try {
    const result = await client.query(query);
    // await delay(50000);
    const data = id ? result.rows.find((row) => row.id === id) : result.rows;
    return data;
  } catch (error) {
    console.error(error);
  }
}
export async function getComments(id: number) {
  const query = `
  SELECT 
    comments.id,
    comments.content,
    comments.feedback_id,
    comments.replying_to,
    users.id AS user_id,
    users.name AS user_name,
    users.username AS user_username,
    users.image AS user_image
  FROM comments
  JOIN users ON comments.user_id = users.id
  WHERE comments.feedback_id = $1;
  `;

  try {
    const result = await client.query(query, [id]);
    const data = result.rows.map((row) => ({
      id: row.id,
      content: row.content,
      feedback_id: row.request_id,
      replying_to: row.replying_to,
      user: {
        id: row.user_id,
        name: row.user_name,
        username: row.user_username,
        image: row.user_image,
      },
    }));
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function addFeedback(feedback: TypeFeedbackBase) {
  const query = `
    INSERT INTO feedbacks (title, category, upvotes, status, description, user_id)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
  `;

  const values = [
    feedback.title,
    feedback.category,
    feedback.upvotes || 0,
    feedback.status || "suggestion",
    feedback.description,
    feedback.user_id,
  ];

  try {
    const result = await client.query(query, values);
    return result.rows[0];
  } catch (error) {
    throw new Error("Error inserting feedback");
  }
}

export async function editFeedback(feedback: TypeFeedback) {
  const query = `
    UPDATE feedbacks
    SET title = $1, category = $2, upvotes = $3, status = $4, description = $5
    WHERE id = $6
    RETURNING *;
  `;
  const values = [
    feedback.title,
    feedback.category,
    feedback.upvotes || 0,
    feedback.status || "pending",
    feedback.description,
    feedback.id,
  ];
  try {
    // await validateOwner(feedback.user_id);
    await validateOwner("feedbacks", feedback.id);
    const result = await client.query(query, values);
    return result.rows[0];
  } catch (error) {
    throw new Error("Error updating feedback");
  }
}

export async function deleteFeedback(id: number) {
  const query = `
    DELETE FROM feedbacks
    WHERE id = $1
    RETURNING *;
  `;
  try {
    await validateOwner("feedbacks", id);
    const result = await client.query(query, [id]);
    return result.rows[0];
  } catch (error) {
    throw new Error("Error deleting feedback");
  }
}
export async function addComment(comment: TypeComment) {
  const query = `
    INSERT INTO comments (user_id, feedback_id, replying_to, content,)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;

  const values = [
    comment.user,
    comment.feedback_id,
    comment.replying_to,
    comment.content,
  ];

  try {
    const result = await client.query(query, values);
    return result.rows[0];
  } catch (error) {
    throw new Error("Error inserting comment");
  }
}
