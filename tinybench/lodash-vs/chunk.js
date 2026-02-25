import { Bench } from "tinybench";
import { chunk as _chunk } from "lodash-es";

/**
 * @template {Array<any>} T
 * @param {T} input
 * @param {number} size
 */
const chunk = (input, size) => {
  return input.reduce((arr, item, idx) => {
    return idx % size === 0 ? [...arr, [item]] : [...arr.slice(0, -1), [...arr.slice(-1)[0], item]];
  }, []);
};

const bench = new Bench({
  warmup: true,
});

const data = Array.from({ length: 1_000 }, (_, i) => i);

bench
  .add("lodash", () => {
    _chunk(data, 2);
  })
  .add("native", async () => {
    chunk(data, 2);
  });

await bench.run();

console.table(bench.table());
