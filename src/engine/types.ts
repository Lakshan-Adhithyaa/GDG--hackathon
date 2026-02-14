export type FieldType = "string" | "number" | "boolean" | "array" | "object" | "enum";

export interface SchemaField {
  type: FieldType;
  optional?: boolean;
  values?: string[]; // for enum
}

export interface SchemaDefinition {
  [key: string]: SchemaField;
}

export interface EdgeCase {
  id: string;
  name: string;
  severity: "low" | "medium" | "high";
  exclusiveWith?: string[];
  patch: (props: any) => any;
}

export interface Contradiction {
  message: string;
  severity: "low" | "medium" | "high";
}
