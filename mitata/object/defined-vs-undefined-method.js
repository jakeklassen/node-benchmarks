import { bench, run, summary } from "mitata";

/**
 * @type {{ name: string, sayHi: () => string, promote?: () => void } }}}
 */
const object = {
  name: "foo",
  sayHi: () => "hi",
};

summary(() => {
  bench("sayHi()", () => {
    object.sayHi();
  });

  bench("promote?.()", () => {
    object.promote?.();
  });
});

await run();
