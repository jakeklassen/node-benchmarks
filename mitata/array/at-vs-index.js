import { run, bench, summary } from "mitata";

const oneMillion = new Array(1_000_000).fill(0);

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
