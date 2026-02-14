export function buildPrompt(schema: any, componentName: string) {
  return `
You are an AI that generates UI logical edge cases.

Component Name:
${componentName}

Schema:
${JSON.stringify(schema, null, 2)}

Instructions:
- Generate 8 to 12 meaningful edge cases.
- Each edge case must contain:
  title
  mutations
- Mutations must only use fields from schema.
- Return ONLY JSON array.

Example Output:
[
  {
    "title": "Success with null data",
    "mutations": {
      "status": "success",
      "data": null
    }
  }
]
`
}
