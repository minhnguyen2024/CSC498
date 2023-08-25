import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const users = [
  {
    id: 4,
    username: "alex_2024",
    password: "password"
  },
  {
    id: 5,
    username: "baker_2025",
    password: "password"
  },
  {
    id: 6,
    username: "cole_2023",
    password: "password"
  },
]


function seedUser() {
  users.forEach(async (item) => await prisma.$executeRaw`INSERT INTO User VALUES (${item.id}, ${item.username}, ${item.password})`)
  console.log(`User table has been seeded. 🌱`);
}
// seedUser()

async function seedSingleUser({username, password}: {username: string, password: string}){
  await prisma.$executeRaw`INSERT INTO User (username, password) VALUES (${username}, ${password})`
}

// seedSingleUser({username: "danny_2024", password: "pass"})

async function selectExample(username: string){
  const result = await prisma.$queryRaw`SELECT * FROM User WHERE username = ${username}`
  return result
}
selectExample("minhnguyen_2024").then(result => console.log(result))


