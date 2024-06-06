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
  const query = `SELECT *
  FROM comments 
  WHERE request_id = $1;`;

  try {
    const result = await client.query(query, [id]);
    return result.rows;
  } catch (error) {
    console.error(error);
  }
}
