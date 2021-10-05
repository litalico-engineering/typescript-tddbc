import { Juice, Juices } from "../src/Juice";
import { VendingMachine } from "../src/VendingMachine";

test("newできる", () => {
  expect(new VendingMachine()).toBeDefined();
});

test("お金を投入できる", () => {
  const vm = new VendingMachine();
  vm.insert(10);
  vm.insert(50);
  vm.insert(100);
  vm.insert(500);
  vm.insert(1000);

  expect(vm.amountOfMoney).toEqual(1660);
});

test("対応しているお金を投入するとnullが返る", () => {
  const vm = new VendingMachine();
  expect(vm.insert(10)).toBeNull();
});

test("非対応のお金を投入", () => {
  const vm = new VendingMachine();
  vm.insert(10);

  expect(vm.insert(1)).toEqual(1);
  expect(vm.insert(5)).toEqual(5);
  expect(vm.insert(2000)).toEqual(2000);
  expect(vm.insert(5000)).toEqual(5000);
  expect(vm.insert(10000)).toEqual(10000);

  expect(vm.amountOfMoney).toEqual(10);
});

test("投入金額", () => {
  const vm = new VendingMachine();
  vm.insert(10);
  vm.insert(1000);
  expect(vm.amountOfMoney).toEqual(1010);
});

describe("払い戻しできる", () => {
  let vm = null;

  beforeEach(() => {
    vm = new VendingMachine();
    vm.insert(10);
    vm.insert(1000);
  });

  test("合計金額が出力される", () => {
    expect(vm.refund()).toEqual(1010);
  });

  test("払い戻しされた後は合計金額は0円である", () => {
    vm.refund();
    expect(vm.amountOfMoney).toEqual(0);
  });
});

test("売上", () => {
  const vm = new VendingMachine();
  expect(vm.sales).toEqual(0);
});

describe("在庫", () => {
  const stocks = new Juices(
    new Juice("コーラ", 120),
    new Juice("コーラ", 120),
    new Juice("コーラ", 120),
    new Juice("コーラ", 120),
    new Juice("コーラ", 120)
  );
  const vm = new VendingMachine(stocks);

  test("在庫は5つである", () => {
    expect(vm.stock.length).toEqual(5);
  });

  test("在庫のジュースの名前と値段は正しいものである", () => {
    vm.stock.map((juice) => {
      expect(juice.name).toEqual("コーラ");
      expect(juice.price).toEqual(120);
    });
  });
});

describe("購入できるか？", () => {
  const stocks = new Juices(
    new Juice("コーラ", 120),
    new Juice("コーラ", 120),
    new Juice("コーラ", 120),
    new Juice("コーラ", 120),
    new Juice("コーラ", 120)
  );

  test("金額が条件を満たしていれば購入できる", () => {
    const vm = new VendingMachine(stocks);
    vm.insert(100);
    vm.insert(10);
    vm.insert(10);
    expect(vm.canSupply()).toEqual(true);
  });

  test("金額が条件を満たしていなければ購入できない", () => {
    const vm = new VendingMachine(stocks);
    vm.insert(100);
    vm.insert(10);
    expect(vm.canSupply()).toEqual(false);
  });

  test("在庫があるので購入できる", () => {
    const vm = new VendingMachine(stocks);
    vm.insert(100);
    vm.insert(10);
    vm.insert(10);
    expect(vm.canSupply()).toEqual(true);
  });

  test("在庫がないので購入できない", () => {
    const vm = new VendingMachine([]);
    vm.insert(100);
    vm.insert(10);
    vm.insert(10);
    expect(vm.canSupply()).toEqual(false);
  });
});

describe("購入", () => {
  const stocks = new Juices(
    new Juice("コーラ", 120),
    new Juice("コーラ", 120),
    new Juice("コーラ", 120),
    new Juice("コーラ", 120),
    new Juice("コーラ", 120)
  );

  test("購入すると在庫が1つ減る", () => {
    const stocks = new Juices(new Juice("コーラ", 120), new Juice("コーラ", 120));
    const vm = new VendingMachine(stocks);
    vm.insert(100);
    vm.insert(10);
    vm.insert(10);
    vm.supply();
    expect(vm.stock.length).toEqual(1);
  });

  test("売上金額が増える", () => {
    const vm = new VendingMachine(stocks);
    vm.insert(100);
    vm.insert(10);
    vm.insert(10);
    vm.supply();

    expect(vm.sales).toEqual(120);
  });

  test("購入後、釣銭がでる", () => {
    const vm = new VendingMachine(stocks);
    vm.insert(100);
    vm.insert(10);
    vm.insert(10);
    vm.insert(10);
    vm.supply();

    expect(vm.refund()).toEqual(10);
  });

  test("購入するとジュースが得られる", () => {
    const vm = new VendingMachine(stocks);
    vm.insert(100);
    vm.insert(10);
    vm.insert(10);
    vm.insert(10);
    expect(vm.supply()).toBeInstanceOf(Juice);
  });

  test("在庫がない場合", () => {
    const vm = new VendingMachine([]);
    vm.insert(100);
    vm.insert(10);
    vm.insert(10);

    const stockLen = vm.stock.length;
    const storage = vm.amountOfMoney;
    const sales = vm.sales;

    const juice = vm.supply();

    expect(vm.stock.length).toEqual(stockLen);
    expect(vm.amountOfMoney).toEqual(storage);
    expect(vm.sales).toEqual(sales);
    expect(juice).toBeUndefined();
  });

  test("投入金額が足りない場合", () => {
    const stocks = new Juices(new Juice("コーラ", 120));
    const vm = new VendingMachine(stocks);

    const stockLen = vm.stock.length;
    const storage = vm.amountOfMoney;
    const sales = vm.sales;

    const juice = vm.supply();

    expect(vm.stock.length).toEqual(stockLen);
    expect(vm.amountOfMoney).toEqual(storage);
    expect(vm.sales).toEqual(sales);
    expect(juice).toBeUndefined();
  });
});

describe("ジュース", () => {
  test("名前がある", () => {
    const juice = new Juice("コーラ", 120);
    expect(juice.name).toEqual("コーラ");
  });

  test("値段がある", () => {
    const juice = new Juice("コーラ", 120);
    expect(juice.price).toEqual(120);
  });
});

describe("ジュース補充", () => {
  test("レッドブルが5本追加できる", () => {
    const vm = new VendingMachine();
    vm.restock(
      new Juices(
        new Juice("レッドブル", 200),
        new Juice("レッドブル", 200),
        new Juice("レッドブル", 200),
        new Juice("レッドブル", 200),
        new Juice("レッドブル", 200)
      )
    )
    expect(vm.stock.length).toEqual(5)
    expect(vm.stock[0].name).toEqual("レッドブル")
    expect(vm.stock[1].name).toEqual("レッドブル")
    expect(vm.stock[2].name).toEqual("レッドブル")
    expect(vm.stock[3].name).toEqual("レッドブル")
    expect(vm.stock[4].name).toEqual("レッドブル")
  })
})

// ステップ3
// - [x] 投入金額、在庫の点で、コーラが購入できるかどうかを取得できる。
// - [x] ジュース値段以上の投入金額が投入されている条件下で購入操作を行うと、ジュースの在庫を減らし、売り上げ金額を増やす。
// - [x] 投入金額が足りない場合もしくは在庫がない場合、購入操作を行っても何もしない。
// - [x] 現在の売上金額を取得できる。
// - [x] 払い戻し操作では現在の投入金額からジュース購入金額を引いた釣り銭を出力する。
// - 注意：責務が集中していませんか？責務が多すぎると思ったら分けてみましょう

// ステップ4
// - [x] ジュースを3種類管理できるようにする。
// - [ ] 在庫にレッドブル（値段:200円、名前”レッドブル”）5本を追加する。
// - [ ] 在庫に水（値段:100円、名前”水”）5本を追加する。
// - [ ] 投入金額、在庫の点で購入可能なドリンクのリストを取得できる。
