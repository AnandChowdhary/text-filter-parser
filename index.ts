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

export default class TextFilterParser {
  json: filterResult[];
  constructor(filter: string) {
    this.json = <filterResult[]>filter
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
          "sw": "starts with",
          "ew": "ends with",
          "*": "includes"
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
  }

  public toJSON() {
    return this.json;
  }

  public toSQL() {
    return `${this.json.map(i => {
      let result = `\`${i.key}\` `;
      if (i.condition === "is") result += `= "${i.value}"`;
      if (i.condition === "is not") result += `!= "${i.value}"`;
      if (i.condition === "starts with") result += `= "${i.value}%"`;
      if (i.condition === "includes") result += `= "%${i.value}%"`;
      if (i.condition === "ends with") result += `= "%${i.value}"`;
      if (i.condition === "is greater than") result += `> ${i.value}`;
      if (i.condition === "is less than") result += `< ${i.value}`;
      if (i.condition === "is less than or equal to") result += `<= ${i.value}`;
      if (i.condition === "is greater than or equal to") result += `>= ${i.value}`;
      return result;
    }).join(" AND ").trim()}`;
  }
}
