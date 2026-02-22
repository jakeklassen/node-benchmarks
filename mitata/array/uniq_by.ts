import { run, bench, summary } from "mitata";
import { uniqBy } from "lodash-es";
import { unique } from "radash";
import * as R from "remeda";

// 100 movie genres, some duplicates, in the format of { name: "genre" }
const data = Array.from({ length: 100 }, (_, i) => ({
  name: `genre ${i % 10}`,
}));

const lodashResult = uniqBy(data, "name");
const radashResult = unique(data, (el) => el.name);
const remedaResult = R.uniqueBy(data, (el) => el.name);

// Verify results are the same
console.assert(
  JSON.stringify(lodashResult) === JSON.stringify(radashResult),
  "Lodash and Radash results differ",
);
console.assert(
  JSON.stringify(lodashResult) === JSON.stringify(remedaResult),
  "Lodash and Remeda results differ",
);

summary(() => {
  bench("lodash", () => {
    uniqBy(data, "name");
  });

  bench("radash", () => {
    unique(data, (el) => el.name);
  });

  bench("remeda", () => {
    R.uniqueBy(data, (el) => el.name);
  });
});

await run();
