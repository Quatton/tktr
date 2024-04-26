import { stripe } from "@/lib/stripe"

import { createTKTRHandler } from "./handler"
import { storeFactory, itemsFactory } from "@/tktr/items"

export const store = storeFactory({ currency: 'usd' })


export const items = itemsFactory([
  {
    id: "item-1",
    name: "Item 1",
    price: 1000,
  }
])

const { GET } = createTKTRHandler({
  items,
  store,
  stripe 
})

export { 
  GET
}