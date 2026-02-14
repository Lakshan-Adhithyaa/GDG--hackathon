export function sanitizeResponse(aiOutput: any[], schema: any) {
  if (!Array.isArray(aiOutput)) return []

  return aiOutput.filter(item => {
    if (!item.title || !item.mutations) return false

    // Only allow fields from schema
    const valid = Object.keys(item.mutations).every(
      key => schema[key] !== undefined
    )

    return valid
  })
}
