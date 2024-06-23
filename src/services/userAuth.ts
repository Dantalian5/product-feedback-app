"use server";
import client from "@/lib/db";
import { auth } from "@/auth";

export async function getSessionUser() {
  // This function fetch the user from the session
  const session = await auth();
  const user = session?.user;
  // if no session/user return authentication error
  if (!user) {
    throw new Error("Error auth user");
  }
  return user;
}
export async function validateOwner(tableName: string, objectId: number) {
  const user = await getSessionUser(); // fetch user from session
  const query = `
      SELECT user_id
      FROM ${tableName}
      WHERE id = $1
    `;
  try {
    const result = await client.query(query, [objectId]); // fetch object from database
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
