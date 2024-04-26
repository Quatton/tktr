import type { Store, Item } from "@tktr/core";

export function createTKTRClient<TStore extends Store, 
TID extends string,
TItems extends Item<TID>[],
TConfig extends {
  store: Readonly<TStore>,
  items: Readonly<TItems>,
}>
(
  config: Readonly<TConfig>
) {
  return {
    purchase: (itemId: (typeof config["items"])[number]["id"]) => {
      return fetch(`/api/tktr/purchase/${itemId}`)
    },
    getPurchaseUrl: (itemId: (typeof config["items"])[number]["id"]) => {
      return `/api/tktr/purchase/${itemId}`
    },
  }
}