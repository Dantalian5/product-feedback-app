import client from "@/lib/db";

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
export async function fetchRequests(id?: number) {
  const query = `SELECT 
  requests.id,
  title, 
  category, 
  upvotes, 
  status, 
  description,
  CAST(COUNT(comments.id) AS INTEGER) AS comments_count
  FROM requests 
  LEFT JOIN comments ON requests.id = comments.request_id
  GROUP BY requests.id`;

  try {
    const result = await client.query(query);
    // await delay(50000);
    const data = id ? result.rows.find((row) => row.id === id) : result.rows;
    return data;
  } catch (error) {
    console.error(error);
  }
}
export async function fetchComments(id: number) {
  const query = `
  SELECT 
    comments.id,
    comments.content,
    comments.request_id,
    comments.parent_comment_id,
    comments.replying_to,
    users.name AS user_name,
    users.username AS user_username,
    users.image AS user_image,
    replying_users.name AS replying_user_name,
    replying_users.username AS replying_user_username,
    replying_users.image AS replying_user_image
  FROM comments
  JOIN users ON comments.user_id = users.id
  LEFT JOIN users AS replying_users ON comments.replying_to = replying_users.id
  WHERE comments.request_id = $1;
  `;

  try {
    const result = await client.query(query, [id]);
    const data = result.rows.map((row) => ({
      id: row.id,
      content: row.content,
      request_id: row.request_id,
      parent_comment_id: row.parent_comment_id,
      replying_to: row.replying_to
        ? {
            name: row.replying_user_name,
            username: row.replying_user_username,
            image: row.replying_user_image,
          }
        : null,
      user: {
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
