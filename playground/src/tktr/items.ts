import Stripe from "stripe";

export type BaseFactoryConfig = Readonly<{
  currency: string
}>

export type Item = {
  id: string;
  name: string;
  price: number;
  recurring?: Stripe.Checkout.SessionCreateParams.LineItem.PriceData.Recurring
}

export type Store = BaseFactoryConfig

export function storeFactory<TBase extends BaseFactoryConfig>(baseConfig: TBase) {
  return baseConfig
}

export function itemsFactory<TItem extends Item>(items: TItem[]) {
  return items
}