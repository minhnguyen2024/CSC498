import { Prisma } from "@prisma/client";
import { prisma } from "~/db.server";

const { v4: uuidv4 } = require("uuid");

export type Inventory = {
  id?: string;
  name: string;
  iced: number;
  size?: string,
  image: string,
  price?: number
};

export type CafeOrder = {
  id: string,
  userId: number,
  invId: string,
  createdAt: number,
  orderStatus: string,
  cafeRoyEmpId: number
}


export async function selectOrderByUserId({ userId }: { userId: string }): Promise<any[]> {
  return await prisma.$queryRaw`
    SELECT CafeOrder.id AS orderId,
    User.username AS customerName,
    CafeOrder.orderStatus AS orderStatus,
    CafeOrder.cafeRoyEmpId,
    Inventory.name AS orderName,
    Inventory.price AS price,
    Inventory.size AS size,
    Inventory.iced AS iced,
    Inventory.image AS image
    FROM CafeOrder, Inventory, User
    WHERE CafeOrder.invId = Inventory.id
    AND User.id = CafeOrder.userId
    AND CafeOrder.userId = ${userId}
  `
}

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
  AND User.id = CafeOrder.userId`;
}
export async function selectAllInventoryByCondition({
  iced,
}: {
  iced: number;
}): Promise<Inventory[]> {
  return await prisma.$queryRaw`
  SELECT name, iced, image
  FROM Inventory 
  WHERE iced = ${iced}
  ORDER BY name ASC`;
}

export async function selectInventoryByNameCondition({
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

export async function selectInventoryByNameConditionSize({
  name,
  iced,
  size,
}: {
  name: string;
  iced: number;
  size: string;
}): Promise<Inventory[]> {
  return await prisma.$queryRaw`
  SELECT id AS invId FROM Inventory 
  WHERE iced = ${iced}
  AND name = ${name}
  AND size = ${size}`;
}

export async function createOrder({
  invId,
  userId,
  createdAt,
}: {
  invId: string;
  userId: number;
  createdAt: number;
}) {
  return await prisma.$executeRaw`
  INSERT INTO CafeOrder (id, userId, invId, createdAt, orderStatus, cafeRoyEmpId) 
  VALUES (${uuidv4()},${userId}, ${invId}, ${createdAt}, "notPrepared", 0)`;
}

//One order can contains many inventory
export async function updateOrderAndInventory({ invId, sold }: { invId: string, sold: number }) {
  //delete from CafeOrder first because it is referencing Inventory
  // await prisma.$executeRaw`DELETE FROM CafeOrder WHERE invId = ${invId}`;
  // await prisma.$executeRaw`DELETE FROM Inventory WHERE id = ${invId}`;
  await prisma.$executeRaw`UPDATE Inventory SET sold = ${sold} WHERE id = ${invId}`

}

//function to update prepare status
export async function updateOrderStatus({
  orderStatus,
  orderId,
  userId
}: {
  orderStatus: string;
  orderId: string;
  userId: number
}) {
  return await prisma.$executeRaw`
  UPDATE CafeOrder 
  SET orderStatus=${orderStatus}, cafeRoyEmpId=${userId}
  WHERE id=${orderId}`;
}

export async function createInventory({
  iced,
  name,
  quantity,
  size,
  price,
}: {
  iced: number;
  name: string;
  quantity: number;
  size: string;
  price: number;
}) {
  for (let i = 0; i < quantity; i++) {
    await prisma.$executeRaw`
    INSERT INTO Inventory (id, name, iced, size, price) 
    VALUES (${uuidv4()}, ${name}, ${iced},${size}, ${price})`;
  }
  return null;
}

export async function selectAllInventory() {
  return await prisma.$queryRaw`SELECT * FROM Inventory`;
}
