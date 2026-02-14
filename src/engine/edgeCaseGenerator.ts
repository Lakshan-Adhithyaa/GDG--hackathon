import { SchemaDefinition, EdgeCase } from "./types";

export function generateEdgeCases(schema: SchemaDefinition): EdgeCase[] {
  const cases: EdgeCase[] = [];

  Object.keys(schema).forEach((key) => {
    const field = schema[key];

    // Optional → undefined
    if (field.optional) {
      cases.push({
        id: `${key}-undefined`,
        name: `${key} set to undefined`,
        severity: "medium",
        patch: (props) => ({ ...props, [key]: undefined }),
      });
    }

    // Boolean flip
    if (field.type === "boolean") {
      cases.push({
        id: `${key}-flip`,
        name: `${key} flipped`,
        severity: "low",
        patch: (props) => ({ ...props, [key]: !props[key] }),
      });
    }

    // Negative number
    if (field.type === "number") {
      cases.push({
        id: `${key}-negative`,
        name: `${key} negative`,
        severity: "medium",
        patch: (props) => ({ ...props, [key]: -1 }),
      });
    }

    // Enum variations
    if (field.type === "enum" && field.values) {
      field.values.forEach((value) => {
        cases.push({
          id: `${key}-${value}`,
          name: `${key} = ${value}`,
          severity: "low",
          patch: (props) => ({ ...props, [key]: value }),
        });
      });
    }
  });

  return cases.slice(0, 12);
}
