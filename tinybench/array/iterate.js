import { Bench } from "tinybench";

const tenThousand = new Array(10_000).fill(0);
const oneHundredThousand = new Array(100_000).fill(0);
const oneMillion = new Array(1_000_000).fill(0);

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
