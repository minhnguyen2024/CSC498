export const imageURLs = [
    "https://globalassets.starbucks.com/digitalassets/products/bev/SBX20211210_MochaCookieCrumbleFrapp.jpg?impolicy=1by1_tight_288",
    "https://globalassets.starbucks.com/digitalassets/products/bev/SBX20210903_AppleCrispFrapp.jpg?impolicy=1by1_wide_topcrop_630",
    "https://globalassets.starbucks.com/digitalassets/products/bev/SBX20221216_FrozenStrawberryAcaiRefresherLemonade.jpg?impolicy=1by1_wide_topcrop_630",
    "https://globalassets.starbucks.com/digitalassets/products/bev/SBX20211210_MangoDragonfruitLemonadeRefreshers.jpg?impolicy=1by1_wide_topcrop_630",
    "https://globalassets.starbucks.com/digitalassets/products/bev/SBX20190628_GalvaninaSparklingWater.jpg?impolicy=1by1_medium_630",
    "https://globalassets.starbucks.com/digitalassets/products/bev/SBX20211115_MatchaTeaLatte.jpg?impolicy=1by1_wide_topcrop_630",
    "https://globalassets.starbucks.com/digitalassets/products/bev/SBX20190624_%20MintMajestyHerbalTea.jpg?impolicy=1by1_wide_topcrop_630",
    "https://globalassets.starbucks.com/digitalassets/products/bev/SBX20190617_CaffeMisto.jpg?impolicy=1by1_wide_topcrop_630",
    "https://globalassets.starbucks.com/digitalassets/products/bev/SBX20190617_BlondeRoast.jpg?impolicy=1by1_wide_topcrop_630",
]

export const users = [
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
      username: "johndoe_2027",
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
    {
      id: 7,
      username: "cafe_roy_1",
      password: "password",
      admin: 2
    },
    {
      id: 8,
      username: "cafe_roy_2",
      password: "password",
      admin: 2
    },
  ]

  export const rooms = [
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
  
  export const blocks = [
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
  
  export const features = [
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
  
  export const orders = [
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
  
  export const inventory = [
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
    },
    {
      name: "Latte",
      iced: 1,
    },
    {
      name: "Latte",
      iced: 1,
    },
    {
      name: "Mocha",
      iced: 1,
    },
    {
      name: "Mocha",
      iced: 1,
    },
    {
      name: "Espresso",
      iced: 0,
    }
  ]