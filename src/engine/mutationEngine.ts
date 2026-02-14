import { EdgeCase } from "./types";

export function applyEdgeCases(
  baseProps: any,
  activeCases: EdgeCase[]
) {
  return activeCases.reduce(
    (props, edgeCase) => edgeCase.patch(props),
    { ...baseProps }
  );
}
