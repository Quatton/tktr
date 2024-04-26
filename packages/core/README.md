# Tickettier

Tickettier is an open-source wrapper for [Stripe](https://stripe.com/) (and hopefully other payment processors in the future!) that makes it easy to create and manage Stripe products and subscriptions as code. It is designed to be a single source of truth for your Stripe products and prices, and to make it easy to manage them in a version-controlled way.

## Table of Contents
- [Tickettier](#tickettier)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Contribution](#contribution)


## Installation

To install Tickettier, run:
```bash
npm install @tktr/core
```

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