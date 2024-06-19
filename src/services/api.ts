"use server";
import client from "@/lib/db";
import type { TypeFeedback } from "@/types/dataTypes";

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
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
    comments.parent_comment_id,
    comments.replying_to,
    users.id AS user_id,
    users.name AS user_name,
    users.username AS user_username,
    users.image AS user_image,
    replying_users.id AS replying_user_id,
    replying_users.name AS replying_user_name,
    replying_users.username AS replying_user_username,
    replying_users.image AS replying_user_image
  FROM comments
  JOIN users ON comments.user_id = users.id
  LEFT JOIN users AS replying_users ON comments.replying_to = replying_users.id
  WHERE comments.feedback_id = $1;
  `;

  try {
    const result = await client.query(query, [id]);
    const data = result.rows.map((row) => ({
      id: row.id,
      content: row.content,
      feedback_id: row.request_id,
      parent_comment_id: row.parent_comment_id,
      replying_to: row.replying_to
        ? {
            id: row.replying_user_id,
            name: row.replying_user_name,
            username: row.replying_user_username,
            image: row.replying_user_image,
          }
        : null,
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

export async function addFeedback(feedback: TypeFeedback) {
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
    console.error("Error inserting feedback:", error);
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
    const result = await client.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error updating feedback:", error);
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
    const result = await client.query(query, [id]);
    return result.rows[0];
  } catch (error) {
    console.error("Error deleting feedback:", error);
    throw new Error("Error deleting feedback");
  }
}
