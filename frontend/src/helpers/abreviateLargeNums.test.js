import { abreviateLargeNums, addCommas } from "./abreviateLargeNums";

describe("addCommas", () => {
  it("should add commas to 1000", () => {
    const res = addCommas(1000);
    expect(res).toEqual("1,000");
  });
  it("should add commas to 10000", () => {
    const res = addCommas(10000);
    expect(res).toEqual("10,000");
  });
  it("should add commas to 100000", () => {
    const res = addCommas(100000);
    expect(res).toEqual("100,000");
  });
});

describe("abreviateLargeNums()", () => {
  it("should not abreviate numbers under 1 Million", () => {
    const res = abreviateLargeNums(100000);
    expect(res).toEqual("100,000");
  });
  it("should return 1.00 M", () => {
    const res = abreviateLargeNums(1000000);
    expect(res).toEqual("1.000 M");
  });
  it("should return 1.220 B", () => {
    const res = abreviateLargeNums(1220000000);
    expect(res).toEqual("1.220 B");
  });
  it("should return 2.200 T", () => {
    const res = abreviateLargeNums(2200000000000);
    expect(res).toEqual("2.200 T");
  });
});
