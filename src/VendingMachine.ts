import { Juice, Juices } from "./Juice";

type Money = 1 | 5 | 10 | 50 | 100 | 500 | 1000 | 2000 | 5000 | 10000;

export class VendingMachine {
  private _amountOfMoney: number = 0;
  private _sales: number = 0;
  private _stock: Juices = null;

  constructor(stock: Juices = new Juices()) {
    this._stock = stock;
  }

  get amountOfMoney() {
    return this._amountOfMoney;
  }

  get stock() {
    return this._stock;
  }

  get sales() {
    return this._sales;
  }

  /**
   * お金を投入する
   */
  insert(money: Money): Money | null {
    if (
      money === 1 ||
      money === 5 ||
      money === 2000 ||
      money === 5000 ||
      money === 10000
    ) {
      return money;
    }

    this._amountOfMoney += money;
    return null;
  }

  /**
   * 払い戻し
   */
  refund() {
    const change = this._amountOfMoney;
    this._amountOfMoney = 0;
    return change;
  }

  /**
   * 購入できる？
   *
   * @return true: できるよ！, false: できないぞ！
   */
  canSupply(name: string): boolean {
    return this._amountOfMoney >= 120 && this._stock.length > 0;
  }

  /**
   * 購入
   */
  supply(name: string): [Juice, number] | undefined {
    if (!this.canSupply(name)) {
      return;
    }

    const juice = this._stock.pop();
    this._sales += juice.price;
    this._amountOfMoney -= juice.price;
    return [juice, this._amountOfMoney];
  }

  /**
   * 在庫の補充
   * */
  restock(juices: Juices): void {
    this._stock = [...this._stock, ...juices];
  }

  /**
   * 購入できる商品名返す
   *
   * @return 商品名の配列
   */

  suppliableJuiceTypes(): string[] {
    const types = new Set<string>();
    this.stock.forEach((juice, index) => {
      if (this._amountOfMoney >= juice.price) {
        types.add(juice.name);
      }
    });
    return [...types.values()];
  }
}
