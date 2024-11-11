import { FORMAT_DEFAULT, suite } from "@thi.ng/bench";
import randomInteger from "just-random-integer";

const entities = [...Array(100_000).keys()].map((x) => ({
  id: x,
  class: class {},
  position: {
    x: randomInteger(0, 100),
    y: randomInteger(0, 100),
  },
}));

const entitiesById = new Map(entities.map((x) => [x.id, x]));
const entityMap = new Map(entities.map((x) => [x, x]));
const entitiesByClass = new Map(entities.map((x) => [x.class, x]));

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

const iterateByClass = () => {
  for (const entity of entities) {
    entitiesByClass.get(entity.class);
  }
};

suite(
  [
    {
      title: "for const of Map<number, Entity>",
      fn: iterateById,
    },

    {
      title: "for const of Map<Entity, Entity>",
      fn: iterateByObject,
    },
    {
      title: "for const of Map<Class, Entity>",
      fn: iterateByClass,
    },
  ],
  { iter: 10, size: 100, warmup: 5, format: FORMAT_DEFAULT },
);
