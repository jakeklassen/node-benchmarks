import Benchmark from "benchmark";
import randomInteger from "just-random-integer";

const entities = [...Array(100_000).keys()].map((x) => ({
  id: x,
  position: {
    x: randomInteger(0, 100),
    y: randomInteger(0, 100),
  },
}));

const entitiesById = new Map(entities.map((x) => [x.id, x]));
const entityMap = new Map(entities.map((x) => [x, x]));

const iterateById = () => {
  for (const entity of entities) {
    entitiesById.get(entity.id);
  }
};

const iterateByObject = () => {
  for (const entity of entities) {
    entityMap.get(entity);
  }
};

const suite = new Benchmark.Suite();

suite
  .add("for const of entities by id", iterateById)
  .add("for const of entities by object", iterateByObject)
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
