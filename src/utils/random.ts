import { randomBytes } from "crypto";

export function randomId(length: number = 12): string {
  return randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length)
}