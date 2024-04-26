import Stripe from "stripe";

/**
 * BaseFactoryConfig
 * 
 * Represents the base configuration for a store
 */
export type BaseFactoryConfig = Readonly<{
  currency: string
}>

/**
 * Item
 * 
 * Represents an item that can be purchased
 */
export type Item = {
  id: string;
  name: string;
  price: number;
  recurring?: Stripe.Checkout.SessionCreateParams.LineItem.PriceData.Recurring
}

/**
 * Might add more stuff in the future than diverges from `BaseFactoryConfig`
 */
export type Store = BaseFactoryConfig

/**
 * Factory function to create a store
 * 
 * Nothing fancy for now, but it's better than to do `satisfies BaseFactoryConfig`
 */
export function storeFactory<TBase extends BaseFactoryConfig>(baseConfig: TBase) {
  return baseConfig
}

/**
 * Factory function to create items
 * 
 * Nothing fancy for now, but it's better than to do `satisfies Item[]`
 */
export function itemsFactory<TItem extends Item>(items: TItem[]) {
  return items
}