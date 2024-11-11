import Benchmark from "benchmark";

const data = [...Array(100_000).keys()];

const map = new Map();

const suite = new Benchmark.Suite();

suite
  .add("forEach()", () => {
    data.forEach((x) => {
      map.get(x);
    });
  })
  .add("for const of", () => {
    for (const x of data) {
      map.get(x);
    }
  })
  .on("cycle", (/** @type {import('benchmark').Event} */ event) => {
    console.log(String(event.target));
  })
  .on(
    "complete",
    /** @this {import('benchmark').Suite} */ function () {
      console.log(`Fastest is "${this.filter("fastest").map("name")}"`);
    },
  )
  .run({ async: true });
