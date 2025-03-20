import { Bench } from "tinybench";

const bench = new Bench({
  warmup: true,
});

/**
 * @type {{ name: string, sayHi: () => string, promote?: () => void } }}}
 */
const object = {
  name: "foo",
  sayHi: () => "hi",
};

bench
  .add("sayHi()", () => {
    object.sayHi();
  })
  .add("promote?.()", () => {
    object.promote?.();
  });

await bench.run();

console.table(bench.table());
