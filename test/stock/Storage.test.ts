import { Cola, Juice, RedBull, Water } from "../../src/stock/Juice";
import { StandardStorage } from "../../src/stock/Storage";

describe("#display", () => {
  const storage = new StandardStorage();
  test("値段, 名前, 在庫の確認ができる", () => {
    storage.add(new Water());
    const actual = storage.display();

    expect(actual).toEqual([
      { name: "水", price: 100, stock: 1 },
      { name: "コーラ", price: 120, stock: 5 },
      { name: "レッドブル", price: 200, stock: 0 },
    ]);
  });
});

describe("#add", () => {
  test("コーラを格納できる", () => {
    const storage = new StandardStorage();
    storage.add(new Cola());
    expect(storage.display()).toEqual([
      { name: "水", price: 100, stock: 0 },
      { name: "コーラ", price: 120, stock: 6 },
      { name: "レッドブル", price: 200, stock: 0 },
    ]);
  });

  test("レッドブルを格納できる", () => {
    const storage = new StandardStorage();
    storage.add(new RedBull());
    expect(storage.display()).toEqual([
      { name: "水", price: 100, stock: 0 },
      { name: "コーラ", price: 120, stock: 5 },
      { name: "レッドブル", price: 200, stock: 1 },
    ]);
  });

  test("水を格納できる", () => {
    const storage = new StandardStorage();
    storage.add(new Water());
    expect(storage.display()).toEqual([
      { name: "水", price: 100, stock: 1 },
      { name: "コーラ", price: 120, stock: 5 },
      { name: "レッドブル", price: 200, stock: 0 },
    ]);
  });

  test("力水は格納できない", () => {
    const storage = new StandardStorage();
    const chikaramizu: Juice = {
      name: "力水",
      price: 100,
    };

    storage.add(chikaramizu);
    expect(storage.display()).toEqual([
      { name: "水", price: 100, stock: 0 },
      { name: "コーラ", price: 120, stock: 5 },
      { name: "レッドブル", price: 200, stock: 0 },
    ]);
  });
});

describe("#inStock", () => {
  const storage = new StandardStorage();
  test("在庫が0以上有る商品の商品名と価格のリストが得られる", () => {
    expect(storage.inStock()).toEqual([{ name: "コーラ", price: 120 }]);
  });
});

describe("#pickup", () => {
  const storage = new StandardStorage();
  test("pickupすると在庫が減る", () => {
    storage.pickup("コーラ");
    expect(storage.display()).toEqual([
      { name: "水", price: 100, stock: 0 },
      { name: "コーラ", price: 120, stock: 4 },
      { name: "レッドブル", price: 200, stock: 0 },
    ]);
  });

  test("pickupするとコーラを得られる", () => {
    const result = storage.pickup("コーラ");
    expect(result.name).toEqual("コーラ");
  });
});
