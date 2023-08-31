import { prisma } from "~/db.server";

export async function getAllBlocks() {
  return prisma.$queryRaw`SELECT * FROM Block ORDER BY time ASC`;
}

export async function getAllAvailableBlocks() {
  return prisma.$queryRaw`SELECT User.username, Room.id, Block.id FROM Block, Room , User 
                WHERE Block.room_id = Room.id 
                AND Block.booked_user_id = 0`;
}

export async function getAllUnavailableBlocks() {
  return prisma.$queryRaw`SELECT User.username, Room.id, Block.id FROM Block, Room , User 
                WHERE Block.room_id = Room.id 
                AND Block.booked_user_id != 0`;
}

export async function getAllAvailableRoomsByBlockAndAmenities({
  userId,
  time,
  accessible,
  power,
  reservable,
  softSeating,
  tableChairs,
  monitor,
  whiteboard,
  window,
}: {
  userId: string;
  time: string,
  accessible: string;
  power: string;
  reservable: string;
  softSeating: string;
  tableChairs: string;
  monitor: string;
  whiteboard: string;
  window: string;
}) {

    let isAccessible = accessible === 'on' ? 1 : 0
    let isPower = power === 'on' ? 1 : 0
    let isReservable = reservable === 'on' ? 1 : 0
    let isSoftSeating = softSeating === 'on' ? 1 : 0
    let isTableChairs = tableChairs === 'on' ? 1 : 0
    let isMonitor = monitor === 'on' ? 1 : 0
    let isWhiteboard = whiteboard === 'on' ? 1 : 0
    let isWindow = window === 'on' ? 1 : 0
    return prisma.$queryRaw`SELECT 
        Room.id, 
        Block. booked_user_id, 
        Room.accessible, 
        Room.power, 
        Room.reservable, 
        Room.softSeating,  
        Room.tableChairs, 
        Room.monitor, 
        Room.whiteboard, 
        Room.window 
        FROM Room, Block 
        WHERE Block.room_id = Room.id  
        AND Block.time = ${time}`    
}

// ${accessible === 'on' ? 'AND Room.accessible != 0' : 'OR Room.accessible = 0' }
// ${power === 'on' ? 'AND Room.power != 0' : 'OR Room.power = 0' }
// ${reservable === 'on' ? 'AND Room.reservable != 0' : 'OR Room.reservable = 0' }
// ${softSeating === 'on' ? 'AND Room.softSeating != 0' : 'OR Room.softSeating = 0' }
// OR Room.accessible = ${isAccessible}
//     OR Room.power = ${isPower}
// 	OR Room.reservable = ${isReservable}
//     OR Room.softSeating = ${isSoftSeating}
//     OR Room.tableChairs = ${isTableChairs}
//     OR Room.monitor = ${isMonitor}
//     OR Room.whiteboard = ${isWhiteboard}
//     OR Room.window = ${isWindow}
