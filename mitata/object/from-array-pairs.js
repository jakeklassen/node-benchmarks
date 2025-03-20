import { faker } from "@faker-js/faker";
import { fromPairs } from "lodash-es";
import { bench, run, summary } from "mitata";

const pairs = Array.from({ length: 100_000 }, () => [
  faker.string.alpha(5),
  faker.string.alpha(15),
]);

summary(() => {
  bench("Object.fromEntries", () => {
    Object.fromEntries(pairs);
  });

  bench("lodash fromPairs", () => {
    fromPairs(pairs);
  });
});

await run();
