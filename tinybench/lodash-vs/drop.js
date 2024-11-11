import { Bench } from "tinybench";
import { drop as _drop } from "lodash-es";

const bench = new Bench({
  warmup: true,
});

const data = Array.from({ length: 1_000 }, (_, i) => i);

bench
  .add("lodash", () => {
    _drop(data, 2);
  })
  .add("native", async () => {
    data.slice(2);
  });

await bench.run();

console.table(bench.table());
