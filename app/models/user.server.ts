import type { User } from "@prisma/client";
import bcrypt from "bcryptjs";

import { Prisma } from "@prisma/client";
import { prisma } from "~/db.server";

export type { User } from "@prisma/client";

export async function getUserById(id: User["id"]) {
  return prisma.$queryRaw`SELECT * FROM User WHERE id = ${id}`;
}

export async function getUserByEmail(username: string) {
  return prisma.$queryRaw`SELECT * FROM User WHERE username = ${username}`;
}

export async function verifyLogin(
  username: string,
  password: string,
) {
  const existingUser: any = await prisma.$queryRaw`SELECT * FROM User WHERE username = ${username}`
  if(!existingUser[0]){
    return -1
  }
  const isCorrectPassword = await bcrypt.compare(password, existingUser[0].password)
  if (isCorrectPassword){
    return existingUser[0];
  }
}

export async function getAllUsers():Promise<User[]>{
  return await prisma.$queryRaw`SELECT * FROM User`
}

export async function selectUsersBySearchQuery({ userId, username, permission} : { userId?: number, username?: string, permission?: number}): Promise<User[]> {
  const usernameQuery: string = `%${username}%`;
  console.log(usernameQuery)
  return await prisma.$queryRaw`
  SELECT * FROM User 
  WHERE 1 = 1
  ${userId == 0 ? Prisma.empty : Prisma.sql`AND id = ${userId}`}
  ${usernameQuery == "" ? Prisma.empty : Prisma.sql`AND username LIKE ${usernameQuery}`}
  ${permission == -1 ? Prisma.empty : Prisma.sql`AND admin = ${permission}`}
  `;
}

export async function createUser({ username, password, permission} : { username: string, password: string, permission: number}) {
  const hashedPassword = await bcrypt.hash(password, 10)
  return await prisma.$executeRaw`
  INSERT INTO User(username, password, admin) 
  VALUES (${username}, ${hashedPassword}, ${permission})`
}

export async function deleteUser({ id }:{ id: number }) {
  return await prisma.$executeRaw`DELETE FROM User WHERE id = ${id}`
}