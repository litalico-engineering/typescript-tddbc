type Money = 1 | 5 | 10 | 50 | 100 | 500 | 1000 | 2000 | 5000 | 10000;

interface IVendingMachine {
  total: number;
  insert: (money: Money) => Money | null;
  refund: () => number;
}

export class VendingMachine implements IVendingMachine {
  private _storage: number = 0;
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
}

export class Juice {
  name: string;
  price: number; // 円

  constructor() {
    this.name = "コーラ";
    this.price = 120;
  }
}

export class Juices extends Array<Juice> {
  get stock() {
    return this.length;
  }
}
