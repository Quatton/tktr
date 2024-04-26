# Tickettier

Tickettier is an open-source wrapper for [Stripe](https://stripe.com/) (and hopefully other payment processors in the future!) that makes it easy to create and manage Stripe products and subscriptions as code. It is designed to be a single source of truth for your Stripe products and prices, and to make it easy to manage them in a version-controlled way.

The name, project structure, and patterns are inspired by [tRPC](https://trpc.io/), despite with no features related to it.

## Table of Contents
- [Tickettier](#tickettier)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Roadmap](#roadmap)
    - [Core](#core)
    - [Server and Client Wrapped Handlers](#server-and-client-wrapped-handlers)
    - [Auth](#auth)
    - [Ticket and Tier](#ticket-and-tier)
  - [Contribution](#contribution)


## Installation

To install Tickettier, run:
```bash
npm install @tktr/core
```

## Roadmap

Tickettier is currently in the **early stages** of development. We know that working with webhooks, managing subscriptions, verifying payments, linking transactions to users and authorizing access to resources are pain points for developers.

Some developers even get stuck making commercial products because they are not confident working with Stripe despite potentially shipping a banger product. We are looking to solve these problems and more.

### Core

In the first phase, we are focusing on creating a simple API to create and manage products and prices, so-called
`@tktr/core` package. We are also working on a playground to test the library.

`@tktr/core` is a barebone for 
- defining products and prices line-ups
- common store-related configurations such as tax rates, currency, and payment methods
- utility functions to redirect users to Stripe checkout with a callback to a success or failure URL

> [!NOTE]  
> Let's say it's done for now in v0.1.0

### Server and Client Wrapped Handlers

In the second phase, we will focus on creating a `@tktr/server` and `@tktr/client` package to easily integrate with your server and client-side applications with a few lines of code and better error handling.

Imagine having this catch-all route in your Next.js app:

```ts
// app/api/tktr/[[...catchall]].ts

const handler = createTKTRHandler({
  store,
  items,
  paymentState: async (targetItem: Item) => {
    // inject this into the callback URL
  }
  onAfterSuccess: async (paymentIntent) => {
    // Do something after a successful payment
  },
  onAfterFailure: async (paymentIntent) => {
    // Do something after a failed payment
  }
})
```

While in your client-side, you have this simple buy button:

```tsx
// app/pages/index.tsx

import { useTKTR } from "@tktr/client"
import { myItems } from "../items"

export default function Home() {
  const { purchase, isNavigating } = useTKTR()

  return (
    {
      myItems.map((item) => (
        <button 
        onClick={() => purchase(item.id)}
          disabled={isNavigating}
        >
          Buy {item.name}
        </button>
      ))
    }
  )
}
```

### Auth

In the third phase, we will focus on creating a `@tktr/auth` package to easily manage user authentication and authorization with Stripe. We might see more pay-before-auth or pay-to-auth patterns in the future. But essentially, linking transactions to users and authorizing access could be easier in this phase.

### Ticket and Tier

The name Tickettier comes from the idea of having tickets and tiers. We are looking a way to handle pay-per-use models and at the same time a tiered subscription model with versioning (e.g. legacy free-tier with a different pricing model).

The implementation is not steady but these are the teasers of what we are working on! We are welcome for any pain points you have with Stripe and we will try to solve them with Tickettier.

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