import { Prisma } from "@prisma/client";
import { prisma } from "~/db.server";

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
  SELECT * FROM Inventory 
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
  return await prisma.$executeRaw`INSERT INTO CafeOrder (userId, invId) VALUES (${userId}, ${invId})`;
}

//One order can contains many inventory
export async function deleteOrderAndInventory({ invId }: { invId: string }) {
  await prisma.$executeRaw`DELETE FROM Inventory WHERE id = ${invId}`;
  await prisma.$executeRaw`DELETE FROM CafeOrder WHERE invId = ${invId}`;
}

//function to update prepare status
export async function updateOrderStatus({ orderStatus, orderId}: { orderStatus: string, orderId: string}) {
  // console.log({ orderStatus, orderId })
  return await prisma.$executeRaw`
  UPDATE CafeOrder 
  SET orderStatus=${orderStatus}
  WHERE id=${orderId}`
}