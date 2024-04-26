# Tickettier

Tickettier is an open-source wrapper for Stripe (and hopefully other payment processors in the future) that makes it easy to create and manage Stripe items and subscriptions as code. It is designed to be a single source of truth for your Stripe products and prices, and to make it easy to manage them in a version-controlled way.

## Installation

To install Tickettier, run:
```bash
npm install @tktr/core
```

## Contribution

We use Bun workspace to manage our monorepo and install dependencies.

To install dependencies, run:
```bash
bun install
```

We have a playground to test the library. To run the playground, run:
```bash
bun run playground:dev
```