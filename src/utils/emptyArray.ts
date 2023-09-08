import type { EmptyTuple } from "../types/tsHelpers";
/**
 * An empty array that is used to maintain referential integrity after performing methods like {@link Array.map} or {@link Array.filter}
 * that return a brand new array reference.
 */
const EMPTY_ARRAY: EmptyTuple = [];

export default EMPTY_ARRAY;
