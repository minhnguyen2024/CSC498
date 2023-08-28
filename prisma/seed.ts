import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const users = [
  {
    id: 1,
    username: "minhnguyen_2024",
    password: "pass"
  },
  {
    id: 2,
    username: "thaohoang_2024",
    password: "password"
  },
  {
    id: 3,
    username: "alex_2024",
    password: "password"
  },
  {
    id: 4,
    username: "baker_2025",
    password: "password"
  },
  {
    id: 5,
    username: "cole_2023",
    password: "password"
  },
]

const rooms = [
  {
    id: 1,
    display: 1,
    table: 0,
  },
  {
    id: 2,
    display: 0,
    table: 0,
  },
  {
    id: 3,
    display: 1,
    table: 1,
  },
]

const blocks = [
  {
    room_id: 1,
    time: 1,
    booked_user_id: 0,
  },
  { 
    room_id: 1,
    time: 2,
    booked_user_id: 0,
  },
  { 
    room_id: 1,
    time: 3,
    booked_user_id: 0,
  },
  { 
    room_id: 1,
    time: 4,
    booked_user_id: 0,
  },
  { 
    room_id: 1,
    time: 5,
    booked_user_id: 0,
  },
  { 
    room_id: 1,
    time: 6,
    booked_user_id: 0,
  },
  { 
    room_id: 1,
    time: 7,
    booked_user_id: 0,
  },
  { 
    room_id: 2,
    time: 1,
    booked_user_id: 0,
  },
  { 
    room_id: 2,
    time: 2,
    booked_user_id: 0,
  },
  { 
    room_id: 2,
    time: 3,
    booked_user_id: 0,
  },
  { 
    room_id: 3,
    time: 1,
    booked_user_id: 0,
  },
  { 
    room_id: 3,
    time: 2,
    booked_user_id: 0,
  },
  { 
    room_id: 3,
    time: 3,
    booked_user_id: 0,
  },
]

function seedUser() {
  users.forEach(async (item) => await prisma.$executeRaw`INSERT INTO User VALUES (${item.id}, ${item.username}, ${item.password})`)
  console.log(`User table has been seeded. 🌱`);
}

async function seedRoom(){
  for (let numRoom = 1; numRoom < 11; numRoom++){
    await prisma.$executeRaw`INSERT INTO Room VALUES (${numRoom}, ${1}, ${1})`
  }
  console.log(`Room table has been seeded. 🌱`);
}

async function seedBlock(){
  for (let numRoom = 1; numRoom < 11; numRoom++){
    for (let numBlock = 1; numBlock < 50; numBlock++){
      await prisma.$executeRaw`INSERT INTO Block (room_id, time, booked_user_id) VALUES (${numRoom}, ${numBlock}, ${0})`
    }
  }
  console.log(`Block table has been seeded. 🌱`);
}

async function selectExample(username: string){
  const result = await prisma.$queryRaw`SELECT * FROM User WHERE username = ${username}`
  return result
}

async function seedSingleUser({username, password}: {username: string, password: string}){
  await prisma.$executeRaw`INSERT INTO User (username, password) VALUES (${username}, ${password})`
}

seedUser()
seedBlock()
seedRoom()


