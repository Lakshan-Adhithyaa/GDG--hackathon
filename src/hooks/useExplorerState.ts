import { useState } from 'react'

export default function useExplorerState() {
  const [state, setState] = useState<Record<string, any>>({})
  return { state, setState }
}
