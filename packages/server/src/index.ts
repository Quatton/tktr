
export const get_event = ["purchase", "purchase.failed", "purchase.cancelled", "purchase.success"] as const
export type GetEvent = typeof get_event[number]


export function getBaseUrl(origin: string, path: GetEvent) {
  return `${origin}/api/tktr/${path}`
}
