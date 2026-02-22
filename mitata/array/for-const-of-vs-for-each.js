import { run, bench, summary } from "mitata";

const oneMillion = Array.from({ length: 1_000_000 }, (_, i) => i + 1);

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
