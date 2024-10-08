import type { EmptyTuple } from "../../types/tsHelpers"

export const isEmptyArray = <T extends readonly unknown[]>(
  array: T,
): array is EmptyTuple & T => Array.isArray(array) && array.length === 0
