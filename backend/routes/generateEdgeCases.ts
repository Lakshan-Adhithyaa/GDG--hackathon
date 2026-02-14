import { Router } from "express"
import OpenAI from "openai"

import { buildPrompt } from "../ai/buildPrompt"
import { sanitizeResponse } from "../validators/sanitizeResponse"

const router = Router()

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

router.post("/generate-edge-cases", async (req, res) => {
  try {
    const { schema, componentName } = req.body

    if (!schema) {
      return res.status(400).json({ error: "Schema required" })
    }

    const prompt = buildPrompt(schema, componentName)

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }]
    })

    const raw = completion.choices[0].message.content || "[]"

    let parsed: any[] = []

    try {
      parsed = JSON.parse(raw)
    } catch {
      parsed = []
    }

    const cleaned = sanitizeResponse(parsed, schema)

    res.json(cleaned)

  } catch (error) {
    console.error("AI Error:", error)
    res.json([])
  }
})

export default router
