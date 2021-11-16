import { Cola, Juice, RedBull, Water } from "../../src/stock/Juice";
import { StandardStorage } from "../../src/stock/Storage";

describe("#display", () => {
  const storage = new StandardStorage();
  test("値段, 名前, 在庫の確認ができる", () => {
    const actual = storage.display();
    expect(actual).toEqual({ name: "コーラ", price: 120, stock: 5 });
  });
});

describe("#add", () => {
  let storage: StandardStorage = null;
  beforeEach(() => {
    storage = new StandardStorage();
  });

  test("コーラを格納できる", () => {
    storage.add(new Cola());
    expect(storage.display().stock).toEqual(6);
  });

  test("レッドブルを格納できる", () => {
    storage.add(new RedBull());
    expect(storage.display().stock).toEqual(6);
  });

  test("水を格納できる", () => {
    storage.add(new Water());
    expect(storage.display().stock).toEqual(6);
  });

  test("力水は格納できない", () => {
    const chikaramizu: Juice = {
      name: "力水",
      price: 100,
    };

    storage.add(chikaramizu);
    expect(storage.display().stock).toEqual(5);
  });
});

describe("#inStock", () => {
  const storage = new StandardStorage();
  test("在庫が0以上であれば購入できる", () => {
    expect(storage.inStock()).toBeTruthy();
  });
});

describe("#pickup", () => {
  const storage = new StandardStorage();
  test("pickupすると在庫が減る", () => {
    storage.pickup();
    expect(storage.display().stock).toEqual(4);
  });

  test("pickupするとコーラを得られる", () => {
    const result = storage.pickup();
    expect(result.name).toEqual("コーラ");
  });
});
