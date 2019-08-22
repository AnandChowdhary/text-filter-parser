# 🌪️ Text Filter Parser

[![NPM](https://img.shields.io/npm/v/text-filter-parser.svg)](https://www.npmjs.com/package/text-filter-parser)
[![Build](https://img.shields.io/travis/AnandChowdhary/text-filter-parser.svg)](https://travis-ci.org/AnandChowdhary/text-filter-parser)
[![Coveralls](https://img.shields.io/coveralls/github/AnandChowdhary/text-filter-parser.svg)](https://coveralls.io/github/AnandChowdhary/text-filter-parser)
![Type definitions](https://img.shields.io/npm/types/text-filter-parser.svg?color=brightgreen)
[![GitHub](https://img.shields.io/github/license/anandchowdhary/text-filter-parser.svg)](https://github.com/AnandChowdhary/text-filter-parser/blob/master/LICENSE)
![Vulnerabilities](https://img.shields.io/snyk/vulnerabilities/github/AnandChowdhary/text-filter-parser.svg)

A utility to parse query filter rules given in plain text and get a structured array.

## ⭐ How it works

If you have a database view in your app, you might want to give users the option to filter based on a text input. For example, `hello=world` becomes:

```json
[
  {
    "key": "hello",
    "condition": "is",
    "value": "world"
  }
]
```

You can then translate this into a query or use one of built-in functions like `toSQL()`.

## 💻 Usage

Add fraud to your project with NPM:

```bash
npm install text-filter-parser
```

Add it to your project:

```js
const Parser = require("text-filter-parser");
```

Create an object and use a method to get your desired output.

```js
const result = new Parser("id > 2, name ew nand")
const json = result.toJSON();
console.log(json);
/*
[
  {
    key": "id",
    condition": "is greater than",
    value: 2
  },
  {
    key": "name",
    condition": "ends with",
    value: "nand"
  }
]
*/
```

You can also generate the `WHERE` clause of an SQL query:

```js
const result = new Parser("id > 2, name ew nand")
const sql = result.toSQL();
console.log("SELECT * FROM users WHERE " + sql);
/*
SELECT * FROM users WHERE `id` > 2 AND `name` = "%nand"
*/
```

### Operators

| Operator | Condition |
| -------- | --------- |
| = | `"is"` |
| != | `"is not"` |
| > | `"is greater than"` |
| < | `"is less than"` |
| >= | `"is greater than or equal to"` |
| <= | `"is less than or equal to"` |
| sw | `"starts with"` |
| ew | `"ends with"` |
| * | `"includes"` |

## 📝 License

MIT
