import Parser from "./";

test("parse an invalid filter", () => {
  expect(new Parser("invalid filter").toJSON()).toStrictEqual([]);
});

test("parse a filter with an invalid symbol", () => {
  expect(new Parser("key ? value").toJSON()).toStrictEqual([]);
});

test("parse a single rule filter", () => {
  expect(new Parser("name = Anand").toJSON()).toStrictEqual([
    {
      key: "name",
      condition: "is",
      value: "Anand"
    }
  ]);
});

test("parse a multiple rule filter", () => {
  expect(new Parser("first_name = Anand, last_name = Chowdhary").toJSON()).toStrictEqual([
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
  expect(new Parser("first_name = Anand, id > 100").toJSON()).toStrictEqual([
    {
      key: "first_name",
      condition: "is",
      value: "Anand"
    },
    {
      key: "id",
      condition: "is greater than",
      value: "100"
    }
  ]);
});

test("get SQL from a single rule filter", () => {
  expect(new Parser("name = Anand").toSQL()).toBe('`name` = "Anand"');
});

test("get SQL from a a filter with all rules", () => {
  expect(new Parser("first_name = Anand, id != 2, last_name *= C, id < 6, activated > 0, email *=* @, year >= 2019, month <= 2, food =* a").toSQL()).toBe('`first_name` = "Anand" AND `id` != "2" AND `last_name` = "C%" AND `id` < 6 AND `activated` > 0 AND `email` = "%@%" AND `year` >= 2019 AND `month` <= 2 AND `food` = "%a"');
});
