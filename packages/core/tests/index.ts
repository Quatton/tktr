import { itemsFactory, storeFactory } from "@/store"

const store = storeFactory({ currency: 'usd' })

const items = itemsFactory([
  {
    id: "item-1",
    name: "Item 1",
    price: 1000,
  }
])
