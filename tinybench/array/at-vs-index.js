import { Bench } from "tinybench";

const oneMillion = new Array(1_000_000).fill(0);

const bench = new Bench({
  warmup: true,
});

bench
  .add("at(index)", () => {
    for (let i = 0; i < oneMillion.length; i++) {
      oneMillion.at(i);
    }
  })
  .add("[index]", () => {
    for (let i = 0; i < oneMillion.length; i++) {
      oneMillion[i];
    }
  });

await bench.run();

console.table(bench.table());
