/**
 * BaseFactoryConfig
 * 
 * Represents the base configuration for a store
 */
export type BaseFactoryConfig = {
  currency: string
}

/**
 * Item
 * 
 * Represents an item that can be purchased
 */
export type Item<TID extends string = string> = {
  id: TID
  name: string;
  price: number;
  recurring?: {
    /**
     * Specifies billing frequency. Either `day`, `week`, `month` or `year`.
     */
    interval: "day" | "week" | "month" | "year";

    /**
     * The number of intervals between subscription billings. For example, `interval=month` and `interval_count=3` bills every 3 months. Maximum of three years interval allowed (3 years, 36 months, or 156 weeks).
     */
    interval_count?: number;
  }

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
export function storeFactory<TBase extends BaseFactoryConfig>(baseConfig: Readonly<TBase>) {
  return baseConfig
}

/**
 * Factory function to create items
 * 
 * Nothing fancy for now, but it's better than to do `satisfies Item[]`
 */
export function itemsFactory<
TID extends string,
TItems extends Item<TID>[]
>(items: Readonly<TItems>) {
  return items
}