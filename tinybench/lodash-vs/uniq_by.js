import { Bench } from "tinybench";
import { uniqBy } from "lodash-es";
import { unique } from "radash";
import * as R from "remeda";

const bench = new Bench({
  warmup: true,
});

// 100 movie genres, some duplicates, in the format of { name: "genre" }
const data = Array.from({ length: 100 }, (_, i) => ({
  name: `genre ${i % 10}`,
}));

const lodashResult = uniqBy(data, "name");
const radashResult = unique(data, (el) => el.name);
const remedaResult = R.uniqueBy(data, (el) => el.name);

console.assert(
  lodashResult.length === radashResult.length && lodashResult.length === remedaResult.length,
  "All results should have the same length",
);

console.assert(
  lodashResult.every((v, i) => v === radashResult[i] && v === remedaResult[i]),
  "All results should have the same values",
);

bench
  .add("lodash", () => {
    uniqBy(data, "name");
  })
  .add("radash", async () => {
    unique(data, (el) => el.name);
  })
  .add("remeda", async () => {
    R.uniqueBy(data, (el) => el.name);
  });

await bench.run();

console.table(bench.table());
