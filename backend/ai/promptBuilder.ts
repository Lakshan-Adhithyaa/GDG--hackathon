export default function buildPrompt(schema: any, componentName = "Component") {
  return `
You are a UI reliability system.
Generate 6 structured edge case toggles for this component:

Component: ${componentName}
Schema: ${JSON.stringify(schema)}

Return strict JSON array:
[
  { "title": "...", "mutations": { ... } }
]
`;
}
