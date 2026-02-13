import { Schema, AnalysisResult } from './types'

export function analyze(schema: Schema): AnalysisResult {
  return { issues: [] }
}

export default analyze
