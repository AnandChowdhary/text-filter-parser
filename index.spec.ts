import parse from "./";

test("parse an invalid filter", () => {
  expect(parse("invalid filter")).toStrictEqual([]);
});

test("parse a filter with an invalid symbol", () => {
  expect(parse("key ? value")).toStrictEqual([]);
});
