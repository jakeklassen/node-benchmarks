import Benchmark from "benchmark";

/**
 * @type {Array<{ [key: string]: number | Promise<number> }>}
 */
export const entities = Array.from({ length: 100_000 }, (v, i) => ({
  syncValue: i,
  asyncValue: Promise.resolve(Math.random()),
}));

/**
 * https://github.com/bestiejs/benchmark.js/issues/176
 * @param {() => Promise<void>} fn
 * @returns
 */
function p(fn) {
  return {
    defer: true,
    /**
     *
     * @param {import('benchmark').Deferred} deferred
     */
    async fn(deferred) {
      await fn();
      deferred.resolve();
    },
  };
}

const suite = new Benchmark.Suite();

suite
  .add(
    "await all props",
    p(async () => {
      for (const entity of entities) {
        for (const [key, value] of Object.entries(entity)) {
          entity[key] = await value;
        }
      }
    }),
  )
  .add(
    "await promises only",
    p(async () => {
      for (const entity of entities) {
        for (const [key, value] of Object.entries(entity)) {
          if (value instanceof Promise) {
            entity[key] = await value;
          }
        }
      }
    }),
  )
  .on("cycle", (/** @type {import('benchmark').Event} */ event) => {
    console.log(String(event.target));
  })
  .run({ async: true });
