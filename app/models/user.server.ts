import type { User } from "@prisma/client";
import bcrypt from "bcryptjs";

import { prisma } from "~/db.server";

export type { User } from "@prisma/client";

export async function getUserById(id: User["id"]) {
  return prisma.$queryRaw`SELECT * FROM User WHERE id = ${id}`;
}

export async function getUserByEmail(username: string) {
  return prisma.$queryRaw`SELECT * FROM User WHERE username = ${username}`;
}

export async function createUser(email: User["username"], password: string) {
  const hashedPassword = await bcrypt.hash(password, 10);
  return null
}

// export async function deleteUserByEmail(email: User["email"]) {
//   return prisma.user.delete({ where: { email } });
// }

export async function verifyLogin(
  username: string,
  password: string,
) {
  const existingUser: any = await prisma.$queryRaw`SELECT * FROM User WHERE username = ${username}`
  if (existingUser[0].password == password){
    return existingUser[0];
  }
  return null
}
