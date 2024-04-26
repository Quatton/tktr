
export const eventLists = ["purchase", "purchase.failed", "purchase.cancelled", "purchase.success"] as const
export type TKTREvent = typeof eventLists[number]


export function getBaseUrl(origin: string, path: TKTREvent) {
  return `${origin}/api/tktr/${path}`
}
