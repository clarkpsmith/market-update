const { sqlForPartialUpdate, sqlForQueryStrings } = require("./sql");
const { BadRequestError } = require("../expressError");

describe("test sqlForPartialUpdate function", () => {
  const jsToSql = {
    firstName: "first_name",
    lastName: "last_name",
    isAdmin: "is_admin",
  };

  const data = {
    firstName: "john",
    lastName: "smith",
    isAdmin: true,
  };
  const data2 = {
    firstName: "john",
  };
  test("returns sql style key names and correct sql function arguments", () => {
    const { setCols } = sqlForPartialUpdate(data, jsToSql);
    expect(setCols).toEqual(`"first_name"=$1, "last_name"=$2, "is_admin"=$3`);
  });
  test("returns correct values", () => {
    const { values } = sqlForPartialUpdate(data, jsToSql);
    expect(values).toEqual(["john", "smith", true]);
  });

  test("adapts to different numbers of key value pairs", () => {
    const { setCols, values } = sqlForPartialUpdate(data2, jsToSql);
    expect(setCols).toEqual('"first_name"=$1');
    expect(values).toEqual(["john"]);
  });

  test("should throw badRequestError if no details passed in", () => {
    try {
      let data3 = {};
      const { setCols, values } = sqlForPartialUpdate(data3, jsToSql);
    } catch (err) {
      expect(err instanceof BadRequestError).toBeTruthy();
    }
  });
});
