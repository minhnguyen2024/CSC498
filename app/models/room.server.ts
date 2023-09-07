import { Prisma } from "@prisma/client";
import { prisma } from "~/db.server";
export type Room = {
    accessible: number,
    power: number,
    reservable: number,
    softSeating: number,
    tableChairs: number,
    monitor: number,
    whiteboard: number,
    window: number,
}
export async function createRoom({accessible, power, reservable, softSeating, tableChairs, monitor, whiteboard, window}: Room){
    return await prisma.$executeRaw`INSERT INTO Room (accessible, power, reservable, softSeating, tableChairs, monitor, whiteboard, window) 
    VALUES (${accessible}, ${power}, ${reservable}, ${softSeating}, ${tableChairs}, ${monitor}, ${whiteboard}, ${window})`
}

export async function deleteRoombyId({}){
    return null
}

export async function updateRoom() {
    return null
}