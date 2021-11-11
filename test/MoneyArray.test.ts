import Money from "../src/Money";
import MoneyArray from "../src/MoneyArray";

describe("MoneyArrayクラス", () => {
  test("amountプロパティ 配列要素の合計金額", () => {
    const wallet = new MoneyArray(
      ...MoneyArray.valueOf(1000),
      ...(new MoneyArray(10).fill(100))
    );
    expect(wallet.amount).toBe(2000);
  });

  test("valueOfメソッド 指定した金額で貨幣配列を生成する", () => {
    const wallet = MoneyArray.valueOf(8766);
    const answers: Money[] = [5000, 2000, 1000, 500, 100, 100, 50, 10, 5, 1];
    expect(wallet.length).toBe(10);
    answers.forEach((answer) => {
      expect(wallet.includes(answer)).toBe(true);
    });
  });

  test("removeメソッド 配列から要素を取り除く", () => {
    const wallet = new MoneyArray(100, 50, 10, 5);
    const result = wallet.remove(10);
    expect(result).toBe(10);
    expect(wallet.length).toBe(3);
  });
  
  test("removeメソッド 指定した貨幣が存在しない ", () => {
    const wallet = new MoneyArray(100, 50, 10, 5);
    expect(() => wallet.remove(1)).toThrow("指定した貨幣は配列内に存在しません");
  });

  test("hasExactMoneyメソッド 指定した金額をぴったり取り出せるか否か", () => {
    const wallet = new MoneyArray(
      ...MoneyArray.valueOf(660),
      ...(new MoneyArray(34).fill(10))
    );
    
    expect(wallet.hasExactMoney(1000)).toBe(true);
    expect(wallet.hasExactMoney(1)).toBe(false);
    expect(wallet.hasExactMoney(5)).toBe(false);
  });

  test("selectByValueメソッド 指定した金額のお金を列挙する", () => {
    const wallet = MoneyArray.valueOf(99999);
    const answers: Money[] = [100, 50, 10, 5, 1];
    const result = wallet.selectByValue(166);
    expect(result.length).toBe(5);
    answers.forEach((answer) => {
      expect (result.includes(answer)).toBe(true);
    });
  });

  test("selectByValueメソッド 配列内に存在しない貨幣を列挙する 例外発生", () => {
    const wallet = new MoneyArray(5).fill(100);
    expect(() => wallet.selectByValue(150)).toThrow("配列内の貨幣が足りないため、その金額を列挙することはできません");
  });

  test("takeメソッド 指定した金額を配列から取り出す", () => {
    const wallet = new MoneyArray(
      1000,
      ...(new MoneyArray(10).fill(100))
    );

    const result1 = wallet.take(1000);
    expect(result1.length).toBe(1);
    expect(result1.amount).toBe(1000);

    const result2 = wallet.take(1000);
    expect(result2.length).toBe(10);
    expect(result2.amount).toBe(1000)
  });
});