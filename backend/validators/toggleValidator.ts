export function validateToggle(toggle: any): boolean {
  if (!toggle || typeof toggle.title !== "string") return false;
  if (!toggle.mutations || typeof toggle.mutations !== "object") return false;
  return true;
}

export default validateToggle;
