import { storeFactory, itemsFactory } from "@tktr/core"

export const store = storeFactory({ currency: 'usd' })

export const items = itemsFactory([
  {
    id: "item-1",
    name: "Item 1",
    price: 1000,
  }
])