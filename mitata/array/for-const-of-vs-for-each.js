import { run, bench, summary } from "mitata";

const oneMillion = new Array(1_000_000).fill(0);

summary(() => {
  bench(".forEach", () => {
    oneMillion.forEach((x) => x ** 2);
  });

  bench("for const of", () => {
    for (const x of oneMillion) {
      x ** 2;
    }
  });
});

await run();
