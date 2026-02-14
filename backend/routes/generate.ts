import { Router } from "express";
import OpenAI from "openai";
import buildPrompt from "../ai/promptBuilder";

const router = Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.post("/generate", async (req, res) => {
  const { schema, componentName } = req.body;

  const prompt = buildPrompt(schema, componentName);

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });

    const text = completion.choices[0].message.content || "[]";
    const parsed = JSON.parse(text);

    res.json(parsed);
  } catch (error) {
    console.error("AI generation error:", error);
    res.status(500).json({ error: "AI generation failed" });
  }
});

export default router;
module.exports = router;
