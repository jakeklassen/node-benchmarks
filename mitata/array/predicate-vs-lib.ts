import { run, bench, summary } from "mitata";
import { z } from "zod";
import { type } from "arktype";

const PersonSchemaArk = type({
  name: "string",
  age: "number",
});

const PersonSchemaZod = z.object({
  name: z.string(),
  age: z.number(),
});

function isDefined<T extends object, K extends keyof T>(
  obj: T,
  ...keys: K[]
): obj is T & Required<{ [P in K]: NonNullable<T[P]> }> {
  for (const key of keys) {
    if (obj[key] == null) {
      return false;
    }
  }

  return true;
}

type Person = {
  name: string;
  age: number | null;
};

const oneMillionPeople: Person[] = Array.from(
  { length: 1_000_000 },
  (_, i) => ({
    name: `Person ${i}`,
    age: i % 2 === 0 ? i : null,
  }),
);

summary(() => {
  bench("predicate", () => {
    oneMillionPeople
      .filter((person) => isDefined(person, "name", "age"))
      .map((person) => person.age + 1);
  });

  bench("zod schema", () => {
    oneMillionPeople
      .filter((person): person is z.infer<typeof PersonSchemaZod> => {
        try {
          PersonSchemaZod.parse(person);

          return true;
        } catch {
          return false;
        }
      })
      .map((person) => person.age + 1);
  });

  bench("arktype schema", () => {
    oneMillionPeople
      .filter((person): person is typeof PersonSchemaArk.infer => {
        const result = PersonSchemaArk(person);

        return result instanceof type.errors;
      })
      .map((person) => person.age + 1);
  });
});

await run();
