interface IVendingMachine {
  total: number;
  insert: (money: number) => number;
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
  insert(money: number) {
    this._storage += money;
    return money;
  }
  /**
   * 払い戻し
   */
  refund() {
    return 0;
  }
}
