import { Prisma } from "@prisma/client";
import { prisma } from "~/db.server";

export type Inventory = {
  id: string,
  name: string,
  iced: number
}
export async function selectAllInventoryByCondition({ iced }: { iced: number }): Promise<Inventory[]> {
  return await prisma.$queryRaw`
  SELECT * FROM Inventory 
  WHERE iced = ${iced}
  ORDER BY name ASC`;
}

export async function selectInventoryByNameAndCondition({ name, iced }: { name: string, iced: number}): Promise<Inventory[]>{
  return await prisma.$queryRaw`
  SELECT * FROM Inventory 
  WHERE iced = ${iced}
  AND name = ${name}`;
}

export async function createOrder({ invId, userId }:{ invId: string, userId: number }){
  return await prisma.$executeRaw`INSERT INTO CafeOrder (userId, invId) VALUES (${userId}, ${invId})`
}

//One order can contains many inventory
export async function deleteOrderAndInventory({ invId }:{ invId: string}){
  await prisma.$executeRaw`DELETE FROM Inventory WHERE id = ${invId}`
  await prisma.$executeRaw`DELETE FROM CafeOrder WHERE invId = ${invId}`
}