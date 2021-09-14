type Money = 1 | 5 | 10 | 50 | 100 | 500 | 1000 | 2000 | 5000 | 10000;

interface IVendingMachine {
  total: number;
  insert: (money: Money) => Money | null;
  refund: () => number;
}

export class VendingMachine implements IVendingMachine {
  private _storage: number = 0;
  private _stock: Juice[] = [];

  constructor() {
    const juice1 = new Juice();
    const juice2 = new Juice();
    const juice3 = new Juice();
    const juice4 = new Juice();
    const juice5 = new Juice();

    this._stock = [juice1, juice2, juice3, juice4, juice5];
  }

  get total() {
    return this._storage;
  }

  get stock() {
    return this._stock;
  }
  /**
   * お金を投入する
   */
  insert(money: Money): Money | null {
    if (money === 1 || money === 5 || money === 2000 || money === 5000 || money === 10000) {
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
}

export class Juice {
  name: string;
  price: number; // 円

  constructor() {
    this.name = "コーラ"
    this.price = 120;
  }

}
