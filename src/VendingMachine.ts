import { Juice, Juices } from "./Juice";

type Money = 1 | 5 | 10 | 50 | 100 | 500 | 1000 | 2000 | 5000 | 10000;

interface IVendingMachine {
  total: number;
  insert: (money: Money) => Money | null;
  refund: () => number;
  canSupply: () => boolean;
}

export class VendingMachine implements IVendingMachine {
  private _storage: number = 0;
  private _sales: number = 0;
  private _stock: Juices = null;

  constructor(stock: Juices = new Juices()) {
    this._stock = stock;
  }

  get total() {
    return this._storage;
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

    this._storage += money;
    return null;
  }

  /**
   * 払い戻し
   */
  refund() {
    const change = this._storage;
    this._storage = 0;
    return change;
  }

  /**
   * 購入できる？
   *
   * @return true: できるよ！, false: できないぞ！
   */
  canSupply(): boolean {
    return this._storage >= 120 && this._stock.length > 0;
  }

  /**
   * 購入
   */
  supply(): Juice {
    if(!this.canSupply()) {
      return;
    }

    const juice = this._stock.pop();
    this._sales += juice.price;
    this._storage -= juice.price;
    return juice;
  }
}
