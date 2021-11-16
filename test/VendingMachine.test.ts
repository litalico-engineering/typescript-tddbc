import { Bank, StandardBank } from "../src/money/Bank";
import { Cola, Juice, Water } from "../src/stock/Juice";
import { StandardStorage, Storage } from "../src/stock/Storage";
import { VendingMachine } from "../src/VendingMachine";

test("newできる", () => {
  const bankMock: Bank = {
    totalDeposit: function (): string {
      throw new Error("Function not implemented.");
    },
    totalSales: function (): string {
      throw new Error("Function not implemented.");
    },
    add: function (currency: Currency): Currency {
      throw new Error("Function not implemented.");
    },
    buy: function (price: number): number {
      throw new Error("Function not implemented.");
    },
    refund: function (): number {
      throw new Error("Function not implemented.");
    },
    allowBuying: function (price: number): boolean {
      throw new Error("Function not implemented.");
    },
  };

  const storageMock: Storage = {
    add: function (cola: Cola): void {
      throw new Error("Function not implemented.");
    },
    pickup: function (): Juice {
      throw new Error("Function not implemented.");
    },
    display: function (): ({ stock: number } & Juice)[] {
      throw new Error("Function not implemented.");
    },
    inStock: function (): { name: string; price: number }[] {
      throw new Error("Function not implemented.");
    },
  };

  expect(new VendingMachine(bankMock, storageMock)).toBeDefined();
});

describe("購入前の金額投入", () => {
  let bank: Bank = null;
  let storage: Storage = null;
  beforeEach(() => {
    bank = new StandardBank();
    storage = new StandardStorage();
  });

  test("対応しているお金の投入", () => {
    const vm = new VendingMachine(bank, storage);
    expect(vm.insert(10)).toBeNull();
  });

  test("非対応のお金を投入", () => {
    const vm = new VendingMachine(bank, storage);
    expect(vm.insert(1)).toEqual(1);
  });

  test("投入金額の表示", () => {
    const vm = new VendingMachine(bank, storage);
    vm.insert(10);
    expect(vm.amountOfMoney).toEqual(10);
  });

  test("払い戻し", () => {
    const vm = new VendingMachine(bank, storage);
    vm.insert(10);
    const actual = { refund: vm.refund(), amount: vm.amountOfMoney };
    expect(actual).toEqual({ refund: 10, amount: 0 });
  });
});

describe("購入可不可判別", () => {
  test("購入可能なジュースのリストが得られる", () => {
    const bank = new StandardBank();
    const storage = new StandardStorage();
    const vm = new VendingMachine(bank, storage);

    storage.add(new Water());

    vm.insert(100);
    vm.insert(10);
    vm.insert(10);

    expect(vm.suppliableJuiceNames()).toEqual(["水", "コーラ"]);
  });

  test("在庫があり、投入金額が購入金額以上であれば購入できる", () => {
    const bank = new StandardBank();
    const storage = new StandardStorage();
    const vm = new VendingMachine(bank, storage);

    vm.insert(100);
    vm.insert(10);
    vm.insert(10);

    expect(vm.canSupply("コーラ")).toBeTruthy();
  });
});

describe("購入", () => {
  test("購入操作をするとジュースとお釣りが取得できる", () => {
    const bank = new StandardBank();
    const storage = new StandardStorage();
    const vm = new VendingMachine(bank, storage);

    vm.insert(100);
    vm.insert(10);
    vm.insert(10);
    vm.insert(10);

    const [juice, change] = vm.supply("コーラ");
    expect(juice.name).toEqual("コーラ");
    expect(change).toEqual(10);
  });

  test("売上が増えている", () => {
    const bank = new StandardBank();
    const storage = new StandardStorage();
    const vm = new VendingMachine(bank, storage);

    const beforeSales = vm.sales;

    vm.insert(100);
    vm.insert(10);
    vm.insert(10);
    vm.supply("コーラ");

    const afterSales = vm.sales;

    const actual = { before: beforeSales, after: afterSales };
    expect(actual).toEqual({ before: 0, after: 120 });
  });
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
// - [x] ジュース値段以上の投入金額が投入されている条件下で購入操作を行うと、釣り銭（投入金額とジュース値段の差分）を出力する。
//   - ジュースと投入金額が同じ場合、つまり、釣り銭0円の場合も、釣り銭0円と出力する。
//   - 釣り銭の硬貨の種類は考慮しなくてよい。
