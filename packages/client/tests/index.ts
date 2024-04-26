import { createTKTRClient } from "@/index"
import { storeFactory, itemsFactory } from "@tktr/core"

const store = storeFactory({ currency: 'usd' })

const items = itemsFactory([
  {
    id: "item-1",
    name: "Item 1",
    price: 1000,
  }
])

const tc = createTKTRClient({
  store,
  items,
})