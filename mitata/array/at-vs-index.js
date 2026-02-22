import { run, bench, summary } from "mitata";

const oneMillion = Array.from({ length: 1_000_000 }, (_, i) => i + 1);

summary(() => {
  bench("at(index)", () => {
    for (let i = 0; i < oneMillion.length; i++) {
      oneMillion.at(i);
    }
  });

  bench("[index]", () => {
    for (let i = 0; i < oneMillion.length; i++) {
      oneMillion[i];
    }
  });
});

await run();
