import { Bench } from "tinybench";
import { has as _has } from "lodash-es";

const bench = new Bench({
  warmup: true,
});

console.log(`Running node ${process.version}`);

/**
 *
 * @param {Record<string, any>} obj
 * @param {string} key
 * @returns {boolean}
 */
const has = function (obj, key) {
  var keyParts = key.split(".");

  return keyParts.length > 1
    ? has(obj[key.split(".")[0]], keyParts.slice(1).join("."))
    : Object.hasOwnProperty.call(obj, key);
};

/**
 *
 * @param {Record<string, any>} obj
 * @param {string} key
 * @returns {boolean}
 */
const hasDumb = function (obj, key) {
  return !!obj?.[key];
};

/**
 *
 * @param {Record<string, any>} obj
 * @param {string} key
 * @returns {boolean}
 */
const hasIn = function (obj, key) {
  return key in obj;
};

const entity = {
  id: 1,
  circleCollider: {
    radius: 10,
  },
  playerTag: true,
  transform: {
    position: {
      x: 0,
      y: 0,
    },
  },
  velocity: {
    x: 0,
    y: 0,
  },
};

bench
  .add("lodash", () => {
    _has(entity, "transform");
  })
  .add("native", async () => {
    has(entity, "transform");
  })
  .add("dumb", async () => {
    hasDumb(entity, "transform");
  })
  .add("in", async () => {
    hasIn(entity, "transform");
  });

await bench.run();

console.table(bench.table());
