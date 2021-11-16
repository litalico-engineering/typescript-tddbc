import { Bank, StandardBank } from "../../src/money/Bank";

describe("#add", () => {
  const bank = new StandardBank();
  test("対応しているお金を投入するとnullが返る", () => {
    const successCase = [
      { money: 10, result: null },
      { money: 50, result: null },
      { money: 100, result: null },
      { money: 500, result: null },
      { money: 1000, result: null },
    ];
    successCase.forEach((act) => {
      // toBeNullでも良いが、期待した値を所望する意味合いを押し出したかった
      expect(bank.add(act.money as Currency)).toEqual(act.result);
    });
  });

  test("非対応のお金を投入するとそのままの金額が帰る", () => {
    const errorCase = [
      { money: 1, result: 1 },
      { money: 5, result: 5 },
      { money: 2000, result: 2000 },
      { money: 5000, result: 5000 },
      { money: 10000, result: 10000 },
    ];

    errorCase.forEach((act) => {
      expect(bank.add(act.money as Currency)).toEqual(act.result);
    });
  });
});

describe("#refund", () => {
  const bank = new StandardBank();

  test("払い戻しを行うと、投入金額の合計が出力される", () => {
    bank.add(100);
    bank.add(10);

    expect(bank.refund()).toEqual(110);
  });

  test("払い戻しを行うと、投入金額の合計金額は0になる", () => {
    bank.add(100);
    bank.refund();

    expect(bank.totalDeposit()).toEqual("0");
  });
});

// total~はDisplayなりBankManagerなり切りだすのも面白いかもしれない
describe("#totalDeposit", () => {
  const bank = new StandardBank();
  test("投入金額の合計金額を取得できる", () => {
    bank.add(100);
    bank.add(10);

    expect(bank.totalDeposit()).toEqual("110");
  });
});

describe("#totalSales", () => {
  const bank = new StandardBank();

  test("合計売上金額を取得できる", () => {
    expect(bank.totalSales()).toEqual("0");
  });
});

describe("#buy", () => {
  const bank = new StandardBank();
  bank.add(100);
  const actual = bank.buy(10);

  test("購入をすると合計売上金額が購入金額分増える", () => {
    expect(bank.totalSales()).toEqual("10");
  });

  test("購入をすると一時預かり金が0になる", () => {
    expect(bank.totalDeposit()).toEqual("0");
  });

  test("購入をすると、投入金額と購入金額の差額が返却される", () => {
    expect(actual).toEqual(90);
  });
});

describe("#allowBuying", () => {
  test("投入金額が購入金額以上であれば購入できる", () => {
    const bank = new StandardBank();
    bank.add(100);
    expect(bank.allowBuying(100)).toBeTruthy();
  });

  test("投入金額が購入金額満たない場合購入できない", () => {
    const bank = new StandardBank();
    bank.add(100);
    expect(bank.allowBuying(120)).toBeFalsy();
  });
});
