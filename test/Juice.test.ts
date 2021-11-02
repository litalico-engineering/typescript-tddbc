import { Juice, Juices } from "../src/Juice";

describe("new", () => {
  test("new コーラ", () => {
    const juice = new Juice("コーラ", 120);
    expect(juice.name).toEqual("コーラ");
    expect(juice.price).toEqual(120);
  });

  test("new レッドブル", () => {
    const juice = new Juice("レッドブル", 200);
    expect(juice.name).toEqual("レッドブル");
    expect(juice.price).toEqual(200);
  });

  test("new 水", () => {
    const juice = new Juice("水", 100);
    expect(juice.name).toEqual("水");
    expect(juice.price).toEqual(100);
  });
});

describe("pickUp", () => {
  test("コーラを排出する", () => {
    // ↓juicesにJuiceオブジェクトをpushする
    const juicesBeforePickUp = [new Juice("水", 100), new Juice("コーラ", 120), new Juice("レッドブル", 200)];
    const juicesAfterPickUp = [new Juice("水", 100), new Juice("レッドブル", 200)];
    const juices = new Juices(...juicesBeforePickUp);
    const result = juices.pickUp("コーラ").name;
    expect(result).toEqual("コーラ");
    expect(juices).toEqual(juicesAfterPickUp);
  });
});
