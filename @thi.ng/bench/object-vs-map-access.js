import { FORMAT_DEFAULT, suite } from "@thi.ng/bench";

const object = {
  name: "foo",
  age: 23,
  address: "bar",
  phone: 123456,
  email: "",
};

const map = new Map(Object.entries(object));

suite(
  [
    {
      title: "object lookup",
      fn: () => {
        object.address;
        object.age;
        object.email = "email@example.com";
        object.name;
        object.phone;
      },
    },

    {
      title: "map.get()",
      fn: () => {
        map.get("address");
        map.get("age");
        map.set("email", "email@example.com");
        map.get("name");
        map.get("phone");
      },
    },
  ],
  { iter: 10, size: 1000, warmup: 5, format: FORMAT_DEFAULT },
);
