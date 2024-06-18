import client from "@/lib/db";

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
