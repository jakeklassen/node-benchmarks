import { FORMAT_DEFAULT, suite } from "@thi.ng/bench";

const data = [...Array(100_000).keys()];

const map = new Map();

suite(
  [
    {
      title: "forEach()",
      fn: () => {
        data.forEach((x) => {
          map.get(x);
        });
      },
    },

    {
      title: "for (const of)",
      fn: () => {
        for (const x of data) {
          map.get(x);
        }
      },
    },
  ],
  { iter: 10, size: 100, warmup: 5, format: FORMAT_DEFAULT },
);
