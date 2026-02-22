import { run, bench, summary } from "mitata";
import { compact, uniq } from "lodash-es";

// movie genres, some duplicates, in the format of "genre ${i}"
const data = Array.from({ length: 10_000 }, (_, i) => `genre ${i % 10}`);

const lodashResult = uniq(compact(data));
const nativeResult = Array.from(new Set(data.filter(Boolean)));

// Verify results are the same
console.assert(
  lodashResult.every((val) => nativeResult.includes(val)) &&
    nativeResult.every((val) => lodashResult.includes(val)),
  "Lodash and native Set results differ",
);

summary(() => {
  bench("lodash - compact + uniq", () => {
    uniq(compact(data));
  });

  bench("native array filter + Set", () => {
    Array.from(new Set(data.filter(Boolean)));
  });
});

await run();
