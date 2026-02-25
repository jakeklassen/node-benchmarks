import { Bench } from "tinybench";
import { uniq } from "lodash-es";
import assert from "node:assert";

const bench = new Bench({
  warmup: true,
});

const data = Array.from({ length: 100_000 }, () => Math.floor(Math.random() * 100));

assert(
  uniq(data).length === Array.from(new Set(data)).length,
  "Both results should have the same length",
);

bench
  .add("lodash unqi", () => {
    uniq(data);
  })
  .add("native Set", async () => {
    Array.from(new Set(data));
  });

await bench.run();

console.table(bench.table());
