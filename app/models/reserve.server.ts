import { prisma } from "~/db.server";

export async function getAllBlocks() {
    const blocks = prisma
    .$queryRaw`SELECT * FROM Block ORDER BY time ASC`
    return blocks
}

export async function getAllAvailableBlocks(){
    const availableBlocks = prisma
    .$queryRaw`SELECT User.username, Room.id, Block.id FROM Block, Room , User 
                WHERE Block.room_id = Room.id 
                AND Block.booked_user_id = 0`
    return availableBlocks
}

export async function getAllUnavailableBlocks() {
    const unavailableBlocks = prisma
    .$queryRaw`SELECT User.username, Room.id, Block.id FROM Block, Room , User 
                WHERE Block.room_id = Room.id 
                AND Block.booked_user_id != 0`
    return unavailableBlocks
}



