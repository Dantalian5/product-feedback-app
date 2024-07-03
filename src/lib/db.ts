// lib/db.ts
import { Client } from "pg";
import dotenv from "dotenv";

dotenv.config();
const client = new Client({
  host: process.env.PG_HOST,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  port: process.env.PG_PORT ? parseInt(process.env.PG_PORT, 10) : 5432,
});

client.connect();
export default client;
