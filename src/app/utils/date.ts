export function subDays(ref: Date, days: number): Date {
  return new Date(new Date().setDate(ref.getDate() - days));
}

export function queryFormat(input: Date): string {
  return input.toISOString().substring(0, 10).replace(/-/g, "");
}
