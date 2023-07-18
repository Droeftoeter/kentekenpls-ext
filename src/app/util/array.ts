/**
 * Returns the diff of a and b
 */
export function diff<I>(a: I[], b: I[]): I[] {
  return a.filter((item) => !b.includes(item));
}

/**
 * Returns items within a that also appear in b
 */
export function intersect<I>(a: I[], b: I[]): I[] {
  return a.filter((item) => b.includes(item));
}

/**
 * Checks if arrays contain the same elements
 */
export function equals<I>(a: I[], b: I[]): boolean {
  return diff(a, b).length === 0 && diff(b, a).length === 0;
}
