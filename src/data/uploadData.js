const { Client } = require("pg");
const fs = require("fs");
const dotenv = require("dotenv");

const result = dotenv.config();
if (result.error) {
  throw result.error;
}

console.log(result.parsed);
// Comprobar las variables de entorno
console.log("PG_USER:", process.env.PG_USER);
console.log("PG_HOST:", process.env.PG_HOST);
console.log("PG_DATABASE:", process.env.PG_DATABASE);
console.log("PG_PASSWORD:", process.env.PG_PASSWORD);
console.log("PG_PORT:", process.env.PG_PORT);

const users = JSON.parse(fs.readFileSync("structured/users.json", "utf-8"));
const requests = JSON.parse(
  fs.readFileSync("structured/requests.json", "utf-8"),
);
const comments = JSON.parse(
  fs.readFileSync("structured/comments.json", "utf-8"),
);

const client = new Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT ? parseInt(process.env.PG_PORT, 10) : undefined,
});

async function uploadData() {
  try {
    await client.connect();
    console.log("Connected to the database successfully");

    // Insert users
    for (const user of users) {
      await client.query(
        "INSERT INTO users (image, name, username) VALUES ($1, $2, $3)",
        [user.image, user.name, user.username],
      );
    }

    // Insert requests
    for (const request of requests) {
      await client.query(
        "INSERT INTO requests (title, category, upvotes, status, description) VALUES ($1, $2, $3, $4, $5)",
        [
          request.title,
          request.category,
          request.upvotes,
          request.status,
          request.description,
        ],
      );
    }

    // Insert comments
    for (const comment of comments) {
      await client.query(
        "INSERT INTO comments (content, user_id, request_id, parent_comment_id) VALUES ($1, $2, $3, $4)",
        [
          comment.content,
          comment.user_id,
          comment.request_id,
          comment.parent_comment_id,
        ],
      );
    }

    console.log("Data has been uploaded successfully");
  } catch (e) {
    console.error("Error during data upload:", e);
  } finally {
    try {
      await client.end();
      console.log("Disconnected from the database successfully");
    } catch (endErr) {
      console.error("Error during disconnection:", endErr);
    }
  }
}

uploadData().catch((e) => console.error("Upload data function failed:", e));
