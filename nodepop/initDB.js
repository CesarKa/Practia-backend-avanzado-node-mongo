import readline from 'node:readline/promises'
import connectMongoose from './lib/connectMongoose.js'
import Product from './models/Products.js'
import User from './models/User.js'

const connection = await connectMongoose()
console.log('Connected to MongoDB:', connection.name)

const answer = await ask('Are you sure you want to delete database collections? (n)')
if (answer.toLowerCase() !== 'y') {
  console.log('Operation aborted.')
  process.exit()
}


const users = await initUsers()
await initProducts(users)

await connection.close()

async function initProducts(users) {
  console.log(users)
  const result = await Product.deleteMany()
  console.log(`Deleted ${result.deletedCount} products.`)

  /*const [admin, user] = await Promise.all([
    User.findOne({ email: 'admin@example.com'}),
    User.findOne({ email: 'user@example.com'}),
  ])*/


  const insertResult = await Product.insertMany([
    {
      name: "Smartphone Galaxy Z",
      owner: users[0]._id,
      price: 999.99,
      image: "1750334711433-.jpg",
      tags: ["mobile", "lifestyle"]
  },
  {
    name: "Laptop Dell XPS 13",
    owner: users[1]._id,
    price: 1199.99,
    image: "https://example.com/images/dell_xps.jpg",
    tags: ["work", "mobile"]
  },
  {
    name: "Electric Car Model X",
    owner: users[2]._id,
    price: 79999.99,
    image: "https://example.com/images/tesla_model_x.jpg",
    tags: ["motor", "lifestyle"]
  },
  ])
  console.log(`Inserted ${insertResult.length} products.`)
}

async function initUsers() {
  // delete all users
  const result = await User.deleteMany()
  console.log(`Deleted ${result.deletedCount} users.`)

  // create users
  const insertResult = await User.insertMany([
    { email: 'admin@example.com', password: await User.hashPassword('1234') },
    { email: 'user1@example.com', password: await User.hashPassword('1234') },
    {email: 'user2@example.com', password: await User.hashPassword('1234') }
  ])
  console.log(`Inserted ${insertResult.length} users.`)
  return insertResult
}

async function ask(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })
  const result = await rl.question(question)
  rl.close()
  return result
}