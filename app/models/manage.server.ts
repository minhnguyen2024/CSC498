import { Prisma } from "@prisma/client";
import { prisma } from "~/db.server";

export async function selectAllReserved(): Promise<object[]>{
    return await prisma.$queryRaw`SELECT Block.id AS blockId, Block.room_id AS roomId, Block.booked_user_id AS userId, User.username, Block.time FROM Block, Room , User 
    WHERE Block.room_id = Room.id 
    AND Block.booked_user_id = User.id
    AND Block.booked_user_id != 0`
}