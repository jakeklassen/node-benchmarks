import { FORMAT_DEFAULT, suite } from "@thi.ng/bench";
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

suite(
  [
    {
      title: "entities by id",
      fn: () => iterateById(),
    },

    {
      title: "entities by object",
      fn: () => iterateByObject(),
    },
  ],
  { iter: 10, size: 100, warmup: 5, format: FORMAT_DEFAULT },
);
