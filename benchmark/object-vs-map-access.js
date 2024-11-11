import Benchmark from "benchmark";

const object = {
  name: "foo",
  age: 23,
  address: "bar",
  phone: 123456,
  email: "",
};

const map = new Map(Object.entries(object));
const suite = new Benchmark.Suite();

suite
  .add("object lookup", () => {
    for (let i = 0; i < 100_000; i++) {
      object.address;
      object.age;
      // object.email = "email@example.com";
      object.name;
      object.phone;
    }
  })
  .add("map.get()", () => {
    for (let i = 0; i < 100_000; i++) {
      map.get("address");
      map.get("age");
      // map.set("email", "email@example.com");
      map.get("name");
      map.get("phone");
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
