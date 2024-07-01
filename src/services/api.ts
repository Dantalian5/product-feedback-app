"use server";
import client from "@/lib/db";
import { getSessionUser, validateOwner } from "@/services/userAuth";
import type {
  TypeComment,
  TypeCommentBase,
  TypeFeedback,
  TypeFeedbackBase,
  TypeFeedbackWithCmtsCnt,
} from "@/types/dataTypes";

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function addUser(user: {
  name: string;
  username: string;
  email: string;
  password: string;
}) {
  const query = `
      INSERT INTO users (name, username, email, password)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
  try {
    const result = await client.query(query, [
      user.name,
      user.username,
      user.email,
      user.password,
    ]);
    return result.rows[0];
  } catch (error: any) {
    throw new Error("Error adding user to db", { cause: error.code });
  }
}
export async function getUser(email: string) {
  const query = `SELECT 
    users.name, 
    users.username, 
    users.email, 
    users.image
    FROM users 
    WHERE users.email = $1;`;

  try {
    await client.connect();
    const result = await client.query(query, [email]);
    await client.end();
    return result.rows[0];
  } catch (error) {
    throw new Error("Error fetching user from db");
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
    //await delay(50000);

    const data = id ? result.rows.find((row) => row.id === id) : result.rows;
    return data;
  } catch (error) {
    throw new Error("Error fetching feedback from the database");
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
    const data: TypeComment[] = result.rows.map((row) => ({
      id: row.id,
      content: row.content,
      feedback_id: row.feedback_id,
      parent_id: row.replying_to,
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
  const user = await getSessionUser();
  const query = `
    INSERT INTO feedbacks (title, category, upvotes, status, description, user_id)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
  `;

  const values = [
    feedback.title,
    feedback.category,
    0,
    "suggestion",
    feedback.description,
    user.id,
  ];

  try {
    const result = await client.query(query, values);
    return result.rows[0];
  } catch (error) {
    throw new Error("Error inserting feedback");
  }
}

export async function editFeedback(feedback: TypeFeedback) {
  const user = await getSessionUser();
  if (feedback.user_id !== Number(user.id)) {
    throw new Error("Error updating feedback");
  }
  const query = `
    UPDATE feedbacks
    SET title = $1, category = $2, upvotes = $3, status = $4, description = $5
    WHERE id = $6
    RETURNING *;
  `;
  const values = [
    feedback.title,
    feedback.category,
    feedback.upvotes,
    feedback.status,
    feedback.description,
    feedback.id,
  ];
  try {
    await validateOwner("feedbacks", feedback.id);
    const result = await client.query(query, values);
    return result.rows[0];
  } catch (error) {
    throw new Error("Ups, something went wrong. Try again later");
  }
}

export async function deleteFeedback(feedbackId: number) {
  const user = await getSessionUser();
  const query = `
    DELETE FROM feedbacks
    WHERE id = $1
    RETURNING *;
  `;
  try {
    await validateOwner("feedbacks", feedbackId);
    const result = await client.query(query, [feedbackId]);
    return result.rows[0];
  } catch (error) {
    throw new Error("Ups, something went wrong. Try again later");
  }
}
export async function upVoteFeedback(feedbackId: number) {
  const user = await getSessionUser();
  const query = `
    UPDATE feedbacks
    SET upvotes = upvotes + 1
    WHERE id = $1
    RETURNING *;
  `;
  try {
    const result = await client.query(query, [feedbackId]);
    return result.rows[0];
  } catch (error) {
    throw new Error("Ups, something went wrong. Try again later");
  }
}
// Add comment (POST API FUNCTION)
export async function addComment(comment: TypeCommentBase) {
  const query = `
    INSERT INTO comments (user_id, feedback_id, replying_to, content)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;
  const user = await getSessionUser();
  const values = [
    user.id,
    comment.feedback_id,
    comment.parent_id,
    comment.content,
  ];
  try {
    const result = await client.query(query, values);
    return result.rows[0];
  } catch (error) {
    throw new Error("Ups, something went wrong. Try again later");
  }
}
