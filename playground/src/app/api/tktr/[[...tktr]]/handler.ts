import { Item, Store } from "@/tktr/items"
import { formatAmountForStripe } from "@/utils/stripe-helpers"
import type { Stripe } from "stripe"

export const get_event = ["purchase", "purchase.failed", "purchase.cancelled", "purchase.success"] as const
export type GetEvent = typeof get_event[number]

function getBaseUrl(origin: string, path: GetEvent) {
  return `${origin}/api/tktr/${path}`
}


const tktrErrors = {
  INVALID_COMMAND: 400,
  INVALID_ITEM: 400,

  CREATE_CHECKOUT_SESSION_FAILED: 500,
  RETRIEVE_CHECKOUT_SESSION_FAILED: 500,
  NOT_IMPLEMENTED: 501,
} as const

type TKTRErrorType = keyof typeof tktrErrors

class TKTRError extends Error {
  status: number

  constructor(code: TKTRErrorType) {
    
    super(code)
    this.status = tktrErrors[code]
  }

  toResponse() {
    return new Response(JSON.stringify(
      { message: this.message }
    ), { status: this.status })
  }
}

class TKTRResponse extends Response {
  constructor(json: any, init?: ResponseInit) {
    super(JSON.stringify(json), init)
  }
}

type HandlerConfig<TStore extends Store, TItem extends Item, TStripe extends Stripe> = {
  stripe: TStripe
  store: TStore
  items: TItem[]
}

export function createTKTRHandler<TStore extends Store, TItem extends Item, TStripe extends Stripe>({
  stripe,
  store,
  items
}: HandlerConfig<TStore, TItem, TStripe>) {
  return {
    GET: async (request: Request) => createGetHandler<TStore, TItem, TStripe>(request, { stripe, store, items })
  
  }
}

async function createGetHandler<TStore extends Store, TItem extends Item, TStripe extends Stripe>(
  request: Request,
  { stripe, store, items }: HandlerConfig<TStore, TItem, TStripe>
) {
  const routeMatcher = /\/api\/tktr\/(.*)/

  const url = new URL(request.url)

  const route = url.pathname.match(routeMatcher)![1]

  const origin = url.origin

  const [_command, ...params] = route.split("/")

  let command: typeof get_event[number] | undefined
  if ((command = get_event.find((k) => k === _command)) === undefined) {
    return new TKTRError("INVALID_COMMAND").toResponse()
  }

  switch (command) {
    case "purchase": {
      const [_item, ...rest] = params

      let item: Item | undefined;
      if ((item = items.find((i) => i.id === _item)) === undefined) {
        return new TKTRError("INVALID_ITEM").toResponse()
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
              unit_amount: formatAmountForStripe(item.price, store.currency),
              recurring: item.recurring,
            },
          },
        ],
        mode: "payment",
        ui_mode: "hosted",
        success_url: `${success_url}?${search.toString()}`,
        cancel_url: `${cancel_url}?${search.toString()}`,
      })

      if (!url) return new TKTRError("CREATE_CHECKOUT_SESSION_FAILED").toResponse()

      return Response.redirect(url, 303)
    }
    case "purchase.success": {
      const [_item, sessionId] = params

      const item = items.find((i) => i.id === _item)

      if (!item) return new TKTRError("INVALID_ITEM").toResponse()

      const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId, {
        expand: ["line_items", "payment_intent"],
      })

      const paymentIntent = checkoutSession.payment_intent as Stripe.PaymentIntent | null

      if (!paymentIntent) return new TKTRError("RETRIEVE_CHECKOUT_SESSION_FAILED").toResponse()

  const continueTo = url.searchParams.get("continue")!

      return Response.redirect(
        continueTo,
        303
      )

    }
    case "purchase.cancelled": {
      const [_item] = params

      const continueTo = url.searchParams.get("continue")!

      return Response.redirect(
        continueTo,
        303
      )
    }
    default: {
      return new TKTRError("NOT_IMPLEMENTED").toResponse()
    }
  }
}