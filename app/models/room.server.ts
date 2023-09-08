import { Prisma } from "@prisma/client";
import { prisma } from "~/db.server";
export type Room = {
    id?: number
  accessible: number;
  power: number;
  reservable: number;
  softSeating: number;
  tableChairs: number;
  monitor: number;
  whiteboard: number;
  window: number;
};
export async function createRoom({
  accessible,
  power,
  reservable,
  softSeating,
  tableChairs,
  monitor,
  whiteboard,
  window,
}: Room) {
  await prisma.$executeRaw`INSERT INTO Room (accessible, power, reservable, softSeating, tableChairs, monitor, whiteboard, window)
    VALUES (${accessible}, ${power}, ${reservable}, ${softSeating}, ${tableChairs}, ${monitor}, ${whiteboard}, ${window})`;
  const result: any[] = await prisma.$queryRaw`SELECT last_insert_rowid()`;
  const newRoomId: number = Number(result[0]["last_insert_rowid()"]);
  for (let i = 1; i < 50; i++) {
    const block =
      await prisma.$executeRaw`INSERT INTO Block (room_id, time, booked_user_id) VALUES (${newRoomId}, ${i}, ${0})`;
  }
}

//also delete block
export async function deleteRoombyId({ roomId }: { roomId: number }) {
    console.log("Deleting Room....")
  const numDeletedRooms =
    await prisma.$executeRaw`DELETE FROM Room where id = ${roomId}`;
  const numDeletedBlocks =
    await prisma.$executeRaw`DELETE FROM Block where id = ${roomId}`;
    console.log(`Successful: ${numDeletedRooms} entry from Room table deleted`)
    console.log(`Successful: ${numDeletedBlocks} entry from Block table deleted`)
    
  return null;
}

export async function updateRoom() {
  return null;
}

export async function selectAllRooms(): Promise<Room[]>{
    return await prisma.$queryRaw`SELECT * From Room`
}
