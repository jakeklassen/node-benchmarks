import { Bench } from "tinybench";
import { concat as _concat } from "lodash-es";

const bench = new Bench({
  warmup: true,
});

/** @type {(number | number[])[]} */
const data = Array.from({ length: 1_000 }, (_, i) => i);

bench
  .add("lodash", () => {
    _concat(data, 2, [3], [[4]]);
  })
  .add("native", async () => {
    data.concat(2, [3], [[4]]);
  });

await bench.run();

console.table(bench.table());
