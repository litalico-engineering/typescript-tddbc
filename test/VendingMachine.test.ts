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
    new Juice("水", 100),
    new Juice("水", 100),
    new Juice("水", 100),
    new Juice("水", 100),
    new Juice("レッドブル", 200),
    new Juice("レッドブル", 200),
  );

  describe("コーラ", () => {
    test("120円あり在庫があればコーラが買える", () => {
      const vm = new VendingMachine(stocks);
      vm.insert(100);
      vm.insert(10);
      vm.insert(10);
      expect(vm.canSupply("コーラ")).toEqual(true);
    });

    test("110円しか持ってなければ、在庫があってもコーラ買えない", () => {
      const vm = new VendingMachine(stocks);
      vm.insert(100);
      vm.insert(10);
      expect(vm.canSupply("コーラ")).toEqual(false);
    });

    test("120円あり在庫なければコーラは買えない", () => {
      const vm = new VendingMachine([]);
      vm.insert(100);
      vm.insert(10);
      vm.insert(10);
      expect(vm.canSupply("コーラ")).toEqual(false);
    });

    test("110円あり在庫なければコーラは買えない", () => {
      const vm = new VendingMachine([]);
      vm.insert(100);
      vm.insert(10);
      expect(vm.canSupply("コーラ")).toEqual(false);
    });
  })

  describe("水", () => {
    test("100円あり在庫があれば水が買える", () => {
      const vm = new VendingMachine(stocks);
      vm.insert(100);
      expect(vm.canSupply("水")).toEqual(true);
    });

    test("10円しか持ってなければ、在庫があっても水買えない", () => {
      const vm = new VendingMachine(stocks);
      vm.insert(10);
      expect(vm.canSupply("水")).toEqual(false);
    });

    test("100円あり在庫なければ水は買えない", () => {
      const vm = new VendingMachine([]);
      vm.insert(100);
      expect(vm.canSupply("水")).toEqual(false);
    });

    test("10円あり在庫なければ水は買えない", () => {
      const vm = new VendingMachine([]);
      vm.insert(10);
      expect(vm.canSupply("水")).toEqual(false);
    });
  })

  describe("レッドブル", () => {
    test("200円あり在庫があればレッドブルが買える", () => {
      const vm = new VendingMachine(stocks);
      vm.insert(100);
      vm.insert(100);
      expect(vm.canSupply("レッドブル")).toEqual(true);
    });

    test("150円しか持ってなければ、在庫があってもレッドブル買えない", () => {
      const vm = new VendingMachine(stocks);
      vm.insert(100);
      vm.insert(50);
      expect(vm.canSupply("レッドブル")).toEqual(false);
    });

    test("200円あり在庫なければレッドブルは買えない", () => {
      const vm = new VendingMachine([]);
      vm.insert(100);
      vm.insert(100);
      expect(vm.canSupply("レッドブル")).toEqual(false);
    });

    test("150円あり在庫なければレッドブルは買えない", () => {
      const vm = new VendingMachine([]);
      vm.insert(100);
      vm.insert(50);
      expect(vm.canSupply("レッドブル")).toEqual(false);
    });
  })
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
    const stocks = new Juices(
      new Juice("コーラ", 120),
      new Juice("コーラ", 120)
    );
    const vm = new VendingMachine(stocks);
    vm.insert(100);
    vm.insert(10);
    vm.insert(10);
    vm.supply("コーラ");
    expect(vm.stock.length).toEqual(1);
  });

  test("売上金額が増える", () => {
    const vm = new VendingMachine(stocks);
    vm.insert(100);
    vm.insert(10);
    vm.insert(10);
    vm.supply("コーラ");

    expect(vm.sales).toEqual(120);
  });

  test("購入後、釣銭がでる", () => {
    const vm = new VendingMachine(stocks);
    vm.insert(100);
    vm.insert(10);
    vm.insert(10);
    vm.insert(10);
    vm.supply("コーラ");

    expect(vm.refund()).toEqual(10);
  });

  test("購入するジュースを選べる", () => {
    const vm = new VendingMachine(
      new Juices(
        new Juice("コーラ", 120),
        new Juice("コーラ", 120),
        new Juice("水", 100),
        new Juice("水", 100),
        new Juice("レッドブル", 200),
        new Juice("レッドブル", 200)
      )
    );
    vm.insert(1000);

    const [juice1, remain1] = vm.supply("コーラ");
    const [juice2, remain2] = vm.supply("水");
    const [juice3, remain3] = vm.supply("レッドブル");

    expect(juice1.name).toEqual("コーラ");
    expect(juice2.name).toEqual("水");
    expect(juice3.name).toEqual("レッドブル");
  });

  test("購入するとジュースが得られる", () => {
    const vm = new VendingMachine(stocks);
    vm.insert(100);
    vm.insert(10);
    vm.insert(10);
    vm.insert(10);
    const [juice, remain] = vm.supply("コーラ");
    expect(juice).toBeInstanceOf(Juice);
  });

  test("在庫がない場合", () => {
    const vm = new VendingMachine([]);
    vm.insert(100);
    vm.insert(10);
    vm.insert(10);

    const stockLen = vm.stock.length;
    const storage = vm.amountOfMoney;
    const sales = vm.sales;

    const juice = vm.supply("コーラ");

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

    const juice = vm.supply("コーラ");

    expect(vm.stock.length).toEqual(stockLen);
    expect(vm.amountOfMoney).toEqual(storage);
    expect(vm.sales).toEqual(sales);
    expect(juice).toBeUndefined();
  });

  test("150円投入で水を購入した場合、釣り銭50円が出力される", () => {
    const stocks = new Juices(new Juice("水", 100));
    const vm = new VendingMachine(stocks);
    vm.insert(100);
    vm.insert(50);

    const [juice, remain] = vm.supply("水");
    expect(remain).toEqual(50);
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
    const vm = new VendingMachine(new Juices(new Juice("コーラ", 120)));
    vm.restock(
      new Juices(
        new Juice("レッドブル", 200),
        new Juice("レッドブル", 200),
        new Juice("レッドブル", 200),
        new Juice("レッドブル", 200),
        new Juice("レッドブル", 200)
      )
    );

    expect(vm.stock.length).toEqual(6);

    const names = [
      "コーラ",
      "レッドブル",
      "レッドブル",
      "レッドブル",
      "レッドブル",
      "レッドブル",
    ];

    names.forEach((name, index) => {
      expect(vm.stock[index].name).toEqual(name);
    });
  });

  test("更に水5本を追加できる", () => {
    const vm = new VendingMachine(
      new Juices(new Juice("コーラ", 120), new Juice("レッドブル", 200))
    );
    vm.restock(
      new Juices(
        new Juice("水", 100),
        new Juice("水", 100),
        new Juice("水", 100),
        new Juice("水", 100),
        new Juice("水", 100)
      )
    );
    expect(vm.stock.length).toEqual(7);

    const names = ["コーラ", "レッドブル", "水", "水", "水", "水", "水"];
    names.forEach((name, index) => {
      expect(vm.stock[index].name).toEqual(name);
    });
  });
});

describe("購入可能なドリンク", () => {
  const vm = new VendingMachine(
    new Juices(
      new Juice("コーラ", 120),
      new Juice("コーラ", 120),
      new Juice("レッドブル", 200),
      new Juice("レッドブル", 200),
      new Juice("水", 100),
      new Juice("水", 100)
    )
  );

  vm.insert(1000);

  const types: string[] = vm.suppliableJuiceTypes();
  expect(types[0]).toEqual("コーラ");
  expect(types[1]).toEqual("レッドブル");
  expect(types[2]).toEqual("水");
});

// ステップ3
// - [x] 投入金額、在庫の点で、コーラが購入できるかどうかを取得できる。
// - [x] ジュース値段以上の投入金額が投入されている条件下で購入操作を行うと、ジュースの在庫を減らし、売り上げ金額を増やす。
// - [x] 投入金額が足りない場合もしくは在庫がない場合、購入操作を行っても何もしない。
// - [x] 現在の売上金額を取得できる。
// - [x] 払い戻し操作では現在の投入金額からジュース購入金額を引いた釣り銭を出力する。
// - 注意：責務が集中していませんか？責務が多すぎると思ったら分けてみましょう

// ステップ4
// - [x] ジュースを3種類管理できるようにする。
// - [x] 在庫にレッドブル（値段:200円、名前”レッドブル”）5本を追加する。
// - [x] 在庫に水（値段:100円、名前”水”）5本を追加する。
// - [x] 投入金額、在庫の点で購入可能なドリンクのリストを取得できる。

// ステップ５
// - [ ] ジュース値段以上の投入金額が投入されている条件下で購入操作を行うと、釣り銭（投入金額とジュース値段の差分）を出力する。
//   - ジュースと投入金額が同じ場合、つまり、釣り銭0円の場合も、釣り銭0円と出力する。
//   - 釣り銭の硬貨の種類は考慮しなくてよい。
