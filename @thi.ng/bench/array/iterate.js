import { FORMAT_DEFAULT, suite } from "@thi.ng/bench";

const tenThousand = Array.from({ length: 10_000 }, () => 0);
const oneHundredThousand = Array.from({ length: 100_000 }, () => 0);
const oneMillion = Array.from({ length: 1_000_000 }, () => 0);

suite(
  [
    {
      title: "for (const of) 10k",
      fn: () => {
        for (const x of tenThousand) {
          x;
        }
      },
    },

    {
      title: "for (const of) 100k",
      fn: () => {
        for (const x of oneHundredThousand) {
          x;
        }
      },
    },

    {
      title: "for (const of) 1M",
      fn: () => {
        for (const x of oneMillion) {
          x;
        }
      },
    },
  ],
  { iter: 10, size: 100, warmup: 5, format: FORMAT_DEFAULT },
);
