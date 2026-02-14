import express from "express"
import cors from "cors"
import dotenv from "dotenv"

// IMPORTANT: keep .js extension (NodeNext rule)
import generateEdgeCasesRoute from "./routes/generateEdgeCases.js"

// Load environment variables
dotenv.config()

// Create Express app
const app = express()

// Middlewares
app.use(cors())
app.use(express.json())

// Simple health check route (optional but recommended)
app.get("/", (req, res) => {
  res.json({ status: "Backend is running 🚀" })
})

// Main API route
app.use("/api", generateEdgeCasesRoute)

// Server Port
const PORT = 3001

// 🔥 START SERVER (MOST IMPORTANT PART)
app.listen(PORT, () => {
  console.log(`🚀 AI Backend running on http://localhost:${PORT}`)
})
