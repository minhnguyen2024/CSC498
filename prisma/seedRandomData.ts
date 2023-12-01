import { Inventory, PrismaClient, User } from "@prisma/client";
import {
  createOrder,
  updateOrderAndInventory,
  updateOrderStatus,
} from "~/models/order.server";
import { getRandomInteger } from "~/utils/helpers";
import { MONTH_IN_MILISECONDS, WEEK_IN_MILISECONDS, DAY_IN_MILISECONDS } from "~/utils/data";
const prisma = new PrismaClient();

function getRandomTimeInMiliseconds(){
  const periods = [MONTH_IN_MILISECONDS - 10, WEEK_IN_MILISECONDS - 10, DAY_IN_MILISECONDS - 10]
  //at least 1 day old orders
  return Date.now() - periods[getRandomInteger(0, periods.length - 1)]
}
async function seedExampleOrder() {
  //these are 40 inventory items randomly selected
  const selectedInventory: Inventory[] = await prisma.$queryRaw`
    SELECT *
    FROM Inventory
    ORDER BY RANDOM()
    LIMIT 40;
    `;
  //assign these items to users
  const studentUsers: User[] =
    await prisma.$queryRaw`SELECT * FROM User WHERE admin = 0`;

  for (let i = 0; i < selectedInventory.length; i++) {
    const randUserIndex = getRandomInteger(0, studentUsers.length - 1);
    const userId: number = studentUsers[randUserIndex].id;
    const invId: string = selectedInventory[i].id;
    const price: number = Number(selectedInventory[i].price);
    const randomTime = getRandomTimeInMiliseconds()
    

    const orderId: string = await createOrder({
      invId,
      userId,
      createdAt: randomTime,
      price,
    });

    await updateOrderStatus({
      orderStatus: "finished",
      orderId,
      userId,
    });
    await updateOrderAndInventory({ invId, sold: 1 });
  }
  console.log(`seedExampleOrder has been executed. 🌱`);
}
seedExampleOrder();
