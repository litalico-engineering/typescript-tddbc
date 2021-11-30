import { Juice } from "../src/Juice";

describe("Generate", () => {
  test("new コーラ", () => {
    const juice = Juice.Generate("コーラ")
    expect(juice.name).toEqual("コーラ");
    expect(juice.price).toEqual(120);
  });

  test("new レッドブル", () => {
    const juice = Juice.Generate("レッドブル")
    expect(juice.name).toEqual("レッドブル");
    expect(juice.price).toEqual(200);
  });

  test("new 水", () => {
    const juice = Juice.Generate("水")
    expect(juice.name).toEqual("水");
    expect(juice.price).toEqual(100);
  });
});
