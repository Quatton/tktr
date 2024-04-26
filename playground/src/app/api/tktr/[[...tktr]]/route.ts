import { stripe } from "@/lib/stripe"
import { items, store } from "@/lib/tktr/tktr"
import { createTKTRStripeHandler } from "@tktr/server/stripe"

const handler = createTKTRStripeHandler({
  items,
  store,
  stripe 
})

export { 
  handler as GET,
  handler as POST
}