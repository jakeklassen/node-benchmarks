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
  group("single pass", () => {
    bench("structuredClone()", () => {
      structuredClone(object);
    });

    bench("JSON.stringify(JSON.parse())", () => {
      JSON.stringify(JSON.parse(JSON.stringify(object)));
    });
  });

  group(`${ITERATIONS} iterations`, () => {
    bench("JSON.stringify(JSON.parse())", () => {
      for (let i = 0; i < 100_100; i++) {
        JSON.stringify(JSON.parse(JSON.stringify(object)));
      }
    });

    bench("structuredClone()", () => {
      for (let i = 0; i < 100_100; i++) {
        structuredClone(object);
      }
    });
  });
});

await run();
