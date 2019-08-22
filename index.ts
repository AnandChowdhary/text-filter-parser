type Conditions = 
  | "is"
  | "is not"
  | "is greater than"
  | "is less than"
  | "is greater than or equal to"
  | "is less than or equal to"
  | "starts with"
  | "ends with"
  | "includes";

type filterResult = {
  key: string;
  condition: Conditions;
  value: any;
};

export default (filter: string) => {
  return filter
    .split(",")
    .map(i => i.trim())
    .filter(i => !!i)
    .map(i => i.split(" ").map(i => decodeURIComponent(i.trim())))
    .map(i => {
      if (i.length !== 3) return;
      const conditions = {
        "=": "is",
        "!=": "is not",
        ">": "is greater than",
        "<": "is less than",
        ">=": "is greater than or equal to",
        "<=": "is less than or equal to",
        "*=": "starts with",
        "=*": "ends with",
        "*=*": "includes"
      } as {
        [index: string]: Conditions;
      };
      const condition = conditions[i[1]];
      if (!condition) return;
      return {
        key: i[0].trim(),
        condition,
        value: i[2].trim()
      } as filterResult;
    })
    .filter(i => !!i);
};
