import { Contradiction } from "./types";

export function evaluateContradictions(props: any): Contradiction[] {
  const issues: Contradiction[] = [];

  if (props.status === "success" && !props.data) {
    issues.push({
      message: "Success state without data.",
      severity: "high",
    });
  }

  if (props.status === "error" && props.data) {
    issues.push({
      message: "Error state but data exists.",
      severity: "medium",
    });
  }

  if (typeof props.count === "number" && props.count < 0) {
    issues.push({
      message: "Negative count detected.",
      severity: "medium",
    });
  }

  return issues;
}
