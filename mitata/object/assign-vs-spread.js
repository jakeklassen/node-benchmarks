import { bench, group, run, summary } from "mitata";

const object = {
  name: "foo",
  address: {
    city: "New York",
    state: "NY",
    street: "123 Main St",
    postalCode: "10001",
    geolocation: {
      lat: 40.7128,
      lng: -74.006,
    },
  },
  jobHistory: [
    {
      company: "Google",
      title: "Software Engineer",
    },
    {
      company: "Facebook",
      title: "Product Manager",
    },
  ],
  benefits: {
    healthInsurance: true,
    dentalInsurance: false,
  },
  promotionHistory: new Map([
    ["2020", "Senior Software Engineer"],
    ["2021", "Lead Software Engineer"],
    ["2022", "Engineering Manager"],
    ["2023", "Director of Engineering"],
  ]),
};

const ITERATIONS = 100_000;

summary(() => {
  group(`${ITERATIONS} iterations`, () => {
    bench("Object.assign()", () => {
      for (let i = 0; i < ITERATIONS; i++) {
        JSON.stringify(JSON.parse(JSON.stringify(object)));
      }
    });

    bench("...spread", () => {
      for (let i = 0; i < ITERATIONS; i++) {
        structuredClone(object);
      }
    });
  });
});

await run();
