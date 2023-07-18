import { sub } from "date-fns";

export function subDays(ref: Date, days: number): Date {
  return sub(ref, { days });
}

export function queryFormat(input: Date): string {
  return input.toISOString().substring(0, 10).replace(/-/g, "");
}
