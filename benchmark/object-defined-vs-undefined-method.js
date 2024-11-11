import Benchmark from "benchmark";

/**
 * @type {{ name: string, sayHi: () => string, promote?: () => void } }}}
 */
const object = {
  name: "foo",
  sayHi: () => "hi",
};

const suite = new Benchmark.Suite();

suite
  .add("sayHi()", () => {
    object.sayHi();
  })
  .add("promote?.()", () => {
    object.promote?.();
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
