import type { EmptyTuple } from "../types/tsHelpers.js"

/**
 * An empty array that is used to maintain referential integrity after
 * performing methods like {@linkcode Array.map} or {@linkcode Array.filter}
 * that return a brand new array reference.
 */
export const EMPTY_ARRAY: EmptyTuple = []
