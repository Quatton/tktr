import { stripe } from "@/lib/stripe"
import { createTKTRHandler, itemsFactory, storeFactory } from "@tktr/core"

export const store = storeFactory({ currency: 'usd' })

export const items = itemsFactory([
  {
    id: "item-1",
    name: "Item 1",
    price: 1000,
  }
])

const handler = createTKTRHandler({
  items,
  store,
  stripe 
})

export { 
  handler as GET,
  handler as POST
}