import { Bench } from "tinybench";
import { compact as _compact } from "lodash-es";

const bench = new Bench({
  warmup: true,
});

bench
  .add("lodash", () => {
    _compact([0, 1, false, 2, "", 3]);
  })
  .add("native", async () => {
    [0, 1, false, 2, "", 3].filter(Boolean);
  });

await bench.run();

console.table(bench.table());
