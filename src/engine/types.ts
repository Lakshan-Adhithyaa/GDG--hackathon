export type Schema = Record<string, any>

export type Mutation = {
  path: string
  value: any
}

export type AnalysisResult = {
  issues: string[]
}
