import { Bench } from "tinybench";
import { difference as _difference } from "lodash-es";

const bench = new Bench({
  warmup: true,
});

const data = [
  Array.from({ length: 100 }, () => Math.floor(Math.random() * 100)),
  Array.from({ length: 30 }, () => Math.floor(Math.random() * 100)),
];

const lodashResult = _difference(data[0], data[1]);
const nativeResult = data.reduce((a, b) => a.filter((c) => !b.includes(c)));

console.assert(
  lodashResult.length === nativeResult.length,
  "Both results should have the same length",
);

console.assert(
  lodashResult.every((v, i) => v === nativeResult[i]),
  "Both results should have the same values",
);

bench
  .add("lodash", () => {
    _difference(data[0], data[1]);
  })
  .add("native", async () => {
    data.reduce((a, b) => a.filter((c) => !b.includes(c)));
  });

await bench.run();

console.table(bench.table());
