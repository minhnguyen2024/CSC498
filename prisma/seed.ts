import { PrismaClient } from "@prisma/client";
const { v4: uuidv4 } = require('uuid');

const prisma = new PrismaClient();

function getRandomInteger(min:number, max:number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


const users = [
  {
    id: 1,
    username: "minhnguyen_2024",
    password: "pass",
    admin: 0
  },
  {
    id: 2,
    username: "thaohoang_2024",
    password: "password",
    admin: 0
  },
  {
    id: 3,
    username: "alex_2024",
    password: "password",
    admin: 0
  },
  {
    id: 4,
    username: "baker_2025",
    password: "password",
    admin: 0
  },
  {
    id: 5,
    username: "cole_2023",
    password: "password",
    admin: 0
  },
  {
    id: 6,
    username: "admin",
    password: "password",
    admin: 1
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

const features = [
  {
    id: 1,
    featureName: "reserveStudyRoom",
    enabled: 1
  },
  {
    id:2,
    featureName: "orderCafeRoy",
    enabled: 1
  },
]

const orders = [
  {
    userId: 3,
    invId: 1,
  },
  {
    userId: 1,
    invId: 3,
  },
  {
    userId: 2,
    invId: 4,
  }
]

const inventory = [
  {
    name: "Latte",
    iced: 1,
  },
  {
    name: "Cappucino",
    iced: 1,
  },
  {
    name: "Cappucino",
    iced: 0,
  },
  {
    name: "Latte",
    iced: 1,
  }
]

function seedUser() {
  users.forEach(async (item) => await prisma.$executeRaw`INSERT INTO User VALUES (${item.id}, ${item.username}, ${item.password}, ${item.admin})`)
  console.log(`User table has been seeded. 🌱`);
}

async function seedRoom(){
  for (let numRoom = 1; numRoom < 11; numRoom++){
    await prisma.$executeRaw`INSERT INTO Room VALUES (${numRoom}, ${1}, ${1}, ${1}, ${1}, ${1}, ${1}, ${1}, ${1})`
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

async function seedFeature(){
  for(let i = 0; i < features.length; i++){
    await prisma.$executeRaw`INSERT INTO Feature (id, featureName, enabled) VALUES (${features[i].id}, ${features[i].featureName}, ${features[i].enabled})`
  }
  console.log(`Feature table has been seeded. 🌱`);
}

async function seedInventoryAndOrder() {
  for(let i = 0; i < orders.length; i++){
    await prisma.$executeRaw`INSERT INTO Inventory (id, name, iced) VALUES (${uuidv4()}, ${inventory[i].name}, ${inventory[i].iced})`
  }
  console.log(`Inventory table has been seeded. 🌱`);
  const result: any[] = await prisma.$queryRaw`SELECT * FROM Inventory`
  console.log(result)
  for(let i = 0; i < result.length; i++){
    // await prisma.$executeRaw`INSERT INTO Order (id, userId, invId) VALUES (${uuidv4()}, ${getRandomInteger(1, 4)}, ${result[i].id})`
    await prisma.$executeRaw`INSERT INTO Order (id, userId, invId) VALUES (${"dsfdsfs"},${0}, ${"0"})`
  }
  console.log(`Order table has been seeded. 🌱`);
}

seedUser()
seedBlock()
seedRoom()
seedFeature()
seedInventoryAndOrder()


