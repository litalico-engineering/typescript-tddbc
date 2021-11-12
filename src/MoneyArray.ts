import Money, { moneyKinds } from "./Money";

export default class MoneyArray extends Array<Money> {
  /** 降順の貨幣種類リスト */
  private static descMoneyKinds: ReadonlyArray<Money> = moneyKinds.slice().sort((a, b) => a < b ? 1 : -1);

  /**
   * 配列要素の合計金額
   */
  get amount(): number {
    return this.reduce<number>((prev, current) => {
      return prev + current;
    }, 0);
  }

  /**
   * 金額に対する最小の貨幣数で配列を生成する
   * @param value 金額
   * @returns 
   */
  public static valueOf(value: number): MoneyArray {
    const result = new MoneyArray();
    let current = value;

    MoneyArray.descMoneyKinds.forEach((kind) => {
      const quotient = Math.floor(current / kind);
      result.push(...(new MoneyArray(quotient)).fill(kind));
      current -= kind * quotient;
    });
    
    return result;
  }

  /**
   * 配列から指定した要素を取り除く
   * @param item 
   * @returns 
   */
  public remove(item: Money): Money {
    const index =  this.findIndex(current => current === item);
    if(index === -1) {
      throw new Error("指定した貨幣は配列内に存在しません");
    }
    return this.splice(index, 1)[0];
  }

  /**
   * 指定した金額をぴったり所持しているか否か
   * @param value 指定金額
   * @returns 
   */
  public hasExactMoney(value: number): boolean {
    const result = this.reduce<number>((prev, money) => {
      if((prev - money) < 0) {
        return prev;
      }
      return prev - money;
    }, value);

    return result === 0;
  }

  /**
   * 指定した金額を配列から列挙する
   * @param value 
   * @returns 
   */
  public selectByValue(value: number) {
    const descArray = this.slice().sort();
    const result = new MoneyArray();
    let remainder = value;
    for(let i = descArray.length - 1; i >= 0; i--) {
      if((remainder - descArray[i]) < 0) {
        continue;
      }
      remainder -= descArray[i];
      result.push(descArray[i]);
    }
    if(remainder !== 0) {
      throw new Error("配列内の貨幣が足りないため、その金額を列挙することはできません");
    }
    return result;
  }

  /**
   * 指定した金額を配列から取り出す
   * @param value 金額
   * @returns 
   */
  public take(value: number): MoneyArray {
    const result = this.selectByValue(value);
    result.forEach(item => this.remove(item));
    return result;
  }
}