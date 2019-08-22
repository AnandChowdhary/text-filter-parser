import parse from "./";

test("parse an invalid filter", () => {
  expect(parse("invalid filter")).toStrictEqual([]);
});

test("parse a filter with an invalid symbol", () => {
  expect(parse("key ? value")).toStrictEqual([]);
});

test("parse a single rule filter", () => {
  expect(parse("name = Anand")).toStrictEqual([
    {
      key: "name",
      condition: "is",
      value: "Anand"
    }
  ]);
});

test("parse a multiple rule filter", () => {
  expect(parse("first_name = Anand, last_name = Chowdhary")).toStrictEqual([
    {
      key: "first_name",
      condition: "is",
      value: "Anand"
    },
    {
      key: "last_name",
      condition: "is",
      value: "Chowdhary"
    }
  ]);
});

test("parse a multiple rule with greater than filter", () => {
  expect(parse("first_name = Anand, joined > 2019-02-12")).toStrictEqual([
    {
      key: "first_name",
      condition: "is",
      value: "Anand"
    },
    {
      key: "joined",
      condition: "is greater than",
      value: new Date("2019-02-12")
    }
  ]);
});
