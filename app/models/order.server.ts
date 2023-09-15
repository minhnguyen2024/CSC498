import { Prisma } from "@prisma/client";
import { prisma } from "~/db.server";

const { v4: uuidv4 } = require('uuid');

export type Inventory = {
  id: string;
  name: string;
  iced: number;
};

export async function selectOrders() {
  return await prisma.$queryRaw`
  SELECT CafeOrder.id AS ordId,
  CafeOrder.userId AS customerId,
  User.username AS customerName,
  CafeOrder.orderStatus AS orderStatus,
  Inventory.id AS invId,
  Inventory.name AS orderName,
  Inventory.iced AS temperature FROM CafeOrder, Inventory, User
  WHERE CafeOrder.invId = Inventory.id
  AND User.id = CafeOrder.userId`

}
export async function selectAllInventoryByCondition({
  iced,
}: {
  iced: number;
}): Promise<Inventory[]> {
  return await prisma.$queryRaw`
  SELECT * FROM Inventory 
  WHERE iced = ${iced}
  ORDER BY name ASC`;
}

export async function selectInventoryByNameAndCondition({
  name,
  iced,
}: {
  name: string;
  iced: number;
}): Promise<Inventory[]> {
  return await prisma.$queryRaw`
  SELECT id AS invId FROM Inventory 
  WHERE iced = ${iced}
  AND name = ${name}`;
}

export async function createOrder({
  invId,
  userId,
}: {
  invId: string;
  userId: number;
}) {
  return await prisma.$executeRaw`
  INSERT INTO CafeOrder (id, userId, invId, orderStatus, cafeRoyEmpId) 
  VALUES (${uuidv4()},${userId}, ${invId}, "notPrepared", 0)`;
}

//One order can contains many inventory
export async function deleteOrderAndInventory({ invId }: { invId: string }) {
  //delete from CafeOrder first because it is referencing Inventory 
  await prisma.$executeRaw`DELETE FROM CafeOrder WHERE invId = ${invId}`;
  await prisma.$executeRaw`DELETE FROM Inventory WHERE id = ${invId}`;
}

//function to update prepare status
export async function updateOrderStatus({ orderStatus, orderId}: { orderStatus: string, orderId: string}) {
  return await prisma.$executeRaw`
  UPDATE CafeOrder 
  SET orderStatus=${orderStatus}
  WHERE id=${orderId}`
}

export async function createInventory({ iced, name, quantity }: { iced: number, name: string, quantity: number }) {
  for (let i = 0; i < quantity; i++){
    await prisma.$executeRaw`
    INSERT INTO Inventory (id, name, iced) 
    VALUES (${uuidv4()}, ${name}, ${iced})`
  }
  return null
}

export async function selectAllInventory(){
  return await prisma.$queryRaw`SELECT * FROM Inventory`
}