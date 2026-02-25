import { Bench } from "tinybench";

const tenThousand = Array.from({ length: 10_000 }, () => 0);
const oneHundredThousand = Array.from({ length: 100_000 }, () => 0);
const oneMillion = Array.from({ length: 1_000_000 }, () => 0);

const bench = new Bench({
  warmup: true,
});

bench
  .add("for (const of) 10k", () => {
    for (const x of tenThousand) {
      x;
    }
  })
  .add("for (const of) 100k", () => {
    for (const x of oneHundredThousand) {
      x;
    }
  })
  .add("for (const of) 1M", () => {
    for (const x of oneMillion) {
      x;
    }
  });

await bench.run();

console.table(bench.table());
