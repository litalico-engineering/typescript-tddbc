type Money = 10 | 50 | 100 | 500 | 1000;

interface IVendingMachine {
  total: number;
  insert: (money: Money) => number;
  refund: () => number;
}

export class VendingMachine implements IVendingMachine {
  private _storage: number = 0;

  get total() {
    return this._storage;
  }
  /**
   * お金を投入する
   */
  insert(money: Money) {
    this._storage += money;
    return money;
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
