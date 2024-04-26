# Tickettier

Tickettier is an open-source wrapper for [Stripe](https://stripe.com/) (and hopefully other payment processors in the future!) that makes it easy to create and manage Stripe products and subscriptions as code. It is designed to be a single source of truth for your Stripe products and prices, and to make it easy to manage them in a version-controlled way.

## This Package
This package `@tktr/core` is a barebone model for Tickettier. It is a simple utility to create and manage product line-ups and common store-related configurations such currency. You might need `@tktr/server` and `@tktr/client` to integrate with your server and client-side applications.

## Table of Contents
- [Tickettier](#tickettier)
  - [This Package](#this-package)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Examples](#examples)
  - [Features Supported](#features-supported)
  - [Contribution](#contribution)


## Installation

To install Tickettier, run:
```bash
npm install @tktr/core
```

## Examples

In Next.js API routes `/api/tktr/[[...catchall]].ts` (only!)
(TODO: Add options to define custom routes)

```ts
// or import these from another file
const store = storeFactory({ currency: 'usd' })

const items = itemsFactory([
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
```

Then in your Next.js app, create an action to purchase an item:

```tsx
<form className="flex justify-between mt-4" method="get" action="/api/tktr/purchase/item-1">
  <button className="bg-zinc-800 text-white px-4 py-2 rounded-md hover:bg-zinc-800/80">
    Purchase
  </button>
</form>
```

We are working on `@tktr/client` to ensure type safety and better error handling.

## Features Supported

- Handling Stripe Checkout Custom Events
  - [x] purchase
  - [x] purchase.success
  - [x] purchase.failure
  - [x] purchase.cancel

## Contribution

We use Bun workspace to manage our monorepo and install dependencies.

> [!NOTE]
> As a first-time maintainer, I am still learning how to manage an open-source project. I am open to any suggestions about the project structure, tools, or anything else.

To install dependencies, run:
```bash
bun install
```

We have a playground to test the library. To run the playground, run:
```bash
bun run playground:dev
```