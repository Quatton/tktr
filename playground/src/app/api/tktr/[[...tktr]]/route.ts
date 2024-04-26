import { stripe } from "@/lib/stripe"
import { Item, store } from "@/tktr/items"
import { NextResponse } from "next/server"
import Stripe from "stripe"

const get_event = ["purchase", "purchase.failed", "purchase.cancelled", "purchase.success"] as const
type GetEvent = typeof get_event[number]

function getBaseUrl(origin: string, path: GetEvent) {
  return `${origin}/api/tktr/${path}`
}

export async function GET(request : Request) {
  const routeMatcher = /\/api\/tktr\/(.*)/

  const url = new URL(request.url)

  const route = url.pathname.match(routeMatcher)![1]

  const origin = request.headers.get("origin")!
  const [_command, ...params] = route.split("/")

  let command: typeof get_event[number] | undefined
  if ((command = get_event.find((k) => k === _command)) === undefined) {
    return NextResponse.json({ message: "Invalid command" }, { status: 400 })
  }

  switch (command) {
    case "purchase": {
      const [_item, ...rest] = params

      let item: Item | undefined;
      if ((item = store.items.find((i) => i.id === _item)) === undefined) {
        return NextResponse.json({ message: "Invalid item" }, { status: 400 })
      }

      const success_url = `${getBaseUrl(origin, "purchase.success")}/${item.id}/{CHECKOUT_SESSION_ID}`
      const cancel_url = `${getBaseUrl(origin, "purchase.cancelled")}/${item.id}`

      const search = new URLSearchParams()

  const redirectBack = request.headers.get("referer")!
      search.set("continue", redirectBack)

      const {url} = await stripe.checkout.sessions.create({
        currency: "usd",
        line_items: [
          {
            quantity: 1,
            price_data: {
              currency: store.currency,
              product_data: {
                name: item.name,
              },
              unit_amount: item.price,
              recurring: item.recurring,
            },
          }
        ],
        mode: "payment",
        ui_mode: "hosted",
        success_url: `${success_url}?${search.toString()}`,
        cancel_url: `${cancel_url}?${search.toString()}`,
      })

      if (!url) return NextResponse.json({ message: "Failed to create checkout session" }, { status: 500 })

      return NextResponse.redirect(
        url,
        { status: 303 }
      )
    }
    case "purchase.success": {
      const [_item, sessionId] = params

      const item = store.items.find((i) => i.id === _item)

      if (!item) return NextResponse.json({ message: "Invalid item but wait they paid us??" }, { status: 400 })

      const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId, {
        expand: ["line_items", "payment_intent"],
      })

      const paymentIntent = checkoutSession.payment_intent as Stripe.PaymentIntent | null

      if (!paymentIntent) return NextResponse.json({ message: "No payment intent" }, { status: 500 })

  const continueTo = url.searchParams.get("continue")!

      return NextResponse.redirect(
        continueTo,
        { status: 303 }
      )
      
    }
  }

  return NextResponse.json({ message: "Hello" })
}
