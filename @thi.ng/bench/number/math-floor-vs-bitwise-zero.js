import { FORMAT_DEFAULT, suite } from "@thi.ng/bench";

const data = new Array(100_000).fill(0).map((_, i) => Math.random() * i);

suite(
  [
    {
      title: "Math.floor()",
      fn: () => {
        data.map((number) => Math.floor(number));
      },
    },

    {
      title: "| 0",
      fn: () => {
        data.map((number) => number | 0);
      },
    },
  ],
  { iter: 10, size: 100, warmup: 5, format: FORMAT_DEFAULT },
);
