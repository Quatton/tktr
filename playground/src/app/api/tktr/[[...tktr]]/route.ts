import { stripe } from "@/lib/stripe"
import { itemsFactory, storeFactory } from "@tktr/core"
import { createTKTRStripeHandler } from "@tktr/server/stripe"

export const store = storeFactory({ currency: 'usd' })

export const items = itemsFactory([
  {
    id: "item-1",
    name: "Item 1",
    price: 1000,
  }
])

const handler = createTKTRStripeHandler({
  items,
  store,
  stripe 
})

export { 
  handler as GET,
  handler as POST
}