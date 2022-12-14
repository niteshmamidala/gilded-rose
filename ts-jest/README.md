# Gilded Rose Kata - TypeScript way

## Getting started

Install dependencies

```sh
npm install
```

## Running app
_You may need to install `ts-node`_

```sh
npx ts-node test/golden-master-text-test.ts
```

Or with number of days as args:
```sh
npx ts-node test/golden-master-text-test.ts 10
```

## Running tests

To run all tests

```sh
npm run test
```

To run all tests in watch mode

```sh
npm run test:watch
```
## Linting

To run eslint

```sh
npm run lint
```

## Coverage

```sh
npm run test --coverage
```

## Best practices used:

- Refactored functionality by extracting nested if-else conditions based on item to smaller methods.
- Used switch statement for differentiating item related conditions based on item name.
- Declared item name string as constants for reusability.
- Refactored base conditions like increaseQuality, updateSellIn into seperate methods for reusability and readability.
- Used eslint for identifying problematic code patterns.
