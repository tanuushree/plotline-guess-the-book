import { connectToDatabase } from "../lib/mongodb"

async function testConnection() {
  console.log("Testing MongoDB connection...")

  try {
    const mongoose = await connectToDatabase()
    console.log("✅ Successfully connected to MongoDB!")
    console.log(`Connected to database: ${mongoose.connection.db!.databaseName}`)

    // List all collections
    const collections = await mongoose.connection.db!.listCollections().toArray()
    console.log("\nAvailable collections:")
    collections.forEach((collection) => {
      console.log(`- ${collection.name}`)
    })

    // Close the connection
    await mongoose.connection.close()
    console.log("\nConnection closed successfully")
  } catch (error) {
    console.error("❌ Failed to connect to MongoDB:", error)
  }
}

testConnection()
