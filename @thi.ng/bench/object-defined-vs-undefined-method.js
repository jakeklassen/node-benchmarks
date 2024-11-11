import { FORMAT_DEFAULT, suite } from "@thi.ng/bench";

/**
 * @type {{ name: string, sayHi: () => string, promote?: () => void } }}}
 */
const object = {
  name: "foo",
  sayHi: () => "hi",
};

suite(
  [
    {
      title: "sayHi()",
      fn: () => {
        object.sayHi();
      },
    },

    {
      title: "promote?.()",
      fn: () => {
        object.promote?.();
      },
    },
  ],
  { iter: 10, size: 1000, warmup: 50, format: FORMAT_DEFAULT },
);
