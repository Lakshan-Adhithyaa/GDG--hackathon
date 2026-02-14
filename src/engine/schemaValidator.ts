import { SchemaDefinition } from "./types";

export function validateSchema(
  schema: SchemaDefinition,
  props: any
): boolean {
  return Object.keys(props).every((key) => schema[key]);
}
