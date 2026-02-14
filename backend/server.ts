import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.post("/api/generate-edge-states", async (req, res) => {
  const { schema, componentName } = req.body;

  const prompt = `
You are an expert in UI semantic integrity testing.

Given this component schema:
${JSON.stringify(schema)}

Generate 8 realistic UI edge case scenarios.

Return STRICT JSON array only:
[
  {
    "title": "Missing Required Field",
    "mutations": { "field": null }
  }
]
`;

  try {
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    const cleaned = responseText.replace(/```json|```/g, "").trim();

    const parsed = JSON.parse(cleaned);

    res.json(parsed);
  } catch (error) {
    console.error("Gemini error:", error);
    res.status(500).json({ error: "Failed to generate edge states" });
  }
});

app.listen(5000, () => {
  console.log("Sential backend running on http://localhost:5000");
});
