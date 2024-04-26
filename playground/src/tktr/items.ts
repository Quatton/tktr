import Stripe from "stripe";

export const store = storeFactory({ currency: 'usd' }).items([
  {
    id: "item-1",
    name: "Item 1",
    price: 1000,
  }
])


export type BaseFactoryConfig = {
  currency: string
}

export type Item = {
  id: string;
  name: string;
  price: number;
  recurring?: Stripe.Checkout.SessionCreateParams.LineItem.PriceData.Recurring
}

export type Store = BaseFactoryConfig & { items: Item[]

  get_line_items: () => Stripe.Checkout.SessionCreateParams.LineItem[]

 } extends infer A ?{
  [K in keyof A]: A[K]
} : never

function storeFactory<TBase extends BaseFactoryConfig>(baseConfig: TBase) {
  return {
    items: (_items: Item[]): Store => {
    return {
      ...baseConfig,
      items: _items,

      get_line_items: () => _items.map((item) => ({
        
      }))
    }
  }}
}